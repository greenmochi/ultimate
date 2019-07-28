package store

import (
	"github.com/greenmochi/ultimate/services/myanimelist/myanimelist/data"
)

// Store TODO
type Store struct {
	userAnimeLists map[string]*data.UserAnimeList
}

// New creates a new store
func New() *Store {
	return &Store{
		userAnimeLists: make(map[string]*data.UserAnimeList),
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
