package api

import (
	"fmt"
	"testing"
)

func TestURL(t *testing.T) {
	url := DefaultURL()
	url.Term = "Boku no Hero Academia"
	url.Sort = Comment
	url.Order = Desc
	fmt.Printf("%+v\n", url)
}

func TestString(t *testing.T) {
	url := DefaultURL()
	url.Term = "Boku no Hero Academia"

	fmt.Println(url.String())
}
