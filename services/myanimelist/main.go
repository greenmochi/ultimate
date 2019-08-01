package main

import (
	"os"

	log "github.com/sirupsen/logrus"

	"github.com/greenmochi/ultimate/services/myanimelist/myanimelist"
)

func main() {
	// Setup logrus
	file, err := os.OpenFile("myanimelist.log", os.O_CREATE|os.O_WRONLY|os.O_TRUNC, 0666)
	if err != nil {
		log.Info("Failed to open log to myanimelist.log file, defaulting to using stderr")
		log.SetOutput(os.Stderr)
	} else {
		log.SetOutput(file)
	}
	defer file.Close()
	log.SetFormatter(&log.JSONFormatter{})

	mal := myanimelist.New()
	mal.InitDB()
	defer mal.CloseDB()
	mal.GetUserAnimeList("choco1drop")
	mal.GetUserAnimeList("censky")

	results, err := mal.SearchAnime("boku no hero academia")
	if err == nil {
		mal.GetAnimeBySearchResult(results[0])
	}
}
