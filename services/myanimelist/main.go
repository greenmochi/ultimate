package main

import (
	"os"
	"path/filepath"

	log "github.com/sirupsen/logrus"

	"github.com/greenmochi/ultimate/services/myanimelist/myanimelist"
	"github.com/greenmochi/ultimate/services/myanimelist/myanimelist/config"
)

func main() {
	// Create application data directory to store logs, configuration.
	appDataDir, err := config.UserAppData()
	if err != nil {
		log.Fatalf("Failed find user application data directory path")
		os.Exit(1)
	}
	if err := config.CreateAppDir(appDataDir); err != nil {
		log.Fatalf("Failed to create user application data directory")
		os.Exit(1)
	}

	// Setup logrus
	file, err := os.OpenFile(filepath.Join(appDataDir, "myanimelist.log"), os.O_CREATE|os.O_WRONLY|os.O_TRUNC, 0666)
	if err != nil {
		log.Info("Failed to open log to myanimelist.log file, defaulting to using stderr")
		log.SetOutput(os.Stderr)
	} else {
		log.SetOutput(file)
	}
	defer file.Close()
	log.SetFormatter(&log.JSONFormatter{})

	mal := myanimelist.New()
	mal.InitDB(filepath.Join(appDataDir, "myanimelist.db"))
	defer mal.CloseDB()
	mal.GetUserAnimeList("choco1drop")
	mal.GetUserAnimeList("choco1drop")
	mal.GetUserAnimeList("censky")
	mal.GetUserAnimeList("censky")

	results, err := mal.SearchAnime("boku no hero academia")
	if err == nil {
		mal.GetAnimeBySearchResult(results[0])
	}
}
