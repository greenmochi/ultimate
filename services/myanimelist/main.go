package main

import (
	"flag"
	"fmt"
	"os"
	"path/filepath"

	log "github.com/sirupsen/logrus"

	"github.com/greenmochi/ultimate/services/myanimelist/grpc"
	"github.com/greenmochi/ultimate/services/myanimelist/myanimelist"
	"github.com/greenmochi/ultimate/services/myanimelist/myanimelist/config"
)

func main() {
	var helpUsage bool
	var port int
	flag.BoolVar(&helpUsage, "help", false, "Prints help text")
	flag.IntVar(&port, "port", 9993, "Port to serve this service on")
	flag.Parse()
	flag.Visit(func(fn *flag.Flag) {
		if fn.Name == "help" {
			fmt.Print(helpText)
			os.Exit(1)
		}
	})

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
	log.SetFormatter(&log.JSONFormatter{})
	file, err := os.OpenFile(filepath.Join(appDataDir, "myanimelist.log"), os.O_CREATE|os.O_WRONLY|os.O_TRUNC, 0666)
	if err != nil {
		log.Info("Failed to open log to myanimelist.log file, defaulting to using stderr")
		log.SetOutput(os.Stderr)
	} else {
		log.SetOutput(file)
	}
	defer file.Close()

	mal := myanimelist.New()
	mal.InitDB(filepath.Join(appDataDir, "myanimelist.db"))
	defer mal.CloseDB()

	// Start serving our gRPC service
	log.Infof("Running myanimelist service on :%d", port)
	if err := grpc.Serve(mal, port); err != nil {
		log.Error(err)
	}
	// mal.GetUserAnimeList("choco1drop")
	// mal.GetUserAnimeList("choco1drop")
	// mal.GetUserAnimeList("censky")
	// mal.GetUserAnimeList("censky")

	// results, err := mal.SearchAnime("boku no hero academia")
	// if err != nil {
	// 	log.Error(err)
	// }
	// mal.GetAnimeBySearchResult(results[0])
	// mal.GetAnimeBySearchResult(results[0])
	// mal.GetAnimeByID(37521)
	// mal.GetAnimeByID(38671)
}

const helpText = `Usage: myanimelist [options]

example: myanimelist --port=2352

A gRPC service to retrieve a user's animelist and any 
related anime information through an easy-to-use api.

Options:
  --help        Prints program help text
  --port=PORT   Run myanimelist service on this port
`
