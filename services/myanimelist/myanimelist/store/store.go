package store

import (
	"github.com/greenmochi/ultimate/services/myanimelist/myanimelist/data"
)

// Store TODO
type Store struct {
	userAnimeLists     map[string]*data.UserAnimeList
	animeSearchResults map[string]*data.AnimeSearchResult
}

// New creates a new store
func New() *Store {
	return &Store{
		userAnimeLists:     make(map[string]*data.UserAnimeList),
		animeSearchResults: make(map[string]*data.AnimeSearchResult),
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
