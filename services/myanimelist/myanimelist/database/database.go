package database

import (
	"database/sql"

	_ "github.com/mattn/go-sqlite3"
	log "github.com/sirupsen/logrus"
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
		username STRING NOT NULL PRIMARY KEY
	);
	CREATE TABLE IF NOT EXISTS user_anime (
		username STRING NOT NULL,
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

		FOREIGN KEY (username) REFERENCES user_anime_list (username) ON DELETE CASCADE ON UPDATE CASCADE
	);
	`
	_, err := d.db.Exec(stmt)
	if err != nil {
		log.Error(err)
		return
	}
}
