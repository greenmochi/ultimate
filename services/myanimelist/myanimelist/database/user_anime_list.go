package database

import (
	"fmt"

	log "github.com/sirupsen/logrus"

	"github.com/greenmochi/ultimate/services/myanimelist/myanimelist/data"
)

// InsertUserAnimeList saves the user's anime list
func (d *Database) InsertUserAnimeList(userAnimeList *data.UserAnimeList) error {
	tx, err := d.db.Begin()
	if err != nil {
		return err
	}

	userStmt, err := tx.Prepare(`
	INSERT INTO user_anime_list (username) VALUES (?) ON CONFLICT DO NOTHING;
	`)
	if err != nil {
		return err
	}
	defer userStmt.Close()
	_, err = userStmt.Exec(userAnimeList.User)
	if err != nil {
		return err
	}

	animeStmt, err := tx.Prepare(`
	INSERT INTO user_anime (
		username, status, score, tags, is_rewatching, num_watched_episodes, anime_title,
		anime_num_episodes, anime_airing_status, anime_id, anime_studios, anime_licensors,
		anime_season_year, anime_season_season, 
		has_episode_video, has_promotion_video, has_video, anime_url, anime_image_path,
		is_added_to_list, anime_media_type_string, anime_mpaa_rating_string, start_date_string, finish_date_string, 
		anime_start_date_string, anime_end_date_string, days_string, storage_string, priority_string
	)
	VALUES (
		?, ?, ?, ?, ?, ?, ?,
		?, ?, ?, ?, ?,
		?, ?,
		?, ?, ?, ?, ?,
		?, ?, ?, ?, ?,
		?, ?, ?, ?, ?
	)
	ON CONFLICT DO NOTHING;
	`)
	if err != nil {
		return err
	}
	defer animeStmt.Close()
	for _, a := range userAnimeList.Anime {
		_, err = animeStmt.Exec(
			userAnimeList.User, a.Status, a.Score, a.Tags, a.IsRewatching, a.NumWatchedEpisodes, a.AnimeTitle,
			a.AnimeNumEpisodes, a.AnimeAiringStatus, a.AnimeID, a.AnimeStudios, a.AnimeLicensors,
			a.AnimeSeason.Year, a.AnimeSeason.Season,
			a.HasEpisodeVideo, a.HasPromotionVideo, a.HasVideo, a.AnimeURL, a.AnimeImagePath,
			a.IsAddedToList, a.AnimeMediaTypeString, a.AnimeMPAARatingString, a.StartDateString, a.FinishDateString,
			a.AnimeStartDateString, a.AnimeEndDateString, a.DaysString, a.StorageString, a.PriorityString,
		)
		if err != nil {
			return err
		}
	}
	tx.Commit()
	return nil
}

// RetrieveUserAnimeList retrieves a user's anime list
func (d *Database) RetrieveUserAnimeList(username string) (*data.UserAnimeList, error) {
	rows, err := d.db.Query(fmt.Sprintf(`
	SELECT 
		username, status, score, tags, is_rewatching, num_watched_episodes, anime_title,
		anime_num_episodes, anime_airing_status, anime_id, anime_studios, anime_licensors,
		anime_season_year, anime_season_season, 
		has_episode_video, has_promotion_video, has_video, anime_url, anime_image_path,
		is_added_to_list, anime_media_type_string, anime_mpaa_rating_string, start_date_string, finish_date_string, 
		anime_start_date_string, anime_end_date_string, days_string, storage_string, priority_string
	FROM
		user_anime
	WHERE 
		username = '%s';
	`, username))
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	userAnimeList := &data.UserAnimeList{
		Anime: make([]*data.UserAnime, 0),
	}
	for rows.Next() {
		userAnime := &data.UserAnime{}
		err := rows.Scan(
			&userAnimeList.User, &userAnime.Status, &userAnime.Score, &userAnime.Tags, &userAnime.IsRewatching, &userAnime.NumWatchedEpisodes, &userAnime.AnimeTitle,
			&userAnime.AnimeNumEpisodes, &userAnime.AnimeAiringStatus, &userAnime.AnimeID, &userAnime.AnimeStudios, &userAnime.AnimeLicensors,
			&userAnime.AnimeSeason.Year, &userAnime.AnimeSeason.Season,
			&userAnime.HasEpisodeVideo, &userAnime.HasPromotionVideo, &userAnime.HasVideo, &userAnime.AnimeURL, &userAnime.AnimeImagePath,
			&userAnime.IsAddedToList, &userAnime.AnimeMediaTypeString, &userAnime.AnimeMPAARatingString, &userAnime.StartDateString, &userAnime.FinishDateString,
			&userAnime.AnimeStartDateString, &userAnime.AnimeEndDateString, &userAnime.DaysString, &userAnime.StorageString, &userAnime.PriorityString,
		)
		if err != nil {
			log.Warn(err)
		}
	}
	if err := rows.Err(); err != nil {
		log.Error(err)
	}
	return userAnimeList, nil
}

// UserAnimeListExists checks if the username is in the user_anime_list and user_anime table
func (d *Database) UserAnimeListExists(username string) bool {
	rows, err := d.db.Query(`
	SELECT
		EXISTS(SELECT 1 FROM user_anime_list WHERE username = ?)
	AND
		EXISTS(SELECT 1 FROM user_anime WHERE username = ?);
	`, username, username)
	if err != nil {
		log.Errorf("Failed to query for %s user anime list: %s", username, err)
		return false
	}
	defer rows.Close()
	if ok := rows.Next(); !ok {
		log.Warnf("Couldn't find a row for %s user anime list even through the query succeeded", username)
		return false
	}

	var ok bool
	if err := rows.Scan(&ok); err != nil {
		log.Warnf("Scanning went wrong when searching for %s in the user_anime_list and user_anime table. %s", username, err)
	}
	if err := rows.Err(); err != nil {
		log.Errorf("Error when checking if %s anime list exists in the user_anime_list and User_anime table. %s", username, err)
	}
	return ok
}
