package request

import (
	"fmt"
	"net/url"
	"strconv"
)

// AnimeListRequest TODO
type AnimeListRequest struct {
	// User is the username of the anime list
	User string
	// Status is the category the page lists (currently watching,
	// completed, on Hold, dropped, all anime)
	Status int
	// Offset is the number of anime to offset by
	// e.g. A user has 1000 anime in their list. If Offset was 0, then
	// only 0-300 results will be returned. If Offset was 400, then
	// 400-700 results will be returned. This is the only way to retrieve
	// the entire user list if their list too large for a single query.
	Offset int
}

// NewAnimeListRequest TODO
func NewAnimeListRequest(user string) *AnimeListRequest {
	return &AnimeListRequest{
		User:   user,
		Status: 7, // All anime category
		Offset: 0, // 0 to limit (uknown, we cannot predict server response) results
	}
}

// Build TODO
func (alr *AnimeListRequest) Build() string {
	u := url.URL{}
	u.Scheme = "https"
	u.Host = "myanimelist.net"
	u.Path = fmt.Sprintf("animelist/%s/load.json", alr.User)
	query := url.Values{}
	query.Set("status", strconv.Itoa(alr.Status))
	query.Set("offset", strconv.Itoa(alr.Offset))
	u.RawQuery = query.Encode()
	return u.String()
}
