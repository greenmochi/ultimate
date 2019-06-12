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

var shutdown = make(chan bool)

// Start starts the gRPC service
func Start(port int) {
	lis, err := net.Listen("tcp", fmt.Sprintf(":%d", port))
	if err != nil {
		logger.Fatalf("failed to listen: %v", err)
	}

	s := grpc.NewServer()
	pb.RegisterNyaaServer(s, &server{})

	logger.Infof("listening on :%d", port)
	go func() {
		if err := s.Serve(lis); err != nil {
			logger.Fatalf("failed to serve: %v", err)
			os.Exit(1)
		}
	}()
	select {
	case <-shutdown:
		logger.Infof("graceful shutdown")
		s.GracefulStop()
	}
}

// server is used to implement nyaa server
type server struct{}

func (s *server) Shutdown(ctx context.Context, in *pb.ShutdownRequest) (*pb.ShutdownReply, error) {
	logger.Infof("shutdown request received")
	defer func() {
		shutdown <- true
	}()
	return &pb.ShutdownReply{}, nil
}

func (s *server) Search(ctx context.Context, in *pb.SearchRequest) (*pb.SearchReply, error) {
	logger.Infof("search request received")
	result := pb.Result{
		Category:  "foo",
		Name:      "sdf",
		Link:      "sdfds",
		Size:      "dsfds",
		Date:      "sdfds",
		Seeders:   23432432,
		Leechers:  235432,
		Downloads: 23523,
	}
	results := []*pb.Result{&result}
	return &pb.SearchReply{
		Results: results,
	}, nil
}

// Ping implements nyaa.Ping
func (s *server) Ping(ctx context.Context, in *pb.PingRequest) (*pb.PingReply, error) {
	logger.Infof("received: %v", in.Name)
	return &pb.PingReply{Message: "Ping " + in.Name}, nil
}

func (s *server) Ping2(ctx context.Context, in *pb.PingRequest) (*pb.PingReply, error) {
	logger.Infof("received: %v", in.Name)
	return &pb.PingReply{Message: "Ping2 " + in.Name}, nil
}
