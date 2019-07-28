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
		log.Info("Failed to log to myanimelist.log file, defaulting to using stderr")
	} else {
		log.SetOutput(file)
	}
	defer file.Close()

	mal := myanimelist.New()
	if mal != nil {
	}
	mal.InitDB()
	defer mal.CloseDB()
	mal.GetUserAnimeList("choco1drop")
}
