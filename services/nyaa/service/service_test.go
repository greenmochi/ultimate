package service

import (
	"context"
	"fmt"
	"testing"
	"time"

	"google.golang.org/grpc"

	pb "github.com/greenmochi/ultimate/services/nyaa/proto"
)

func TestService(t *testing.T) {
	conn, err := grpc.Dial("localhost:9991", grpc.WithInsecure())
	if err != nil {
		fmt.Printf("Unable to dial %s", err)
	}
	defer conn.Close()

	ctx, cancel := context.WithTimeout(context.Background(), time.Second)
	defer cancel()

	c := pb.NewNyaaClient(conn)
	searchRequest := pb.SearchRequest{
		Query:    "naruto",
		Filter:   "0",
		Category: "0_0",
		Sort:     "id",
		Order:    "desc",
		Page:     0,
	}
	reply, err := c.Search(ctx, &searchRequest)
	fmt.Printf("%+v\n", reply)
}
