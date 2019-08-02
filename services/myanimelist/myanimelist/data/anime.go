package data

type Anime struct {
	ID          int
	Title       string
	ImgSrc      string
	ImgBlob     []byte
	Description string
	AltTitles   AlternativeTitles
	Info        AnimeInformation
	Stats       AnimeStatistics
}

type AlternativeTitles struct {
	Synonyms string
	English  string
	Japanese string
}

type AnimeInformation struct {
	Type      string
	Episodes  string
	Status    string
	Aired     string
	Premiered string
	Broadcast string
	Producers string
	Licensors string
	Studios   string
	Source    string
	Genres    string
	Duration  string
	Rating    string
}

type AnimeStatistics struct {
	Score      string
	Ranked     string
	Popularity string
	Members    string
	Favorites  string
}
