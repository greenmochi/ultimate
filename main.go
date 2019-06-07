package main

import (
	"os"

	"github.com/greenmochi/kabedon-nyaa/api"
	"github.com/greenmochi/kabedon-nyaa/logger"
)

const (
	port = ":9995"
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

	// Run gRPC service, uncomment/comment when you don't want it running
	//grpc.Setup(port)
}
