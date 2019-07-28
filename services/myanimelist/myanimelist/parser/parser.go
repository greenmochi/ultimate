package parser

import (
	"encoding/json"

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
