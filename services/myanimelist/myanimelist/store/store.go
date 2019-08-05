package store

import (
	"github.com/greenmochi/ultimate/services/myanimelist/myanimelist/data"
)

// Store TODO
type Store struct {
	userAnimeLists       map[string]*data.UserAnimeList
	lastAnimeSearchQuery string
	animeSearchResults   []*data.AnimeSearchResult
	anime                map[int]*data.Anime
}

// New creates a new store
func New() *Store {
	return &Store{
		userAnimeLists:     make(map[string]*data.UserAnimeList),
		animeSearchResults: make([]*data.AnimeSearchResult, 0),
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

// GetLastAnimeSearchQuery TODO
func (s *Store) GetLastAnimeSearchQuery() string {
	return s.lastAnimeSearchQuery
}

// SetAnimeSearchResults TODO
func (s *Store) SetAnimeSearchResults(query string, results []*data.AnimeSearchResult) {
	s.lastAnimeSearchQuery = query
	// Clear last anime results, we only store the most recent search results
	s.animeSearchResults = results
}

// GetAnimeSearchResults TODO
func (s *Store) GetAnimeSearchResults() []*data.AnimeSearchResult {
	return s.animeSearchResults
}

// GetAnimeSearchResult TODO
func (s *Store) GetAnimeSearchResult(title string) *data.AnimeSearchResult {
	for _, result := range s.animeSearchResults {
		if result.Title == title {
			return result
		}
	}
	return nil
}

// SetAnime TODO
func (s *Store) SetAnime(id int, anime *data.Anime) {
	s.anime[id] = anime
}

// GetAnime TODO
func (s *Store) GetAnime(id int) *data.Anime {
	if anime, ok := s.anime[id]; ok {
		return anime
	}
	return nil
}

// GetAnimeByTitle TODO
func (s *Store) GetAnimeByTitle(title string) *data.Anime {
	for _, anime := range s.anime {
		if anime.Title == title {
			return anime
		}
	}
	return nil
}

// GetAnimeByLink TODO
func (s *Store) GetAnimeByLink(link string) *data.Anime {
	for _, anime := range s.anime {
		if anime.URL == link {
			return anime
		}
	}
	return nil
}
