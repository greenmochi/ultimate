package main

import (
	"flag"
	"fmt"
	"html"
	"net/http"
	"os"
	"time"

	"github.com/golang/glog"
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
	err := gw.RegisterGreeterHandlerFromEndpoint(ctx, mux, *echoEndpoint, opts)
	if err != nil {
		return err
	}
	err = gw.RegisterPoopHandlerFromEndpoint(ctx, mux, *echoEndpoint, opts)
	if err != nil {
		return err
	}
	err = gw.RegisterNyaaHandlerFromEndpoint(ctx, mux, *nyaaEndpoint, opts)
	if err != nil {
		return err
	}
	return http.ListenAndServe(":8080", mux)
}

func run() error {
	myMux := http.NewServeMux()
	myMux.HandleFunc("/penis", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "Hello, %q", html.EscapeString(r.URL.Path))
		conn, err := grpc.Dial("localhost:50051", grpc.WithInsecure())
		if err != nil {
			glog.Fatalf("did not connect: %v", err)
		}
		defer conn.Close()
		c := gw.NewGreeterClient(conn)

		// Contact the server and print out its response.
		name := "hueyjj"
		if len(os.Args) > 1 {
			name = os.Args[1]
		}
		ctx, cancel := context.WithTimeout(context.Background(), time.Second)
		defer cancel()
		resp, err := c.SayHello(ctx, &gw.HelloRequest{Name: name})
		if err != nil {
			glog.Fatalf("could not greet: %v", err)
		}
		glog.Infof("Greeting: %s", resp.Message)
	})
	return http.ListenAndServe(":8081", myMux)
}

func main() {
	flag.Parse()
	// defer glog.Flush()

	glog.Infof("Runing proxy server on :%s", "8080")
	go func() {
		if err := runProxy(); err != nil {
			glog.Fatal(err)
		}
	}()

	if err := run(); err != nil {
		glog.Fatal(err)
	}
}
