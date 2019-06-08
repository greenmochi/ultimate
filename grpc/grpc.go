package grpc

import (
	"context"
	"fmt"
	"net"
	"os"

	"github.com/greenmochi/kabedon-nyaa/logger"

	pb "github.com/greenmochi/kabedon-nyaa/proto"
	"google.golang.org/grpc"
)

// Setup starts the gRPC service
func Setup(port int) {
	lis, err := net.Listen("tcp", fmt.Sprintf(":%d", port))
	if err != nil {
		logger.Fatalf("failed to listen: %v", err)
	}

	s := grpc.NewServer()
	pb.RegisterNyaaServer(s, &server{})

	logger.Infof("listening on :%d", port)
	if err := s.Serve(lis); err != nil {
		logger.Fatalf("failed to serve: %v", err)
		os.Exit(1)
	}
}

// server is used to implement helloworld.GreeterServer.
type server struct{}

// Ping implements nyaa.GreeterServer
func (s *server) Ping(ctx context.Context, in *pb.PingRequest) (*pb.PingReply, error) {
	logger.Infof("Received: %v", in.Name)
	return &pb.PingReply{Message: "Ping " + in.Name}, nil
}

func (s *server) Ping2(ctx context.Context, in *pb.PingRequest) (*pb.PingReply, error) {
	logger.Infof("Received: %v", in.Name)
	return &pb.PingReply{Message: "Ping2 " + in.Name}, nil
}
