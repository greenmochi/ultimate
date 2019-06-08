package main

import (
	"flag"
	"fmt"
	"html"
	"net/http"
	"os"
	"time"

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

	var gatewayPort int
	var kokoroPort int
	var nyaaEndpoint string
	flag.IntVar(&gatewayPort, "gateway-port", 9990, "Port to serve the gateway server")
	flag.IntVar(&kokoroPort, "kokoro-port", 9991, "Port to serve the kokoro server")
	flag.StringVar(&nyaaEndpoint, "nyaa-endpoint", "localhost:9995", "Nyaa grpc service endpoint")
	flag.Parse()

	endpoints := map[string]string{
		"nyaa": nyaaEndpoint,
	}

	// Load and run all gRPC handlers on a port
	go func() {
		log.Infof("Running gateway server on :%d", gatewayPort)
		if err := runGateway(log, gatewayPort, endpoints); err != nil {
			log.Fatal(err)
		}
	}()

	log.Infof("Runing kokoro server on :%d", kokoroPort)
	if err := runKokoro(log, kokoroPort); err != nil {
		log.Fatal(err)
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
