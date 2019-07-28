package data

// AnimeList represents a user's anime list
// An anime list contains the title, score, type, and progress.
// An anime title must be in one of these categories:
// watching, completed, on hold, dropped, or plan to watch.
type AnimeList struct {
	user string
}
