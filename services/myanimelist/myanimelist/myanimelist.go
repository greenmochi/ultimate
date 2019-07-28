package myanimelist

import (
	"io/ioutil"
	"net/http"

	log "github.com/sirupsen/logrus"

	"github.com/greenmochi/ultimate/services/myanimelist/myanimelist/data"
	"github.com/greenmochi/ultimate/services/myanimelist/myanimelist/database"
	"github.com/greenmochi/ultimate/services/myanimelist/myanimelist/parser"
	"github.com/greenmochi/ultimate/services/myanimelist/myanimelist/request"
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
func (mal *MyAnimeList) InitDB() {
	database := "myanimelist.db"
	if err := mal.db.Open(database); err != nil {
		log.Error(err)
	}
	log.Infof("Successfully initialized database: %s", database)
}

// CloseDB TODO
func (mal *MyAnimeList) CloseDB() {
	mal.db.Close()
}

// FetchAnimeList TODO
func (mal *MyAnimeList) fetchUserAnimeList(user string) (*data.UserAnimeList, error) {
	url := request.NewUserAnimeListRequest(user).Build()
	log.Infof("Sending GET request to %s", url)
	resp, err := http.Get(url)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}
	animeList, err := parser.ParseAnimeList(body)
	if err != nil {
		log.Errorf("Failed to parse %s anime list. %s", user, err)
		return nil, err
	}
	return animeList, nil
}

// StoreAnimeList TODO
func (mal *MyAnimeList) storeUserAnimeList(user string, animeList *data.UserAnimeList) error {
	// store the data into the store
	mal.store.SetUserAnimeList(user, animeList)

	// store the data into the database
	return nil
}

// GetUserAnimeList TODO
func (mal *MyAnimeList) GetUserAnimeList(user string) error {
	// Fetch user anime list (and stores it)
	_, err := mal.fetchUserAnimeList(user)
	if err != nil {
		log.Error(err)
	}
	return nil
}
