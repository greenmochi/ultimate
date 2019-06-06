package api

import (
	"fmt"
	"testing"
)

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

	results := Parse(body)
	if len(results) <= 0 {
		fmt.Println("results is empty")
	} else {
		fmt.Println("results size=", len(results))
	}
	for _, result := range results {
		fmt.Printf("%+v\n", result)
	}
}
