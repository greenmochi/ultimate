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
	doc := soup.HTMLParse(string(htmlBytes))

	anime := &data.Anime{}

	urlTag := doc.Find("meta", "property", "og:url")
	if urlTag.Error == nil {
		url := urlTag.Attrs()["content"]
		id, err := GetIDFromURL(url)
		if err != nil {
			return nil, err
		}
		anime.URL = url
		anime.ID = id
	}

	// Try to fill as much anime information as possible (best effort).
	titleTag := doc.Find("meta", "property", "og:title")
	if titleTag.Error == nil {
		anime.Title = titleTag.Attrs()["content"]
	}
	imgTag := doc.Find("meta", "property", "og:image")
	if imgTag.Error == nil {
		anime.ImgSrc = imgTag.Attrs()["content"]
	}
	descTag := doc.Find("meta", "property", "og:description")
	if descTag.Error == nil {
		anime.Description = descTag.Attrs()["content"]
	}

	for _, divTag := range doc.FindAll("div") {
		if divTag.Error != nil {
			continue
		}
		// We expect the <span class="dark_text"> is the first child
		// of our target div.
		children := divTag.Children()
		if len(children) < 1 {
			continue
		}
		// Scan the div's direct children for the dark text span tag
		darkTextSpanTag := children[0]
		for _, child := range children {
			if child.NodeValue == "span" && child.Attrs()["class"] == "dark_text" {
				darkTextSpanTag = child
			}
		}
		if darkTextSpanTag.Error != nil || darkTextSpanTag.NodeValue != "span" || darkTextSpanTag.Attrs()["class"] != "dark_text" {
			continue
		}

		darkText := darkTextSpanTag.Text()
		// Remove the dark (bold) text
		text := strings.TrimSpace(strings.Replace(divTag.FullText(), darkText, "", 1))

		switch darkText {
		case "Synonyms:":
			anime.AltTitles.Synonyms = text
		case "English:":
			anime.AltTitles.English = text
		case "Japanese:":
			anime.AltTitles.Japanese = text
		case "Type:":
			anime.Info.Type = text
		case "Episodes:":
			anime.Info.Episodes = text
		case "Status:":
			anime.Info.Status = text
		case "Aired:":
			anime.Info.Aired = text
		case "Premiered:":
			anime.Info.Premiered = text
		case "Broadcast:":
			anime.Info.Broadcast = text
		case "Producers:":
			anime.Info.Producers = text
		case "Licensors:":
			anime.Info.Licensors = text
		case "Studios:":
			anime.Info.Studios = text
		case "Source:":
			anime.Info.Source = text
		case "Genres:":
			anime.Info.Genres = text
		case "Duration:":
			anime.Info.Duration = text
		case "Rating:":
			anime.Info.Rating = text
		case "Score:":
			anime.Stats.Score = text
		case "Ranked:":
			anime.Stats.Ranked = text
		case "Popularity:":
			anime.Stats.Popularity = text
		case "Members:":
			anime.Stats.Members = text
		case "Favorites:":
			anime.Stats.Favorites = text
		}
	}

	return anime, nil
}
