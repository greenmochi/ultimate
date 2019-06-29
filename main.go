package main

import (
	"flag"
	"os"

	"github.com/greenmochi/ultimate-nyaa/api"
	"github.com/greenmochi/ultimate-nyaa/grpc"
	"github.com/greenmochi/ultimate-nyaa/logger"
)

func main() {
	// anacrolix/torrent is outputting crazy noise, turn it off and log to file instead
	os.Stdout = nil
	os.Stderr = nil
	defer logger.Close()

	api, err := api.Setup()
	if err != nil {
		logger.Fatal("unable to set API up", err)
		os.Exit(1)
	}
	defer api.TearDown()

	logger.Info("API setup successfully.")

	var port int
	flag.IntVar(&port, "port", 9995, "Port to serve on")
	flag.Parse()

	// Run gRPC service
	grpc.Start(api, port)
}
