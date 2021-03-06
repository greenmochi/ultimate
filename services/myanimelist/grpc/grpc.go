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
	opts := []grpc.ServerOption{
		withLoggingInterceptor(),
	}
	server := grpc.NewServer(opts...)
	pb.RegisterMyAnimeListServer(server, &myanimelistServer{mal: mal})
	return server.Serve(listener)
}

func withLoggingInterceptor() grpc.ServerOption {
	loggingInterceptor := func(ctx context.Context, req interface{}, info *grpc.UnaryServerInfo, handler grpc.UnaryHandler) (resp interface{}, err error) {
		log.WithFields(log.Fields{"fullMethod": info.FullMethod, "req": req}).Info("Incoming gRPC request")
		return handler(ctx, req)
	}
	return grpc.UnaryInterceptor(loggingInterceptor)
}

type myanimelistServer struct {
	mal *myanimelist.MyAnimeList
}

func (s *myanimelistServer) Ping(ctx context.Context, in *pb.PingRequest) (*pb.PingReply, error) {
	log.WithFields(log.Fields{
		"message": in.Message,
	}).Info("Ping request received")
	return &pb.PingReply{
		Message: in.Message,
	}, nil
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
			AnimeId:            int32(u.AnimeID),
			AnimeStudios:       u.AnimeStudios,
			AnimeLicensors:     u.AnimeLicensors,
			AnimeSeason: &message.UserAnimeList_UserAnime_AnimeSeason{
				Year:   int32(u.AnimeSeason.Year),
				Season: u.AnimeSeason.Season,
			},
			HasEpisodeVideo:       u.HasEpisodeVideo,
			HasPromotionVideo:     u.HasPromotionVideo,
			HasVideo:              u.HasVideo,
			VideoUrl:              u.VideoURL,
			AnimeUrl:              u.AnimeURL,
			AnimeImagePath:        u.AnimeImagePath,
			IsAddedToList:         u.IsAddedToList,
			AnimeMediaTypeString:  u.AnimeMediaTypeString,
			AnimeMpaaRatingString: u.AnimeMPAARatingString,
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

func (s *myanimelistServer) SearchAnime(ctx context.Context, in *message.SearchQuery) (*message.AnimeSearchResults, error) {
	searchResults, err := s.mal.SearchAnime(in.Query)
	if err != nil {
		return nil, err
	}
	reply := &message.AnimeSearchResults{
		Results: make([]*message.AnimeSearchResults_AnimeSearchResult, 0),
	}
	for _, r := range searchResults {
		result := &message.AnimeSearchResults_AnimeSearchResult{
			ImgSrc:      r.ImgSrc,
			ImgBlob:     r.ImgBlob,
			Title:       r.Title,
			Link:        r.Link,
			Synopsis:    r.Synopsis,
			Type:        r.Type,
			NumEpisodes: r.NumEpisodes,
			Score:       r.Score,
		}
		reply.Results = append(reply.Results, result)
	}
	return reply, nil
}

func (s *myanimelistServer) GetAnimeByLink(ctx context.Context, in *message.AnimeLink) (*message.Anime, error) {
	anime, err := s.mal.GetAnimeByLink(in.Link)
	if err != nil {
		return nil, err
	}
	return &message.Anime{
		Id:          int32(anime.ID),
		Url:         anime.URL,
		Title:       anime.Title,
		ImgSrc:      anime.ImgSrc,
		ImgBlob:     anime.ImgBlob,
		Description: anime.Description,
		AltTitles: &message.Anime_AltTitles{
			Synonyms: anime.AltTitles.Synonyms,
			English:  anime.AltTitles.English,
			Japanese: anime.AltTitles.Japanese,
		},
		Info: &message.Anime_AnimeInformation{
			Type:      anime.Info.Type,
			Episodes:  anime.Info.Episodes,
			Status:    anime.Info.Status,
			Aired:     anime.Info.Aired,
			Premiered: anime.Info.Premiered,
			Broadcast: anime.Info.Broadcast,
			Producers: anime.Info.Producers,
			Licensors: anime.Info.Licensors,
			Studios:   anime.Info.Studios,
			Source:    anime.Info.Source,
			Genres:    anime.Info.Genres,
			Duration:  anime.Info.Duration,
			Rating:    anime.Info.Rating,
		},
		Stats: &message.Anime_AnimeStatistics{
			Score:      anime.Stats.Score,
			Ranked:     anime.Stats.Ranked,
			Popularity: anime.Stats.Popularity,
			Members:    anime.Stats.Members,
			Favorites:  anime.Stats.Favorites,
		},
	}, nil
}

func (s *myanimelistServer) GetAnimeByID(ctx context.Context, in *message.AnimeID) (*message.Anime, error) {
	anime, err := s.mal.GetAnimeByID(int(in.Id))
	if err != nil {
		return nil, err
	}
	return &message.Anime{
		Id:          int32(anime.ID),
		Url:         anime.URL,
		Title:       anime.Title,
		ImgSrc:      anime.ImgSrc,
		ImgBlob:     anime.ImgBlob,
		Description: anime.Description,
		AltTitles: &message.Anime_AltTitles{
			Synonyms: anime.AltTitles.Synonyms,
			English:  anime.AltTitles.English,
			Japanese: anime.AltTitles.Japanese,
		},
		Info: &message.Anime_AnimeInformation{
			Type:      anime.Info.Type,
			Episodes:  anime.Info.Episodes,
			Status:    anime.Info.Status,
			Aired:     anime.Info.Aired,
			Premiered: anime.Info.Premiered,
			Broadcast: anime.Info.Broadcast,
			Producers: anime.Info.Producers,
			Licensors: anime.Info.Licensors,
			Studios:   anime.Info.Studios,
			Source:    anime.Info.Source,
			Genres:    anime.Info.Genres,
			Duration:  anime.Info.Duration,
			Rating:    anime.Info.Rating,
		},
		Stats: &message.Anime_AnimeStatistics{
			Score:      anime.Stats.Score,
			Ranked:     anime.Stats.Ranked,
			Popularity: anime.Stats.Popularity,
			Members:    anime.Stats.Members,
			Favorites:  anime.Stats.Favorites,
		},
	}, nil
}
