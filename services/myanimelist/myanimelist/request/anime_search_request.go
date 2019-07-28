package request

import "net/url"

// AnimeSearchRequest TODO
type AnimeSearchRequest struct {
	Query string
}

// NewAnimeSearchRequest TODO
func NewAnimeSearchRequest(query string) *AnimeSearchRequest {
	return &AnimeSearchRequest{
		Query: query,
	}
}

// Build TODO
func (asr *AnimeSearchRequest) Build() string {
	u := url.URL{}
	u.Scheme = "https"
	u.Host = "myanimelist.net"
	u.Path = "anime.php"
	query := url.Values{}
	query.Set("q", asr.Query)
	u.RawQuery = query.Encode()
	return u.String()
}
