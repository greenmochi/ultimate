package main

import (
	"flag"
	"fmt"
	"os"
	"path/filepath"

	log "github.com/sirupsen/logrus"

	"github.com/greenmochi/ultimate/services/atlas/atlas"
	"github.com/greenmochi/ultimate/services/atlas/config"
	"github.com/greenmochi/ultimate/services/atlas/grpc"
)

func main() {
	var helpUsage bool
	var port int
	flag.BoolVar(&helpUsage, "help", false, "Prints help text")
	flag.IntVar(&port, "port", 9995, "Port to serve this service on")
	flag.Parse()
	flag.Visit(func(fn *flag.Flag) {
		if fn.Name == "help" {
			fmt.Print(helpText)
			os.Exit(1)
		}
	})

	appDataDir, err := config.UserSaveDir()
	if err != nil {
		log.Fatalf("Failed find user save directory path")
		os.Exit(1)
	}
	if err := config.CreateAppDir(appDataDir); err != nil {
		log.Fatalf("Failed to create user save directory")
		os.Exit(1)
	}

	// Setup logrus
	log.SetFormatter(&log.JSONFormatter{})
	file, err := os.OpenFile(filepath.Join(appDataDir, "atlas.log"), os.O_CREATE|os.O_WRONLY|os.O_TRUNC, 0666)
	if err != nil {
		log.Info("Failed to open log to atlas.log file, defaulting to using stderr")
		log.SetOutput(os.Stderr)
	} else {
		log.SetOutput(file)
	}
	defer file.Close()

	atlas := atlas.NewAtlas()

	// Start serving our gRPC service
	log.Infof("Running atlas service on :%d", port)
	if err := grpc.Serve(atlas, port); err != nil {
		log.Error(err)
	}
}

const helpText = `Usage: atlas [options]

example: atlas --port=2352

A playlist gRPC service.

Options:
  --help        Prints program help text
  --port=PORT   Run atlas service on this port
`
