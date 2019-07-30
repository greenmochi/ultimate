package parser

import (
	"fmt"
	"regexp"
	"strconv"
)

var (
	validAnimeURL = regexp.MustCompile(`https:\/\/myanimelist\.net\/anime\/\d+/.+$`)
	validID       = regexp.MustCompile(`\d+`)
)

func GetIDFromURL(url string) (int, error) {
	ok := validAnimeURL.MatchString(url)
	if !ok {
		return -1, fmt.Errorf("Unable to match %s with a valid anime url regexp", url)
	}
	idStr := validID.FindString(url)
	if idStr == "" {
		return -1, fmt.Errorf("Unable to find an id string in %s", url)
	}
	id, err := strconv.Atoi(idStr)
	if err != nil {
		return -1, fmt.Errorf("Unable to convert id string to integer: %s", err)
	}
	return id, nil
}
