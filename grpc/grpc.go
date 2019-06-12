package grpc

import (
	"context"
	"fmt"
	"net"
	"os"

	a "github.com/greenmochi/kabedon-nyaa/api"
	"github.com/greenmochi/kabedon-nyaa/logger"

	pb "github.com/greenmochi/kabedon-nyaa/proto"
	"google.golang.org/grpc"
)

var shutdown = make(chan bool)

// Start starts the gRPC service
func Start(a *a.API, port int) {
	lis, err := net.Listen("tcp", fmt.Sprintf(":%d", port))
	if err != nil {
		logger.Fatalf("failed to listen: %v", err)
	}

	s := grpc.NewServer()
	pb.RegisterNyaaServer(s, &nyaaServer{
		api: a,
	})

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

// nyaaServer is used to implement nyaa server
type nyaaServer struct {
	api *a.API
}

// Ping TODO
func (s *nyaaServer) Ping(ctx context.Context, in *pb.PingRequest) (*pb.PingReply, error) {
	logger.Infof("ping request received: %v", in.Message)
	return &pb.PingReply{Message: "Ping " + in.Message}, nil
}

func (s *nyaaServer) Shutdown(ctx context.Context, in *pb.ShutdownRequest) (*pb.ShutdownReply, error) {
	logger.Infof("shutdown request received")
	defer func() {
		shutdown <- true
	}()
	return &pb.ShutdownReply{}, nil
}

func (s *nyaaServer) Search(ctx context.Context, in *pb.SearchRequest) (*pb.SearchReply, error) {
	logger.Infof("search request received: %v", in.String())
	if ok := s.api.Search(in.Query); !ok {
		return &pb.SearchReply{Results: []*pb.Result{}}, nil
	}

	return &pb.SearchReply{
		Results: s.getCurrentResults(),
	}, nil
}

func (s *nyaaServer) CurrentResults(ctx context.Context, in *pb.CurrentResultsRequest) (*pb.CurrentResultsReply, error) {
	return &pb.CurrentResultsReply{
		Results: s.getCurrentResults(),
	}, nil
}

func (s *nyaaServer) getCurrentResults() []*pb.Result {
	results := s.api.GetCurrentResults()
	if len(results) <= 0 {
		logger.Warning("getCurrentResults returned no results.")
		return []*pb.Result{}
	}

	var replyResults []*pb.Result
	for _, result := range results {
		replyResults = append(replyResults, &pb.Result{
			Category:  result.Category,
			Name:      result.Name,
			Link:      result.Link,
			Size:      result.Size,
			Date:      result.Date,
			Seeders:   result.Seeders,
			Leechers:  result.Leechers,
			Downloads: result.Downloads,
		})
	}
	return replyResults
}
