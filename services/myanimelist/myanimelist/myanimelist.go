package myanimelist

import (
	"fmt"
	"io/ioutil"
	"net/http"

	"github.com/greenmochi/ultimate/services/myanimelist/myanimelist/data"
	"github.com/greenmochi/ultimate/services/myanimelist/myanimelist/database"
	"github.com/greenmochi/ultimate/services/myanimelist/myanimelist/parser"
	"github.com/greenmochi/ultimate/services/myanimelist/myanimelist/store"
)

// MyAnimeList handles main application logic
type MyAnimeList struct {
	store *store.Store
	db    *database.Database
}

func New() *MyAnimeList {
	return &MyAnimeList{
		store: store.New(),
		db:    database.New(),
	}
}

// FetchAnimeList TODO
func (mal *MyAnimeList) fetchAnimeList(user string) (*data.AnimeList, error) {
	url := fmt.Sprintf("https://myanimelist.net/animelist/%s", user)
	resp, err := http.Get(url)
	if err != nil {
		return nil, err
	}
	resp.Body.Close()
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}
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
	return nil
}
