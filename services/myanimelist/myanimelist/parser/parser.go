package parser

import (
	"encoding/json"
	"strings"

	"github.com/anaskhan96/soup"
	log "github.com/sirupsen/logrus"

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

	urlTag := doc.Find("meta", "property", "og:url")
	id, err := GetIDFromURL(urlTag.Attrs()["content"])
	if err != nil {
		return nil, err
	}

	anime := &data.Anime{}
	anime.ID = id

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
		// Alternative titles, information, and statistics each use a
		// span to preface their text. We can ignore divs whose first child isn't
		// <span class="dark_text">.
		darkTextSpanTag := children[0]
		if darkTextSpanTag.Error != nil || darkTextSpanTag.NodeValue != "span" || darkTextSpanTag.Attrs()["class"] != "dark_text" {
			// log.Infof("value=%s attrs=%+v", darkTextSpanTag.NodeValue, darkTextSpanTag.Attrs())
			log.Infof("Pointer.Type=%v Pointer.Data=%s", darkTextSpanTag.Pointer.Type, darkTextSpanTag.Pointer.Data)
			continue
		}
		log.Info(divTag)
		fullText := divTag.FullText()
		switch darkText := darkTextSpanTag.Text(); darkText {
		case "Synonyms:":
			anime.AltTitles.Synonyms = fullText
		case "English:":
			anime.AltTitles.English = fullText
		case "Japanese:":
			anime.AltTitles.Japanese = fullText
		}
		// if strings.Contains(fullText, "Synonyms:") {
		// 	anime.AltTitles.Synonyms = strings.TrimSpace(altTitleTag.Text())
		// }
		// if strings.Contains(fullText, "Japanese:") {
		// 	anime.AltTitles.Japanese = strings.TrimSpace(altTitleTag.Text())
		// }
		// if strings.Contains(fullText, "English:") {
		// 	anime.AltTitles.English = strings.TrimSpace(altTitleTag.Text())
		// }
	}

	return anime, nil
}
