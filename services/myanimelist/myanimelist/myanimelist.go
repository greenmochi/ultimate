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
	userAnimeList, err := parser.ParseUserAnimeList(body)
	if err != nil {
		log.Errorf("Failed to parse %s anime list. %s", user, err)
		return nil, err
	}
	userAnimeList.User = user
	return userAnimeList, nil
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
	userAnimeList, err := mal.fetchUserAnimeList(user)
	if err != nil {
		log.Error(err)
	}
	if err := mal.storeUserAnimeList(user, userAnimeList); err != nil {
		return err
	}
	return nil
}

func (mal *MyAnimeList) fetchAnimeSearchResults(query string) ([]*data.AnimeSearchResult, error) {
	url := request.NewAnimeSearchRequest(query).Build()
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
	results, err := parser.ParseAnimeSearchResults(body)
	if err != nil {
		log.Errorf("Failed to parse %s search results. %s", query, err)
		return nil, err
	}
	return results, nil
}

func (mal *MyAnimeList) storeAnimeSearchResults(results []*data.AnimeSearchResult) {
	mal.store.SetAnimeSearchResults(results)
	log.Infof("Stored %d anime search results", len(results))
}

// SearchAnime TODO
func (mal *MyAnimeList) SearchAnime(query string) ([]*data.AnimeSearchResult, error) {
	results, err := mal.fetchAnimeSearchResults(query)
	if err != nil {
		log.Error(err)
		return nil, err
	}
	mal.storeAnimeSearchResults(results)
	return results, nil
}

func (mal *MyAnimeList) fetchAnimeBySearchResult(result *data.AnimeSearchResult) (*data.Anime, error) {
	url := request.NewAnimeRequest().FullURL(result.Link).Build()
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
	anime, err := parser.ParseAnime(body)
	if err != nil {
		log.Errorf("Failed to parse %s anime. %s", result.Title, err)
		return nil, err
	}
	return anime, nil
}

func (mal *MyAnimeList) storeAnime() error {
	return nil
}

// GetAnimeBySearchResult TODO
func (mal *MyAnimeList) GetAnimeBySearchResult(result *data.AnimeSearchResult) (*data.Anime, error) {
	anime, err := mal.fetchAnimeBySearchResult(result)
	if err != nil {
		log.Error(err)
		return nil, err
	}
	log.Infof("%+v", anime)
	return anime, nil
}

// func (mal *MyAnimeList) fetchAnimeByID(url string) error {
// 	return nil
// }

// func (mal *MyAnimeList) GetAnimeByID(id int) error {
// 	return nil
// }
