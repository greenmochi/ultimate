package api

// SortOpt the option that the query should sort by
type SortOpt string

const (
	// Comment sort by comment
	Comment SortOpt = "comment"

	// Size sort by torrent size
	Size SortOpt = "size"

	// Date sort by torrent added
	Date SortOpt = "date"

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
	NoFilter FilterOpt = "no filter"

	// NoRemakes no remakes, no idea what this option on nyaa is
	NoRemakes FilterOpt = "no remakes"

	// TrustedOnly show only results from trusted submitters
	TrustedOnly FilterOpt = "trusted only"
)

// CategoryOpt category option
type CategoryOpt string

const (
	// AllCategories all categories
	AllCategories CategoryOpt = "all categories"

	// Anime all anime
	Anime CategoryOpt = "anime"
	// AnimeMusicVideo anime music video
	AnimeMusicVideo CategoryOpt = "anime music video"
	// AnimeEnglishTranslated english translated anime
	AnimeEnglishTranslated CategoryOpt = "anime english translated"
	// AnimeNonEnglishTranslated non-english translated anime
	AnimeNonEnglishTranslated CategoryOpt = "anime non-english translated"
	// AnimeRaw raw anime
	AnimeRaw CategoryOpt = "anime raw"

	// Audio audio
	Audio CategoryOpt = "audio"
	// AudioLossless lossless audio
	AudioLossless CategoryOpt = "audio lossless"
	// AudioLossy lossy audio
	AudioLossy CategoryOpt = "audio lossy"

	// Literature literature
	Literature CategoryOpt = "literature"
	// LiteratureEnglishTranslated english translated literature
	LiteratureEnglishTranslated CategoryOpt = "literature english-translated"
	// LiteratureNonEnglishTranslated non-english translated literature
	LiteratureNonEnglishTranslated CategoryOpt = "literature non-english translated"
	// LiteratureRaw raw literature
	LiteratureRaw CategoryOpt = "literature raw"

	// LiveAction live action
	LiveAction CategoryOpt = "live action"
	// LiveActionEnglishTranslated english-translated live action
	LiveActionEnglishTranslated CategoryOpt = "live action english-translated"
	// LiveActionIdolOrPromotionVideo live action idol or promotional video
	LiveActionIdolOrPromotionVideo CategoryOpt = "live action idol or promotional video"
	// LiveActionNonEnglishTranslated non-english translated live action
	LiveActionNonEnglishTranslated CategoryOpt = "live action non-english-translated"
	// LiveActionRaw raw live action
	LiveActionRaw CategoryOpt = "live action raw"

	// Pictures pictures
	Pictures CategoryOpt = "pictures"
	// PicturesGraphics picture graphics
	PicturesGraphics CategoryOpt = "pictures graphics"
	// PicturesPhotos picture photos
	PicturesPhotos CategoryOpt = "pictures photos"

	// Software software
	Software CategoryOpt = "software"
	// SoftwareApplications software applications
	SoftwareApplications CategoryOpt = "software applications"
	// SoftwareGames software games
	SoftwareGames CategoryOpt = "software games"
)

// URL is used by mainly calling Url.String() to construct
// the correct url query to nyaa.si.
type URL struct {
	// Term the current search term
	Term string

	// Sort the current sort method
	Sort SortOpt

	// Asc if the query should sort by ascending or descending
	Asc bool

	// Filter filter results option
	Filter FilterOpt

	// Category filter results by category
	Category CategoryOpt

	// Page current page for pagination
	Page int
}

// String constructs a url string
func (u *URL) String() string {
	return "url"
}
