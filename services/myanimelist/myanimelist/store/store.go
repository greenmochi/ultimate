package store

import (
	"github.com/greenmochi/ultimate/services/myanimelist/myanimelist/data"
)

// Store TODO
type Store struct {
	userAnimeLists     map[string]*data.UserAnimeList
	animeSearchResults map[string]*data.AnimeSearchResult
	anime              map[int]*data.Anime
}

// New creates a new store
func New() *Store {
	return &Store{
		userAnimeLists:     make(map[string]*data.UserAnimeList),
		animeSearchResults: make(map[string]*data.AnimeSearchResult),
		anime:              make(map[int]*data.Anime),
	}
}

// SetUserAnimeList TODO
func (s *Store) SetUserAnimeList(user string, userAnimeList *data.UserAnimeList) {
	s.userAnimeLists[user] = userAnimeList
}

// GetUserAnimeList TODO
func (s *Store) GetUserAnimeList(user string) *data.UserAnimeList {
	if userAnimeList, ok := s.userAnimeLists[user]; ok {
		// Consider returning a copy (immutable) instead to avoid side effects
		return userAnimeList
	}
	return nil
}

func (s *Store) SetAnimeSearchResults(results []*data.AnimeSearchResult) {
	// Clear last anime results, we only store the most recent search results
	s.animeSearchResults = make(map[string]*data.AnimeSearchResult)
	for _, result := range results {
		s.animeSearchResults[result.Title] = result
	}
}

func (s *Store) GetAnimeSearchResult(title string) *data.AnimeSearchResult {
	if result, ok := s.animeSearchResults[title]; ok {
		return result
	}
	return nil
}

func (s *Store) SetAnime(id int, anime *data.Anime) {
	s.anime[id] = anime
}

func (s *Store) GetAnime(id int) *data.Anime {
	if anime, ok := s.anime[id]; ok {
		return anime
	}
	return nil
}

func (s *Store) GetAnimeByTitle(title string) *data.Anime {
	for _, anime := range s.anime {
		if anime.Title == title {
			return anime
		}
	}
	return nil
}
