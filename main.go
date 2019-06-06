package main

import (
	"os"
	"fmt"
	"github.com/greenmochi/kabedon-nyaa/torrent"
)

const (
	port = ":9995"
)

func main() {
	// Run gRPC service, uncomment/comment when you don't want it running
	//grpc.RunGRPC(port)
	client, err := torrent.NewClient()
	if err != nil {
		fmt.Println(err)
		os.Exit(1)
	}
	if client != nil {
		fmt.Println("client no nil")
	}
}
