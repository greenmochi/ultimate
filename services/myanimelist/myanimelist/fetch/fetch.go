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
	log.Infof("Fetching user anime list from %s", url)
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
		log.Errorf("Failed to parse %s user anime list. %s", user, err)
		return nil, err
	}
	userAnimeList.User = user
	return userAnimeList, nil
}

// AnimeSearchResults retrieves search results from myanimelist.net
func AnimeSearchResults(query string) ([]*data.AnimeSearchResult, error) {
	url := request.NewAnimeSearchRequest(query).Build()
	log.Infof("Fetching anime search results from %s", url)
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
		log.Errorf("Failed to parse search results for %s. %s", query, err)
		return nil, err
	}
	return results, nil
}

func getAnime(req *request.AnimeRequest) (*data.Anime, error) {
	url := req.Build()
	log.Infof("Fetching anime from %s", url)
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
		log.WithFields(log.Fields{
			"request": req,
		}).Errorf("Failed to parse anime from %s. %s", url, err)
		return nil, err
	}
	imgBlob, err := getImage(anime.ImgSrc)
	if err != nil {
		log.Errorf("Failed to retrieve anime blob from %s", anime.ImgSrc)
	}
	anime.ImgBlob = imgBlob
	return anime, nil
}

// getImage retrives the anime image at a url
func getImage(url string) ([]byte, error) {
	log.Infof("Fetching image blob from %s", url)
	resp, err := http.Get(url)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()
	return ioutil.ReadAll(resp.Body)
}

// AnimeBySearchResult retrieves an anime page using an anime search result
func AnimeBySearchResult(result *data.AnimeSearchResult) (*data.Anime, error) {
	req := request.NewAnimeRequest().FullURL(result.Link)
	return getAnime(req)
}

// AnimeByID retrieves an anime page using the anime's id
func AnimeByID(id int) (*data.Anime, error) {
	req := request.NewAnimeRequest().ID(id)
	return getAnime(req)
}
