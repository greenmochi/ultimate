package api

import (
	"fmt"
	"io/ioutil"
	"net/http"
)

// Client wraps URL
type Client struct {
	URL *URL
}

// Get sends a get request using the current URL
func (c *Client) Get() (string, error) {
	if c.URL == nil {
		return "", fmt.Errorf("c.URL is nil")
	}

	url := c.URL.String()
	res, err := http.Get(url)
	if err != nil {
		return "", fmt.Errorf("unable to GET request for %s", url)
	}
	body, err := ioutil.ReadAll(res.Body)
	defer res.Body.Close()
	if err != nil {
		return "", fmt.Errorf("unable to parse body for %s", url)
	}
	return string(body), nil
}
