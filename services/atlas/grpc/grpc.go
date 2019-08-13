package grpc

import (
	"context"
	"fmt"
	"net"

	log "github.com/sirupsen/logrus"
	"google.golang.org/grpc"

	"github.com/greenmochi/ultimate/services/atlas/atlas"
	pb "github.com/greenmochi/ultimate/services/atlas/proto/atlas"
	message "github.com/greenmochi/ultimate/services/atlas/proto/atlas/message"
)

// Serve serves the grpc server over this port
func Serve(a *atlas.Atlas, port int) error {
	listener, err := net.Listen("tcp", fmt.Sprintf(":%d", port))
	if err != nil {
		log.Fatalf("Failed to listen: %v", err)
		return err
	}
	opts := []grpc.ServerOption{
		withLoggingInterceptor(),
	}
	server := grpc.NewServer(opts...)
	pb.RegisterAtlasServer(server, &atlasServer{atlas: a})
	return server.Serve(listener)
}

func withLoggingInterceptor() grpc.ServerOption {
	loggingInterceptor := func(ctx context.Context, req interface{}, info *grpc.UnaryServerInfo, handler grpc.UnaryHandler) (resp interface{}, err error) {
		log.WithFields(log.Fields{"req": req}).Info("Incoming gRPC request")
		return handler(ctx, req)
	}
	return grpc.UnaryInterceptor(loggingInterceptor)
}

type atlasServer struct {
	atlas *atlas.Atlas
}

func (s *atlasServer) Ping(ctx context.Context, in *pb.PingRequest) (*pb.PingReply, error) {
	log.WithFields(log.Fields{
		"message": in.Message,
	}).Info("Ping request received")
	return &pb.PingReply{
		Message: in.Message,
	}, nil
}

func (s *atlasServer) GetPlaylist(ctx context.Context, in *message.PlaylistRequest) (*message.Playlist, error) {
	var playlistItems []*message.Playlist_PlaylistItem
	for _, playlistItem := range s.atlas.GetPlaylistItems() {
		item := &message.Playlist_PlaylistItem{
			Filename: playlistItem.Filename,
			Path:     playlistItem.Path,
		}
		playlistItems = append(playlistItems, item)
	}
	return &message.Playlist{
		Items: playlistItems,
	}, nil
}
