package database

import (
	"fmt"

	log "github.com/sirupsen/logrus"

	"github.com/greenmochi/ultimate/services/myanimelist/myanimelist/data"
)

// InsertAnime inserts an Anime struct into the anime table
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

func (d *Database) retrieveAnime(query string, args ...interface{}) (*data.Anime, error) {
	rows, err := d.db.Query(query, args...)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	if ok := rows.Next(); !ok {
		return nil, fmt.Errorf("No rows in anime table found for this query")
	}

	anime := &data.Anime{
		ImgBlob: make([]byte, 0),
	}
	err = rows.Scan(
		&anime.ID, &anime.Title, &anime.ImgSrc, &anime.ImgBlob, &anime.Description,
		&anime.AltTitles.Synonyms, &anime.AltTitles.English, &anime.AltTitles.Japanese,
		&anime.Info.Type, &anime.Info.Episodes, &anime.Info.Status, &anime.Info.Aired, &anime.Info.Premiered, &anime.Info.Broadcast, &anime.Info.Producers, &anime.Info.Licensors, &anime.Info.Studios, &anime.Info.Source, &anime.Info.Genres, &anime.Info.Duration, &anime.Info.Rating,
		&anime.Stats.Score, &anime.Stats.Ranked, &anime.Stats.Popularity, &anime.Stats.Members, &anime.Stats.Favorites,
	)
	if err != nil {
		return nil, err
	}
	return anime, nil
}

// RetrieveAnimeByID retreives a row by an anime id from the anime table
func (d *Database) RetrieveAnimeByID(id int) (*data.Anime, error) {
	query := `
	SELECT
		id, title, img_src, img_blob, description,
		synonyms, english, japanese,
		type, episodes, status, aired, premiered, broadcast, producers, licensors, studios, source, genres, duration, rating,
		score, ranked, popularity, members, favorites
	FROM
		anime
	WHERE
		id = ?;
	`
	anime, err := d.retrieveAnime(query, id)
	if err != nil {
		log.Errorf("Failed to retrieve anime for %d", id)
		return nil, err
	}
	return anime, nil
}

// RetrieveAnimeByTitle retreives a row by an anime id from the anime table
func (d *Database) RetrieveAnimeByTitle(title string) (*data.Anime, error) {
	query := `
	SELECT
		id, title, img_src, img_blob, description,
		synonyms, english, japanese,
		type, episodes, status, aired, premiered, broadcast, producers, licensors, studios, source, genres, duration, rating,
		score, ranked, popularity, members, favorites
	FROM
		anime
	WHERE
		title = ?;
	`
	anime, err := d.retrieveAnime(query, title)
	if err != nil {
		log.Errorf("Failed to retrieve anime for %s", title)
		return nil, err
	}
	return anime, nil
}

func (d *Database) animeExists(query string, args ...interface{}) (bool, error) {
	rows, err := d.db.Query(query, args...)
	if err != nil {
		return false, fmt.Errorf("Failed to query when checking if an anime exists")
	}
	defer rows.Close()
	if ok := rows.Next(); !ok {
		return false, fmt.Errorf("Failed to find a row when checking if an anime exists")
	}
	var exists bool
	if err := rows.Scan(&exists); err != nil {
		return false, fmt.Errorf("Scanning went wrong when checking if an anime exists in the anime table. %s", err)
	}
	if err := rows.Err(); err != nil {
		return false, fmt.Errorf("Error when checking if an anime exists in the anime table. %s", err)
	}
	return exists, nil
}

// AnimeByIDExists checks if an anime by id is in the anime table
func (d *Database) AnimeByIDExists(id int) bool {
	query := `
	SELECT 
		EXISTS(SELECT 1 FROM anime WHERE id = ?);
	`
	exists, err := d.animeExists(query, id)
	if err != nil {
		log.Errorf("Trying to check if an anime (id=%d) exists failed. %s", id, err)
		return false
	}
	return exists
}

// AnimeByTitleExists checks if an anime by id is in the anime table
func (d *Database) AnimeByTitleExists(title string) bool {
	query := `
	SELECT 
		EXISTS(SELECT 1 FROM anime WHERE title = ?);
	`
	exists, err := d.animeExists(query, title)
	if err != nil {
		log.Errorf("Trying to check if an anime (title=%s) exists failed. %s", title, err)
		return false
	}
	return exists
}
