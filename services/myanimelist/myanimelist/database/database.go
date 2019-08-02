package database

import (
	"database/sql"
	"fmt"

	s "github.com/mattn/go-sqlite3"
	log "github.com/sirupsen/logrus"

	"github.com/greenmochi/ultimate/services/myanimelist/myanimelist/data"
)

type Database struct {
	db *sql.DB
}

func New() *Database {
	return &Database{
		db: nil,
	}
}

func (d *Database) Open(name string) error {
	libVersion, libVersionNumber, sourceID := s.Version()
	log.WithFields(log.Fields{
		"libVersion":       libVersion,
		"libVersionNumber": libVersionNumber,
		"sourceID":         sourceID,
	}).Info("go-sqlite3 version")
	db, err := sql.Open("sqlite3", name)
	if err != nil {
		return err
	}
	d.db = db
	d.createTables()
	return nil
}

func (d *Database) Close() {
	d.db.Close()
}

func (d *Database) createTables() {
	stmt := `
	CREATE TABLE IF NOT EXISTS user_anime_list (
		username TEXT NOT NULL PRIMARY KEY CHECK(username <> '')
	);
	CREATE TABLE IF NOT EXISTS user_anime (
		username TEXT NOT NULL CHECK(username <> ''),
		status INTEGER,
		score INTEGER,
		tags TEXT,
		is_rewatching INTEGER,
		num_watched_episodes INTEGER,
		anime_title TEXT,
		anime_num_episodes INTEGER,
		anime_airing_status INTEGER,
		anime_id INTEGER,
		anime_studios TEXT,
		anime_licensors TEXT,

		anime_season_year INTEGER,
		anime_season_season TEXT,

		has_episode_video INTEGER,
		has_promotion_video INTEGER,
		has_video INTEGER,
		video_url TEXT,
		anime_url TEXT,
		anime_image_path TEXT,
		is_added_to_list INTEGER,
		anime_media_type_string TEXT,
		anime_mpaa_rating_string TEXT,
		start_date_string TEXT,
		finish_date_string TEXT,
		anime_start_date_string TEXT,
		anime_end_date_string TEXT,
		days_string INTEGER,
		storage_string TEXT,
		priority_string TEXT,

		PRIMARY KEY (username, anime_id),
		FOREIGN KEY (username) REFERENCES user_anime_list (username) ON DELETE CASCADE ON UPDATE CASCADE
	);
	CREATE TABLE IF NOT EXISTS anime (
		id 			INTEGER PRIMARY KEY,
		title 		TEXT,
		img_src 	TEXT,
		img_blob	BLOB,
		description TEXT,

		synonyms 	TEXT,
		english 	TEXT,
		japanese 	TEXT,

		type 		TEXT,
		episodes  	TEXT,
		status    	TEXT,
		aired     	TEXT,
		premiered 	TEXT,
		broadcast 	TEXT,
		producers 	TEXT,
		licensors 	TEXT,
		studios   	TEXT,
		source    	TEXT,
		genres    	TEXT,
		duration  	TEXT,
		rating    	TEXT,

		score      	TEXT,
		ranked     	TEXT,
		popularity 	TEXT,
		members    	TEXT,
		favorites  	TEXT
	);
	`
	_, err := d.db.Exec(stmt)
	if err != nil {
		log.Error(err)
		return
	}
}

// InsertUserAnimeList TODO
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
		?, ?, 
		?, ?, ?,
		?, ?, ?, ?, ?, ?, ?,
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
		if err := rows.Scan(
			&userAnimeList.User, &userAnime.Status, &userAnime.Score, &userAnime.Tags, &userAnime.IsRewatching, &userAnime.NumWatchedEpisodes, &userAnime.AnimeTitle,
			&userAnime.AnimeNumEpisodes, &userAnime.AnimeAiringStatus, &userAnime.AnimeID, &userAnime.AnimeStudios, &userAnime.AnimeLicensors,
			&userAnime.AnimeSeason.Year, &userAnime.AnimeSeason.Season,
			&userAnime.HasEpisodeVideo, &userAnime.HasPromotionVideo, &userAnime.HasVideo, &userAnime.AnimeURL, &userAnime.AnimeImagePath,
			&userAnime.IsAddedToList, &userAnime.AnimeMediaTypeString, &userAnime.AnimeMPAARatingString, &userAnime.StartDateString, &userAnime.FinishDateString,
			&userAnime.AnimeStartDateString, &userAnime.AnimeEndDateString, &userAnime.DaysString, &userAnime.StorageString, &userAnime.PriorityString,
		); err != nil {
			log.Warn(err)
		}
	}
	if err := rows.Err(); err != nil {
		log.Error(err)
	}
	return userAnimeList, nil
}

func (d *Database) UserAnimeList(username string) bool {
	rows, err := d.db.Query(fmt.Sprintf(`
	SELECT
		EXISTS(SELECT 1 FROM user_anime_list WHERE username = '%s')
	AND
		EXISTS(SELECT 1 FROM user_anime WHERE username = '%s');
	`, username, username))
	if err != nil {
		log.Errorf("Failed to query for %s user anime list: %s", username, err)
		return false
	}
	rows.Next()

	var ok bool
	if err := rows.Scan(&ok); err != nil {
		log.Warnf("Scanning went wrong for %s anime list: %s", username, err)
	}
	if err := rows.Err(); err != nil {
		log.Errorf("Error when checking if %s anime list exists in the database: %s", username, err)
	}
	return ok
}

func (d *Database) InsertAnime(anime *data.Anime) error {
	tx, err := d.db.Begin()
	if err != nil {
		return err
	}

	stmt, err := tx.Prepare(`
	INSERT INTO anime (
		id, title, img_src, img_blob, description,
		synonyms, english, japanese,
		type, episodes, status, aired, premiered, broadcast, producers, licensors, studios, source, genres, duration, rating,
		score, ranked, popularity, members, favorites
	) 
	VALUES (
		?, ?, ?, ?, ?,
		?, ?, ?,
		?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,
		?, ?, ?, ?, ?
	) 
	ON CONFLICT DO NOTHING;
	`)
	if err != nil {
		return err
	}
	defer stmt.Close()
	_, err = stmt.Exec(
		anime.ID, anime.Title, anime.ImgSrc, anime.ImgBlob, anime.Description,
		anime.AltTitles.Synonyms, anime.AltTitles.English, anime.AltTitles.Japanese,
		anime.Info.Type, anime.Info.Episodes, anime.Info.Status, anime.Info.Aired, anime.Info.Premiered, anime.Info.Broadcast, anime.Info.Producers, anime.Info.Licensors, anime.Info.Studios, anime.Info.Source, anime.Info.Genres, anime.Info.Duration, anime.Info.Rating,
		anime.Stats.Score, anime.Stats.Ranked, anime.Stats.Popularity, anime.Stats.Members, anime.Stats.Favorites,
	)
	if err != nil {
		return err
	}
	tx.Commit()
	return nil
}
