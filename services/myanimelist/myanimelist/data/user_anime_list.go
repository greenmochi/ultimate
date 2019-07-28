package data

// UserAnimeList represents a user's anime list
// An anime list contains the title, score, type, and progress.
// An anime title must be in one of these categories:
// watching, completed, on hold, dropped, or plan to watch.
type UserAnimeList struct {
	User  string
	Anime []*UserAnime
}

// UserAnime TODO
type UserAnime struct {
	Status             int    `json:"status"`
	Score              int    `json:"score"`
	Tags               string `json:"tags"`
	IsRewatching       int    `json:"is_rewatching"`
	NumWatchedEpisodes int    `json:"num_watched_episodes"`
	AnimeTitle         string `json:"anime_title"`
	AnimeNumEpisodes   int    `json:"anime_num_episodes"`
	AnimeAiringStatus  int    `json:"anime_airing_status"`
	AnimeID            int    `json:"anime_id"`
	AnimeStudios       string `json:"anime_studios"`
	AnimeLicensors     string `json:"anime_licensors"`
	AnimeSeason        struct {
		Year   int
		Season string
	} `json:"anime_season"`
	HasEpisodeVideo       bool   `json:"has_episode_video"`
	HasPromotionVideo     bool   `json:"has_promotion_video"`
	HasVideo              bool   `json:"has_video"`
	VideoURL              string `json:"video_url"`
	AnimeURL              string `json:"anime_url"`
	AnimeImagePath        string `json:"anime_image_path"`
	IsAddedToList         bool   `json:"is_added_to_list"`
	AnimeMediaTypeString  string `json:"anime_media_type_string"`
	AnimeMPAARatingString string `json:"anime_mpaa_rating_string"`
	StartDateString       string `json:"start_date_string"`
	FinishDateString      string `json:"finish_date_string"`
	AnimeStartDateString  string `json:"anime_start_date_string"`
	AnimeEndDateString    string `json:"anime_end_date_string"`
	DaysString            int    `json:"days_string"`
	StorageString         string `json:"storage_string"`
	PriorityString        string `json:"priority_string"`
}
