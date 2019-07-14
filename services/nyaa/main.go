package main

import (
	"flag"
	"fmt"
	"os"
	"os/signal"
	"syscall"

	log "github.com/sirupsen/logrus"

	"github.com/greenmochi/ultimate/services/nyaa/service"
)

func main() {
	var helpUsage bool
	var port int
	flag.BoolVar(&helpUsage, "help", false, "Prints help text")
	flag.IntVar(&port, "port", 9991, "Port to serve this service on")
	flag.Parse()
	flag.Visit(func(fn *flag.Flag) {
		if fn.Name == "help" {
			fmt.Print(helpText)
			os.Exit(1)
		}
	})

	// Setup logrus
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

	log.Info("Successfuly setup the API")

	// Run gRPC service
	go func() {
		log.WithFields(log.Fields{
			"port": port,
		}).Infof("Running nyaa service on :%d", port)
		if err := service.Serve(port, api); err != nil {
			log.WithFields(log.Fields{
				"error": err,
			}).Fatal(err)
		}
	}()

	exit := make(chan os.Signal, 1)
	signal.Notify(exit, os.Interrupt, syscall.SIGTERM)

	// Graceful shutdown
	log.Info("Graceful shutdown loop started")
	for {
		select {
		case <-exit:
			log.Info("Exit signal received. Program has exited.")
			os.Exit(1)
			return
		}
	}
}

const helpText = `Usage: nyaa [options]

example: nyaa --port=2352

A gRPC service to scrape nyaa.si and download torrent, 
used in joint with ultimate and its gateway.

Options:
  --help        Prints program help text
  
  --port=PORT   Run nyaa service on this port
`
