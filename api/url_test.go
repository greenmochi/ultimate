package api

import (
	"fmt"
	"testing"
)

func TestURL(t *testing.T) {
	url := URL{
		Term: "Boku no Hero Academia",
		Sort: Comment,
		Asc:  true,
	}
	fmt.Printf("%+v\n", url)
}

func TestString(t *testing.T) {
	url := URL{
		Term: "Boku no Hero Academia",
		Sort: Comment,
		Asc:  true,
	}
	fmt.Println(url.String())
}
