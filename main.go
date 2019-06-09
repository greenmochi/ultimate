package main

import (
	"flag"
	"fmt"
	"html"
	"net/http"
	"os"
	"os/signal"
	"path/filepath"
	"syscall"
	"time"

	"github.com/greenmochi/kabedon-kokoro/process"

	"github.com/grpc-ecosystem/grpc-gateway/runtime"
	"golang.org/x/net/context"
	"google.golang.org/grpc"

	"github.com/greenmochi/kabedon-kokoro/logger"
	gw "github.com/greenmochi/kabedon-kokoro/proto"
)

func main() {
	// Setup logger. Output to stderr if can't write to a file
	var log *logger.KabedonLogger
	out, err := os.Create("kabedon-kokoro.log")
	if err != nil {
		log = logger.NewKabedonLogger(os.Stderr)
		log.Info("unable to create log file to write to. Write to stderr instead")
	} else {
		log = logger.NewKabedonLogger(out)
	}
	defer out.Close()

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
		log.Infof("running %s on port=%d", binary, nyaaPort)
		cmd, err := process.Start(binary, nyaaPort)
		if err != nil {
			fullpath, err := filepath.Abs(binary)
			if err != nil {
				log.Fatal("couldn't resolve binary full path:", err)
			} else {
				log.Fatal("binary full path:", fullpath)
			}
		}

		// Wait for release signal when kabedon-kokoro finishes
		<-release

		// if err := cmd.Process.Release(); err != nil {
		// 	log.Fatalf("unable to release resources for %s: %s", binary, err)
		// }

		// Try to kill process by finding it (if it exists) with FindProcess
		// if _, err := os.FindProcess(cmd.ProcessState.Pid()); err == nil {
		// 	if err := cmd.Process.Kill(); err != nil {
		// 		log.Fatalf("unable to kill %s: %s", binary, err)
		// 	}
		// }
		if err := cmd.Process.Kill(); err != nil {
			log.Fatalf("unable to kill %s: %s", binary, err)
		}
		log.Infof("killed %s", binary)
		log.Info(binary, " finished with ", err)

		exit <- true
	}()

	// Load and run all gateway handlers on a port
	endpoints := map[string]string{
		"nyaa": fmt.Sprintf("localhost:%d", nyaaPort),
	}
	go func() {
		log.Infof("running gateway server on :%d", gatewayPort)
		if err := runGateway(log, gatewayPort, endpoints); err != nil {
			log.Fatal(err)
		}
	}()

	// Run secondary server
	go func() {
		log.Infof("running kokoro server on :%d", kokoroPort)
		if err := runKokoro(log, kokoroPort, shutdown); err != nil {
			log.Fatal(err)
		}
	}()

	// Graceful shutdown
	log.Infof("graceful shutdown loop started")
	interrupt := make(chan os.Signal, 1)
	signal.Notify(interrupt, os.Interrupt, syscall.SIGTERM)
	for {
		select {
		case <-shutdown:
			log.Info("shutdown signal received")
			release <- true
		case <-interrupt:
			log.Info("interrupt signal received")
			release <- true
		case <-exit:
			log.Info("exit signal received. Program exited.")
			os.Exit(1)
			return
		}
	}
}

func runGateway(log *logger.KabedonLogger, port int, endpoints map[string]string) error {
	ctx := context.Background()
	ctx, cancel := context.WithCancel(ctx)
	defer cancel()

	mux := runtime.NewServeMux()
	opts := []grpc.DialOption{grpc.WithInsecure()}

	// Register Nyaa service
	if err := gw.RegisterNyaaHandlerFromEndpoint(ctx, mux, endpoints["nyaa"], opts); err != nil {
		return err
	}

	return http.ListenAndServe(fmt.Sprintf(":%d", port), mux)
}

func runKokoro(log *logger.KabedonLogger, port int, shutdown chan<- bool) error {
	mux := http.NewServeMux()
	mux.HandleFunc("/log", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "Hello, %q", html.EscapeString(r.URL.Path))
		conn, err := grpc.Dial("localhost:9995", grpc.WithInsecure())
		if err != nil {
			log.Fatalf("did not connect: %v", err)
		}
		defer conn.Close()
		c := gw.NewNyaaClient(conn)

		ctx, cancel := context.WithTimeout(context.Background(), time.Second)
		defer cancel()

		resp, err := c.Ping(ctx, &gw.PingRequest{Name: "foobar"})
		if err != nil {
			log.Fatalf("could not greet: %v", err)
		}
		log.Infof("Greeting: %s", resp.Message)
	})
	mux.HandleFunc("/shutdown", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)

		log.Infof("shutdown request received. shutting down.")
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
