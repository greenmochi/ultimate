package myanimelist

import (
	log "github.com/sirupsen/logrus"

	"github.com/greenmochi/ultimate/services/myanimelist/myanimelist/data"
	"github.com/greenmochi/ultimate/services/myanimelist/myanimelist/database"
	"github.com/greenmochi/ultimate/services/myanimelist/myanimelist/fetch"
	"github.com/greenmochi/ultimate/services/myanimelist/myanimelist/store"
)

// MyAnimeList handles main application logic
type MyAnimeList struct {
	store *store.Store
	db    *database.Database
}

// New TODO
func New() *MyAnimeList {
	return &MyAnimeList{
		store: store.New(),
		db:    database.New(),
	}
}

// InitDB TODO
func (mal *MyAnimeList) InitDB(path string) {
	if err := mal.db.Open(path); err != nil {
		log.Error(err)
	}
	log.Infof("Successfully initialized database: %s", path)
}

// CloseDB TODO
func (mal *MyAnimeList) CloseDB() {
	mal.db.Close()
}

// StoreAnimeList TODO
func (mal *MyAnimeList) storeUserAnimeList(user string, userAnimeList *data.UserAnimeList) error {
	mal.store.SetUserAnimeList(user, userAnimeList)
	if err := mal.db.InsertUserAnimeList(userAnimeList); err != nil {
		log.Error(err)
		return err
	}
	log.Infof("Successfully saved user %s anime list in the database", user)
	return nil
}

// GetUserAnimeList TODO
func (mal *MyAnimeList) GetUserAnimeList(user string) error {
	// Fetch user anime list (and stores it)
	userAnimeList, err := fetch.UserAnimeList(user)
	if err != nil {
		log.Error(err)
	}
	if err := mal.storeUserAnimeList(user, userAnimeList); err != nil {
		return err
	}
	return nil
}

func (mal *MyAnimeList) storeAnimeSearchResults(results []*data.AnimeSearchResult) {
	mal.store.SetAnimeSearchResults(results)
	log.Infof("Stored %d anime search results", len(results))
}

// SearchAnime TODO
func (mal *MyAnimeList) SearchAnime(query string) ([]*data.AnimeSearchResult, error) {
	results, err := fetch.AnimeSearchResults(query)
	if err != nil {
		log.Error(err)
		return nil, err
	}
	mal.storeAnimeSearchResults(results)
	return results, nil
}

func (mal *MyAnimeList) storeAnime(anime *data.Anime) error {
	mal.store.SetAnime(anime.ID, anime)
	if err := mal.db.InsertAnime(anime); err != nil {
		log.Errorf("Failed to insert anime %s into database: %s", anime.Title, err)
	}
	log.Infof("Successfully saved anime %s to the database", anime.Title)
	return nil
}

// GetAnimeBySearchResult TODO
func (mal *MyAnimeList) GetAnimeBySearchResult(result *data.AnimeSearchResult) (*data.Anime, error) {
	anime, err := fetch.AnimeBySearchResult(result)
	if err != nil {
		log.Error(err)
		return nil, err
	}
	if err := mal.storeAnime(anime); err != nil {
		log.Errorf("Failed to save anime: %s", err)
		return anime, nil
	}
	return anime, nil
}

// func (mal *MyAnimeList) fetchAnimeByID(url string) error {
// 	return nil
// }

// func (mal *MyAnimeList) GetAnimeByID(id int) error {
// 	return nil
// }
