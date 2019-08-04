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

func (s *myanimelistServer) Ping(ctx context.Context, in *pb.PingRequest) (*pb.PingReply, error) {
	return &pb.PingReply{}, nil
}

func (s *myanimelistServer) GetUserAnimeList(ctx context.Context, in *message.Username) (*message.UserAnimeList, error) {
	userAnimeList, err := s.mal.GetUserAnimeList(in.Username)
	if err != nil {
		return nil, err
	}
	reply := &message.UserAnimeList{
		Username:  userAnimeList.Username,
		UserAnime: make([]*message.UserAnimeList_UserAnime, 0),
	}
	for _, u := range userAnimeList.Anime {
		a := &message.UserAnimeList_UserAnime{
			Status: int32(u.Status),
			Score:  int32(u.Score),
			Tags:   u.Tags,
			// MAL devs return too many different types... Don't deal with this
			//IsRewatching:       u.IsRewatching,
			NumWatchedEpisodes: int32(u.NumWatchedEpisodes),
			AnimeTitle:         u.AnimeTitle,
			AnimeNumEpisodes:   int32(u.AnimeNumEpisodes),
			AnimeAiringStatus:  int32(u.AnimeAiringStatus),
			AnimeID:            int32(u.AnimeID),
			AnimeStudios:       u.AnimeStudios,
			AnimeLicensors:     u.AnimeLicensors,
			AnimeSeason: &message.UserAnimeList_UserAnime_AnimeSeason{
				Year:   int32(u.AnimeSeason.Year),
				Season: u.AnimeSeason.Season,
			},
			HasEpisodeVideo:       u.HasEpisodeVideo,
			HasPromotionVideo:     u.HasPromotionVideo,
			HasVideo:              u.HasVideo,
			VideoURL:              u.VideoURL,
			AnimeURL:              u.AnimeURL,
			AnimeImagePath:        u.AnimeImagePath,
			IsAddedToList:         u.IsAddedToList,
			AnimeMediaTypeString:  u.AnimeMediaTypeString,
			AnimeMPAARatingString: u.AnimeMPAARatingString,
			StartDateString:       u.StartDateString,
			FinishDateString:      u.FinishDateString,
			AnimeStartDateString:  u.AnimeStartDateString,
			AnimeEndDateString:    u.AnimeEndDateString,
			DaysString:            int32(u.DaysString),
			StorageString:         u.StorageString,
			PriorityString:        u.PriorityString,
		}
		reply.UserAnime = append(reply.UserAnime, a)
	}
	return reply, nil
}
