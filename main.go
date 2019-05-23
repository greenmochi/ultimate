package main

import (
	"context"
	"log"
	"net"

	pb "github.com/greenmochi/kabedon-nyaa/proto"
	"google.golang.org/grpc"
)

const (
	port = ":9995"
)

// server is used to implement helloworld.GreeterServer.
type server struct{}

// SayPing implements nyaa.GreeterServer
func (s *server) Ping(ctx context.Context, in *pb.PingRequest) (*pb.PingReply, error) {
	log.Printf("Received: %v", in.Name)
	return &pb.PingReply{Message: "Ping " + in.Name}, nil
}

func main() {
	lis, err := net.Listen("tcp", port)
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}
	s := grpc.NewServer()
	pb.RegisterNyaaServer(s, &server{})
	if err := s.Serve(lis); err != nil {
		log.Fatalf("failed to serve: %v", err)
	}
}
