package client

import (
	"net/http"
)

// HTTPClient sends requests to MyAnimeList.net
type HTTPClient struct {
}

// Get sends a get request to the url
func (h *HTTPClient) Get(url string) (*http.Response, error) {
	resp, err := http.Get(url)
	return resp, err
}
