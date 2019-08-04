package grpc

import (
	"context"
	"fmt"
	"log"
	"net"

	"google.golang.org/grpc"

	pb "github.com/greenmochi/ultimate/services/myanimelist/proto/myanimelist"
	message "github.com/greenmochi/ultimate/services/myanimelist/proto/myanimelist/message"
)

// Serve serves the grpc server over this port
func Serve(port int) error {
	lis, err := net.Listen("tcp", fmt.Sprintf(":%d", port))
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}
	s := grpc.NewServer()
	pb.RegisterMyAnimeListServer(s, &myanimelistServer{})
	return s.Serve(lis)
}

type myanimelistServer struct {
}

func (s *myanimelistServer) Ping(context.Context, *pb.PingRequest) (*pb.PingReply, error) {
	return &pb.PingReply{}, nil
}

func (s *myanimelistServer) Shutdown(context.Context, *pb.ShutdownRequest) (*pb.ShutdownReply, error) {
	return &pb.ShutdownReply{}, nil
}

func (s *myanimelistServer) Search(context.Context, *message.SearchRequest) (*message.SearchReply, error) {
	return &message.SearchReply{}, nil
}

func (s *myanimelistServer) CurrentResults(context.Context, *message.CurrentResultsRequest) (*message.CurrentResultsReply, error) {
	return &message.CurrentResultsReply{}, nil
}
