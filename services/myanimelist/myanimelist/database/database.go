package database

import (
	"database/sql"

	s "github.com/mattn/go-sqlite3"
	log "github.com/sirupsen/logrus"
)

// Database holds the connection to a sqlite 3 database
type Database struct {
	db *sql.DB
}

// New creates an empty Database struct
func New() *Database {
	return &Database{
		db: nil,
	}
}

// Open creates or opens the database to given name
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

// Close closes the database connection
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
