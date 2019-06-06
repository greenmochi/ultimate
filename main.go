package main

import (
	"github.com/greenmochi/kabedon-nyaa/grpc"
)

const (
	port = ":9995"
)

func main() {
	grpc.RunGRPC(port)
}
