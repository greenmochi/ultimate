package nyaa

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

func TestParseWithNetwork(t *testing.T) {
	url := DefaultURL()
	url.Term = "Boku no Hero Academia"

	client := &Client{
		URL: url,
	}
	body, err := client.Get()
	if err != nil || body == "" {
		t.Error("Expected non-empty body. Actual: empty body")
	}

	if ok := client.Parse(body); !ok {
		t.Error("Expected to parse body. Actual: unable to parse body")
	}

	for _, result := range client.Results {
		// fmt.Printf("%+v\n", result)
		if result == (Result{}) {
			t.Error("Expected each result to be non-nil. Actual: a result was nil")
		}
	}
}
