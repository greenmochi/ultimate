package main

import (
	"flag"
	"os"

	log "github.com/sirupsen/logrus"

	"github.com/greenmochi/ultimate/services/nyaa/service"
)

func main() {
	file, err := os.OpenFile("nyaa.log", os.O_CREATE|os.O_WRONLY|os.O_TRUNC, 0666)
	if err != nil {
		log.Info("Failed to log to gateway.log file, using default stderr")
	} else {
		log.SetOutput(file)
	}
	defer file.Close()

	api := service.NewAPI()
	if err != nil {
		log.WithFields(log.Fields{
			"error": err,
		}).Fatal("Unable to setup API")
		os.Exit(1)
	}
	defer api.TearDown()

	log.Info("API setup successfully.")

	var port int
	flag.IntVar(&port, "port", 9991, "Port to serve this service on")
	flag.Parse()

	// Run gRPC service
	service.Serve(port, api)
}
