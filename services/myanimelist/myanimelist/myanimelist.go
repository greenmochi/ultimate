package myanimelist

import (
	"fmt"
	"io/ioutil"
	"net/http"

	"github.com/greenmochi/ultimate/services/myanimelist/myanimelist/data"
	"github.com/greenmochi/ultimate/services/myanimelist/myanimelist/parser"
)

// MyAnimeList handles main application logic
type MyAnimeList struct {
}

// FetchUserAnimeList todo
func (mal *MyAnimeList) FetchUserAnimeList(user string) (*data.AnimeList, error) {
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

// StoreUserAnimeList todo
func (mal *MyAnimeList) StoreUserAnimeList(user, animelist string) error {
	// store the data into the store

	// store the data into the database

	return nil
}

// GetUserAnimeList todo
func (mal *MyAnimeList) GetUserAnimeList(user string) error {
	// Fetch user anime list (and stores it)
	return nil
}
