package database

import (
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
