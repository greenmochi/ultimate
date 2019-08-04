package grpc

import (
	"context"
	"fmt"
	"net"

	log "github.com/sirupsen/logrus"
	"google.golang.org/grpc"

	"github.com/greenmochi/ultimate/services/myanimelist/myanimelist"
	pb "github.com/greenmochi/ultimate/services/myanimelist/proto/myanimelist"
	message "github.com/greenmochi/ultimate/services/myanimelist/proto/myanimelist/message"
)

// Serve serves the grpc server over this port
func Serve(mal *myanimelist.MyAnimeList, port int) error {
	listener, err := net.Listen("tcp", fmt.Sprintf(":%d", port))
	if err != nil {
		log.Fatalf("Failed to listen: %v", err)
		return err
	}
	server := grpc.NewServer()
	pb.RegisterMyAnimeListServer(server, &myanimelistServer{mal: mal})
	return server.Serve(listener)
}

type myanimelistServer struct {
	mal *myanimelist.MyAnimeList
}

func (s *myanimelistServer) Ping(context.Context, *pb.PingRequest) (*pb.PingReply, error) {
	return &pb.PingReply{}, nil
}

func (s *myanimelistServer) Search(context.Context, *message.SearchRequest) (*message.SearchReply, error) {
	return &message.SearchReply{}, nil
}

func (s *myanimelistServer) CurrentResults(context.Context, *message.CurrentResultsRequest) (*message.CurrentResultsReply, error) {
	return &message.CurrentResultsReply{}, nil
}
