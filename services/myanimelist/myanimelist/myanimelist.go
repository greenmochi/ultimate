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
func (mal *MyAnimeList) fetchAnimeList(user string) (*data.AnimeList, error) {
	url := request.NewAnimeListRequest(user).Build()
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
	//log.WithField("json", string(body)).Infof("Received json data for %s", user)
	animeList := parser.ParseAnimeList(string(body))
	return animeList, nil
}

// StoreAnimeList TODO
func (mal *MyAnimeList) storeAnimeList(user string, animeList *data.AnimeList) error {
	// store the data into the store
	mal.store.SetAnimeList(user, animeList)

	// store the data into the database
	return nil
}

// GetAnimeList TODO
func (mal *MyAnimeList) GetAnimeList(user string) error {
	// Fetch user anime list (and stores it)
	_, err := mal.fetchAnimeList(user)
	if err != nil {
		log.Error(err)
	}
	return nil
}
