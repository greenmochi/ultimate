package grpc

import (
	"context"
	"log"
	"net"
	"os"

	pb "github.com/greenmochi/kabedon-nyaa/proto"
	"google.golang.org/grpc"
)

// RunGRPC starts the gRPC service
func RunGRPC(port string) {
	lis, err := net.Listen("tcp", port)
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}

	s := grpc.NewServer()
	pb.RegisterNyaaServer(s, &server{})

	log.Printf("Listening on %s", port)
	if err := s.Serve(lis); err != nil {
		log.Fatalf("failed to serve: %v", err)
		os.Exit(1)
	}
}

// server is used to implement helloworld.GreeterServer.
type server struct{}

// Ping implements nyaa.GreeterServer
func (s *server) Ping(ctx context.Context, in *pb.PingRequest) (*pb.PingReply, error) {
	log.Printf("Received: %v", in.Name)
	return &pb.PingReply{Message: "Ping " + in.Name}, nil
}

func (s *server) Ping2(ctx context.Context, in *pb.PingRequest) (*pb.PingReply, error) {
	log.Printf("Received: %v", in.Name)
	return &pb.PingReply{Message: "Ping2 " + in.Name}, nil
}
