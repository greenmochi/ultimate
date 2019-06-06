package api

import (
	"testing"
)

func TestGet(t *testing.T) {
	url := DefaultURL()
	url.Term = "Boku no Hero Academia"

	client := &Client{
		URL: url,
	}
	body, err := client.Get()
	if err != nil || body == "" {
		t.Error("Expected non-empty body. Actual: empty body")
	}
}

func TestGetEmptyURL(t *testing.T) {
	client := &Client{}
	body, err := client.Get()
	if err == nil || body != "" {
		t.Error(err)
		t.Error("Expected an error when c.URL = nil")
	}
}
