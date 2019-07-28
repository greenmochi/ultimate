package store

import (
	"github.com/greenmochi/ultimate/services/myanimelist/myanimelist/data"
)

// Store TODO
type Store struct {
	animeLists map[string]*data.AnimeList
}

// New creates a new store
func New() *Store {
	return &Store{
		animeLists: make(map[string]*data.AnimeList),
	}
}

// SetAnimeList TODO
func (s *Store) SetAnimeList(user string, animeList *data.AnimeList) {
	s.animeLists[user] = animeList
}

// GetAnimeList TODO
func (s *Store) GetAnimeList(user string) *data.AnimeList {
	if animeList, ok := s.animeLists[user]; ok {
		// Consider returning a copy (immutable) instead to avoid side effects
		return animeList
	}
	return nil
}
