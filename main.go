package main

import (
	"flag"
	"fmt"
	"html"
	"net/http"
	"os"
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
	flag.IntVar(&nyaaPort, "nyaa-port", 9996, "Nyaa grpc server port")
	flag.Parse()
	flag.Visit(func(fn *flag.Flag) {
		if fn.Name == "help" {
			fmt.Print(helpText)
			os.Exit(1)
		}
	})

	// Run all gRPC services
	go func() {
		binary := "./kabedon-nyaa.exe"
		log.Infof("running %s on port=%d", binary, nyaaPort)
		if err := process.Run(binary, nyaaPort); err != nil {
			log.Fatal(binary, " finished with ", err)
		}
	}()

	// Load and run all gRPC handlers on a port
	endpoints := map[string]string{
		"nyaa": fmt.Sprintf("localhost:%d", nyaaPort),
	}
	go func() {
		log.Infof("Running gateway server on :%d", gatewayPort)
		if err := runGateway(log, gatewayPort, endpoints); err != nil {
			log.Fatal(err)
		}
	}()

	log.Infof("Running kokoro server on :%d", kokoroPort)
	if err := runKokoro(log, kokoroPort); err != nil {
		log.Fatal(err)
	}

	// TODO capture os signal for interrupt or process termiante
	// then gracefully shutdown. run kokoro server concurrently then
	// select {} <- chan
	// shutdown()
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

func runKokoro(log *logger.KabedonLogger, port int) error {
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
	return http.ListenAndServe(fmt.Sprintf(":%d", port), mux)
}

// shutdown close gRPC services and anything else gracefully
func shutdown() {
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
