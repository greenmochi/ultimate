package fetch

import (
	"io/ioutil"
	"net/http"

	log "github.com/sirupsen/logrus"

	"github.com/greenmochi/ultimate/services/myanimelist/myanimelist/data"
	"github.com/greenmochi/ultimate/services/myanimelist/myanimelist/parser"
	"github.com/greenmochi/ultimate/services/myanimelist/myanimelist/request"
)

// UserAnimeList retrieves a user's anime list
func UserAnimeList(user string) (*data.UserAnimeList, error) {
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

// AnimeSearchResults retrieves search results from myanimelist.net
func AnimeSearchResults(query string) ([]*data.AnimeSearchResult, error) {
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

func getImage(url string) ([]byte, error) {
	log.Infof("Sending GET request to %s", url)
	resp, err := http.Get(url)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()
	return ioutil.ReadAll(resp.Body)
}

// AnimeBySearchResult retreives an anime page using an anime search result
func AnimeBySearchResult(result *data.AnimeSearchResult) (*data.Anime, error) {
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
	imgBlob, err := getImage(anime.ImgSrc)
	if err != nil {
		log.Errorf("Failed to retrieve anime blob from %s", anime.ImgSrc)
	}
	anime.ImgBlob = imgBlob
	return anime, nil
}
