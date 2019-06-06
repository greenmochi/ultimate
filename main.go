package main

import (
	"flag"
	"fmt"
	"html"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/grpc-ecosystem/grpc-gateway/runtime"
	"golang.org/x/net/context"
	"google.golang.org/grpc"

	gw "github.com/greenmochi/kabedon-kokoro/proto"
)

var (
	echoEndpoint = flag.String("echo_endpoint", "localhost:50051", "endpoint of YourService")
	nyaaEndpoint = flag.String("nyaa_endpoint", "localhost:9995", "endpoint of Nyaa grpc service")
)

func runProxy() error {
	ctx := context.Background()
	ctx, cancel := context.WithCancel(ctx)
	defer cancel()

	mux := runtime.NewServeMux()
	opts := []grpc.DialOption{grpc.WithInsecure()}
	err := gw.RegisterNyaaHandlerFromEndpoint(ctx, mux, *nyaaEndpoint, opts)
	if err != nil {
		return err
	}
	return http.ListenAndServe(":8080", mux)
}

func run() error {
	myMux := http.NewServeMux()
	myMux.HandleFunc("/log", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "Hello, %q", html.EscapeString(r.URL.Path))
		conn, err := grpc.Dial("localhost:9995", grpc.WithInsecure())
		if err != nil {
			log.Fatalf("did not connect: %v", err)
		}
		defer conn.Close()
		c := gw.NewNyaaClient(conn)

		ctx, cancel := context.WithTimeout(context.Background(), time.Second)
		defer cancel()

		name := "hueyjj"
		if len(os.Args) > 1 {
			name = os.Args[1]
		}

		resp, err := c.Ping(ctx, &gw.PingRequest{Name: name})
		if err != nil {
			log.Fatalf("could not greet: %v", err)
		}
		log.Printf("Greeting: %s", resp.Message)
	})
	return http.ListenAndServe(":8081", myMux)
}

func main() {
	flag.Parse()
	// defer log.Flush()

	go func() {
		if err := runProxy(); err != nil {
			log.Fatal(err)
		}
	}()

	log.Printf("Runing kokoro server on %s", ":8081")
	if err := run(); err != nil {
		log.Fatal(err)
	}
}
