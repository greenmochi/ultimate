package parser

import (
	"encoding/json"
	"strings"

	"github.com/anaskhan96/soup"

	"github.com/greenmochi/ultimate/services/myanimelist/myanimelist/data"
)

// ParseUserAnimeList parses a json string into a AnimeList structure
func ParseUserAnimeList(jsonBytes []byte) (*data.UserAnimeList, error) {
	userAnimeList := &data.UserAnimeList{}
	if err := json.Unmarshal(jsonBytes, &userAnimeList.Anime); err != nil {
		return nil, err
	}
	return userAnimeList, nil
}

// ParseAnimeSearchResults parses anime results from a search query
func ParseAnimeSearchResults(htmlBytes []byte) ([]*data.AnimeSearchResult, error) {
	var results []*data.AnimeSearchResult
	doc := soup.HTMLParse(string(htmlBytes))
	for _, row := range doc.FindAll("tr") {
		td := row.FindAll("td")
		if len(td) != 5 {
			continue
		}

		img := td[0].Find("img")
		a := td[1].Find("a")
		strong := td[1].Find("strong")
		pt4 := td[1].Find("div", "class", "pt4")
		ok := img.Error == nil && a.Error == nil && strong.Error == nil && pt4.Error == nil && td[2].Error == nil && td[3].Error == nil && td[4].Error == nil
		if !ok {
			continue
		}

		imgSrc := img.Attrs()["data-src"]
		title := strings.TrimSpace(strong.Text())
		link := a.Attrs()["href"]
		synopsis := strings.TrimSpace(pt4.Text())
		media := strings.TrimSpace(td[2].Text())
		numEpisodes := strings.TrimSpace(td[3].Text())
		score := strings.TrimSpace(td[4].Text())
		result := &data.AnimeSearchResult{
			ImgSrc:      imgSrc,
			Title:       title,
			Link:        link,
			Synopsis:    synopsis,
			Type:        media,
			NumEpisodes: numEpisodes,
			Score:       score,
		}
		results = append(results, result)
	}
	return results, nil
}

// ParseAnime TODO
func ParseAnime(htmlBytes []byte) (*data.Anime, error) {
	return nil, nil
}
