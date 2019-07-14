package service

import (
	"context"
	"fmt"
	"net"

	log "github.com/sirupsen/logrus"
	"google.golang.org/grpc"

	nyaa "github.com/greenmochi/ultimate/services/nyaa/nyaa"
	pb "github.com/greenmochi/ultimate/services/nyaa/proto/nyaa"
)

// Serve starts the gRPC service
func Serve(port int, a *API) error {
	lis, err := net.Listen("tcp", fmt.Sprintf(":%d", port))
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}

	s := grpc.NewServer()
	pb.RegisterNyaaServer(s, &nyaaServer{
		api: a,
	})

	return s.Serve(lis)
}

// nyaaServer is used to implement nyaa server
type nyaaServer struct {
	api *API
}

// Ping TODO
func (s *nyaaServer) Ping(ctx context.Context, in *pb.PingRequest) (*pb.PingReply, error) {
	log.Infof("ping request received: %v", in.Message)
	return &pb.PingReply{Message: "Ping " + in.Message}, nil
}

func (s *nyaaServer) Shutdown(ctx context.Context, in *pb.ShutdownRequest) (*pb.ShutdownReply, error) {
	log.Infof("shutdown request received")
	return &pb.ShutdownReply{}, nil
}

func (s *nyaaServer) getCurrentResults() []*pb.Result {
	results := s.api.GetCurrentResults()
	if len(results) <= 0 {
		log.Warning("getCurrentResults returned no results.")
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

func (s *nyaaServer) Search(ctx context.Context, in *pb.SearchRequest) (*pb.SearchReply, error) {
	log.Infof("search request received: %v", in.String())

	url := nyaa.DefaultURL()
	url.Query = in.Query
	url.Sort = nyaa.SortOpt(in.Sort)
	url.Order = nyaa.OrderOpt(in.Order)
	url.Filter = nyaa.FilterOpt(in.Filter)
	url.Category = nyaa.CategoryOpt(in.Category)
	url.Page = int(in.Page)
	if ok := s.api.Search(url); !ok {
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
