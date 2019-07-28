package database

import (
	"database/sql"

	_ "github.com/mattn/go-sqlite3"
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
	return nil
}

func (d *Database) Close() {
	d.db.Close()
}
