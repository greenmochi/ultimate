package api

import (
	"net/url"
	"strconv"
)

// SortOpt the option that the query should sort by
type SortOpt string

const (
	// Comment sort by comment
	Comment SortOpt = "comments"

	// Size sort by torrent size
	Size SortOpt = "size"

	// Date sort by torrent added
	Date SortOpt = "id"

	// Seeders sort by number of seeders
	Seeders SortOpt = "seeders"

	// Leechers sort by number of leechers
	Leechers SortOpt = "leechers"

	// Downloads sort by completed downloads
	Downloads SortOpt = "downloads"
)

// FilterOpt filter option
type FilterOpt string

const (
	// NoFilter don't filter results
	NoFilter FilterOpt = "0"

	// NoRemakes no remakes, no idea what this option on nyaa is
	NoRemakes FilterOpt = "1"

	// TrustedOnly show only results from trusted submitters
	TrustedOnly FilterOpt = "2"
)

// CategoryOpt category option
type CategoryOpt string

const (
	// AllCategories all categories
	AllCategories CategoryOpt = "0_0"

	// Anime all anime
	Anime CategoryOpt = "1_0"
	// AnimeMusicVideo anime music video
	AnimeMusicVideo CategoryOpt = "1_1"
	// AnimeEnglishTranslated english translated anime
	AnimeEnglishTranslated CategoryOpt = "1_2"
	// AnimeNonEnglishTranslated non-english translated anime
	AnimeNonEnglishTranslated CategoryOpt = "1_3"
	// AnimeRaw raw anime
	AnimeRaw CategoryOpt = "1_4"

	// Audio audio
	Audio CategoryOpt = "2_0"
	// AudioLossless lossless audio
	AudioLossless CategoryOpt = "2_1"
	// AudioLossy lossy audio
	AudioLossy CategoryOpt = "2_2"

	// Literature literature
	Literature CategoryOpt = "3_0"
	// LiteratureEnglishTranslated english translated literature
	LiteratureEnglishTranslated CategoryOpt = "3_1"
	// LiteratureNonEnglishTranslated non-english translated literature
	LiteratureNonEnglishTranslated CategoryOpt = "3_2"
	// LiteratureRaw raw literature
	LiteratureRaw CategoryOpt = "3_3"

	// LiveAction live action
	LiveAction CategoryOpt = "4_0"
	// LiveActionEnglishTranslated english-translated live action
	LiveActionEnglishTranslated CategoryOpt = "4_1"
	// LiveActionIdolOrPromotionVideo live action idol or promotional video
	LiveActionIdolOrPromotionVideo CategoryOpt = "4_2"
	// LiveActionNonEnglishTranslated non-english translated live action
	LiveActionNonEnglishTranslated CategoryOpt = "4_3"
	// LiveActionRaw raw live action
	LiveActionRaw CategoryOpt = "4_4"

	// Pictures pictures
	Pictures CategoryOpt = "5_0"
	// PicturesGraphics picture graphics
	PicturesGraphics CategoryOpt = "5_1"
	// PicturesPhotos picture photos
	PicturesPhotos CategoryOpt = "5_2"

	// Software software
	Software CategoryOpt = "6_0"
	// SoftwareApplications software applications
	SoftwareApplications CategoryOpt = "6_1"
	// SoftwareGames software games
	SoftwareGames CategoryOpt = "6_2"
)

// OrderOpt ascending or descending order
type OrderOpt string

const (
	// Asc ascending order
	Asc OrderOpt = "asc"
	// Desc descending order
	Desc OrderOpt = "desc"
)

// URL is used by mainly calling Url.String() to construct
// the correct url query to nyaa.si.
type URL struct {
	// Term the current search term
	Term string

	// Sort the current sort method
	Sort SortOpt

	// Asc if the query should sort by ascending or descending
	Order OrderOpt

	// Filter filter results option
	Filter FilterOpt

	// Category filter results by category
	Category CategoryOpt

	// Page current page for pagination
	Page int
}

// DefaultURL make new URL with some options the same nyaa.si
func DefaultURL() *URL {
	return &URL{
		Term:     "",
		Sort:     Date,
		Order:    Desc,
		Filter:   NoFilter,
		Category: AllCategories,
		Page:     1,
	}
}

// String constructs a url string
func (u *URL) String() string {
	queryParams := url.Values{}
	queryParams.Set("f", string(u.Filter))
	queryParams.Set("c", string(u.Category))
	queryParams.Set("q", u.Term)
	queryParams.Set("s", string(u.Sort))
	queryParams.Set("o", string(u.Order))
	queryParams.Set("p", strconv.Itoa(u.Page))

	url := url.URL{}
	url.Scheme = "https"
	url.Host = "nyaa.si"
	url.RawQuery = queryParams.Encode()
	return url.String()
}
