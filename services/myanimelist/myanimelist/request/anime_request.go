package request

import (
	"fmt"
	"net/url"
)

// AnimeRequest TODO
type AnimeRequest struct {
	// FullURL will prioritize returning this when Build() is called
	fullURL string
	id      int
}

// NewAnimeRequest TODO
func NewAnimeRequest() *AnimeRequest {
	return &AnimeRequest{}
}

// ID TODO
func (ar *AnimeRequest) ID(id int) *AnimeRequest {
	ar.id = id
	return ar
}

// FullURL TODO
func (ar *AnimeRequest) FullURL(url string) *AnimeRequest {
	ar.fullURL = url
	return ar
}

// Build TODO
func (ar *AnimeRequest) Build() string {
	if ar.fullURL != "" {
		return ar.fullURL
	}
	u := url.URL{}
	u.Scheme = "https"
	u.Host = "myanimelist.net"
	u.Path = fmt.Sprintf("anime/%d", ar.id)
	return u.String()
}
