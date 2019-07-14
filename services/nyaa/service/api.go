package service

import (
	log "github.com/sirupsen/logrus"

	"github.com/greenmochi/ultimate/services/nyaa/nyaa"
)

// API TODO
type API struct {
	nyaa *nyaa.Client
}

// NewAPI TODO
func NewAPI() *API {
	return &API{
		nyaa: &nyaa.Client{
			URL: nyaa.DefaultURL(),
		},
	}
}

// TearDown TODO
func (api *API) TearDown() {
}

// Search TODO
func (api *API) Search(url *nyaa.URL) bool {
	api.nyaa.URL = url

	body, err := api.nyaa.Get()
	if err != nil {
		log.Errorf("unable to perform GET request for query=%s\n", api.nyaa.URL.Query)
		return false
	}

	if ok := api.nyaa.Parse(body); !ok {
		log.Errorf("unable to parse body for query=%s\n", api.nyaa.URL.Query)
		return false
	}

	return true
}

// GetCurrentResults TODO
func (api *API) GetCurrentResults() []nyaa.Result {
	return api.nyaa.Results
}
