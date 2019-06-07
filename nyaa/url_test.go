package nyaa

import (
	"testing"
)

func TestURL(t *testing.T) {
	url := DefaultURL()
	url.Term = "Boku no Hero Academia"
	url.Sort = Comment
	url.Order = Desc
	//fmt.Printf("%+v\n", url)
}

func TestString(t *testing.T) {
	url := DefaultURL()
	url.Term = "Boku no Hero Academia"

	// fmt.Println(url.String())
}

func TestPagination(t *testing.T) {
	url := DefaultURL()
	url.Term = "Boku no Hero Academia"
	url.Page = 5

	// fmt.Println(url.String())
}
