package main

import (
	"encoding/json"
	"flag"
	"fmt"
	"net/http"
	"os"
	"os/signal"
	"path/filepath"
	"strings"
	"syscall"

	"github.com/greenmochi/kabedon-kokoro/process"

	"github.com/grpc-ecosystem/grpc-gateway/runtime"
	"golang.org/x/net/context"
	"google.golang.org/grpc"

	"github.com/greenmochi/kabedon-kokoro/logger"
	gw "github.com/greenmochi/kabedon-kokoro/proto"
)

func main() {
	// Setup logger
	defer logger.Close()

	//var log *logger.KabedonLogger
	//out, err := os.Create("kabedon-kokoro.log")
	//if err != nil {
	//	log = logger.NewKabedonLogger(os.Stderr)
	//	log.Info("unable to create log file to write to. Write to stderr instead")
	//} else {
	//	log = logger.NewKabedonLogger(out)
	//}
	//defer out.Close()

	var helpUsage bool
	var gatewayPort int
	var kokoroPort int
	var nyaaPort int
	flag.BoolVar(&helpUsage, "help", false, "Prints help text")
	flag.IntVar(&gatewayPort, "gateway-port", 9990, "Port to serve the gateway server")
	flag.IntVar(&kokoroPort, "kokoro-port", 9991, "Port to serve the kokoro server")
	flag.IntVar(&nyaaPort, "nyaa-port", 9995, "Nyaa grpc server port")
	flag.Parse()
	flag.Visit(func(fn *flag.Flag) {
		if fn.Name == "help" {
			fmt.Print(helpText)
			os.Exit(1)
		}
	})

	shutdown := make(chan bool)
	exit := make(chan bool)
	release := make(chan bool)

	// Run all gRPC services
	go func() {
		binary := "./kabedon-nyaa.exe"
		logger.Infof("running %s on port=%d", binary, nyaaPort)
		cmd, err := process.Start(binary, nyaaPort)
		if err != nil {
			fullpath, err := filepath.Abs(binary)
			if err != nil {
				logger.Fatal("couldn't resolve binary full path:", err)
			} else {
				logger.Fatal("binary full path:", fullpath)
			}
		}

		// Wait for release signal when kabedon-kokoro finishes
		<-release

		// TODO: Do a graceful shutdown for each gRPC service.
		// Add a way to search for runaway gRPC servers and kill them by name

		// if err := cmd.Process.Release(); err != nil {
		// 	logger.Fatalf("unable to release resources for %s: %s", binary, err)
		// }

		// Try to kill process by finding it (if it exists) with FindProcess
		// if _, err := os.FindProcess(cmd.ProcessState.Pid()); err == nil {
		// 	if err := cmd.Process.Kill(); err != nil {
		// 		logger.Fatalf("unable to kill %s: %s", binary, err)
		// 	}
		// }
		if err := cmd.Process.Kill(); err != nil {
			logger.Fatalf("unable to kill %s: %s", binary, err)
		}
		logger.Infof("killed %s", binary)
		logger.Info(binary, " finished with ", err)

		exit <- true
	}()

	// Load and run all gateway handlers on a port
	endpoints := map[string]string{
		"nyaa": fmt.Sprintf("localhost:%d", nyaaPort),
	}
	go func() {
		logger.Infof("running gateway server on :%d", gatewayPort)
		if err := runGateway(gatewayPort, endpoints); err != nil {
			logger.Fatal(err)
		}
	}()

	// Run secondary server
	go func() {
		logger.Infof("running kokoro server on :%d", kokoroPort)
		if err := runKokoro(kokoroPort, shutdown); err != nil {
			logger.Fatal(err)
		}
	}()

	// Graceful shutdown
	logger.Infof("graceful shutdown loop started")
	interrupt := make(chan os.Signal, 1)
	signal.Notify(interrupt, os.Interrupt, syscall.SIGTERM)
	for {
		select {
		case <-shutdown:
			logger.Info("shutdown signal received")
			release <- true
		case <-interrupt:
			logger.Info("interrupt signal received")
			release <- true
		case <-exit:
			logger.Info("exit signal received. Program exited.")
			os.Exit(1)
			return
		}
	}
}

func allowCORS(h http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if origin := r.Header.Get("Origin"); origin == "http://localhost:3000" {
			w.Header().Set("Access-Control-Allow-Origin", origin)
			if r.Method == "OPTIONS" && r.Header.Get("Access-Control-Request-Method") != "" {
				preflightHandler(w, r)
				return
			}
		}
		h.ServeHTTP(w, r)
	})
}

func preflightHandler(w http.ResponseWriter, r *http.Request) {
	headers := []string{"Content-Type", "Accept"}
	w.Header().Set("Access-Control-Allow-Headers", strings.Join(headers, ","))
	methods := []string{"GET", "HEAD", "POST", "PUT", "DELETE"}
	w.Header().Set("Access-Control-Allow-Methods", strings.Join(methods, ","))
	// logger.Infof("preflight request for %s", r.URL.Path)
}

func runGateway(port int, endpoints map[string]string) error {
	ctx := context.Background()
	ctx, cancel := context.WithCancel(ctx)
	defer cancel()

	mux := runtime.NewServeMux()
	opts := []grpc.DialOption{grpc.WithInsecure()}

	// Register Nyaa service
	if err := gw.RegisterNyaaHandlerFromEndpoint(ctx, mux, endpoints["nyaa"], opts); err != nil {
		return err
	}

	s := &http.Server{
		Addr:    fmt.Sprintf(":%d", port),
		Handler: allowCORS(mux),
	}

	return s.ListenAndServe()
}

func runKokoro(port int, shutdown chan<- bool) error {
	mux := http.NewServeMux()
	mux.HandleFunc("/ping", func(w http.ResponseWriter, r *http.Request) {
		reply, err := json.Marshal(struct{ Message string }{"pong"})
		if err != nil {
			logger.Error("unable to marshal reply for pong")
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		w.Write(reply)
	})
	mux.HandleFunc("/shutdown", func(w http.ResponseWriter, r *http.Request) {
		reply, err := json.Marshal(struct{ Message string }{"shutdown request received"})
		if err != nil {
			logger.Error("unable to marshal reply for shutdown")
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		w.Write(reply)

		logger.Infof("shutdown request received. shutting down.")
		switch r.Method {
		case http.MethodGet:
			shutdown <- true
		}
	})
	return http.ListenAndServe(fmt.Sprintf(":%d", port), mux)
}

const helpText = `Usage: kabedon-kokoro [options]

kabedon-kokoro converts REST to gRPC calls, and provides a secondary server
to log information and control the gRPC services.

Options:
  --help              Prints program help text
  
  --gateway-port=PORT Run gateway on PORT
  --kokoro-port=PORT  Run secondary server on PORT
  
  --nyaa-port=PORT    Run kabedon-nyaa service on PORT
`
