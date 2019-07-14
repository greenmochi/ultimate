package main

import (
	"flag"
	"fmt"
	"os"
	"os/signal"
	"syscall"

	gateway "github.com/greenmochi/ultimate/services/gateway/gateway"
	log "github.com/sirupsen/logrus"
)

func main() {
	file, err := os.OpenFile("gateway.log", os.O_CREATE|os.O_WRONLY|os.O_TRUNC, 0666)
	if err != nil {
		log.Info("Failed to log to gateway.log file, using default stderr")
	} else {
		log.SetOutput(file)
	}
	defer file.Close()

	var helpUsage bool
	var gatewayPort int
	var heartPort int
	var nyaaPort int
	var ultimateTorrentPort int
	flag.BoolVar(&helpUsage, "help", false, "Prints help text")
	flag.IntVar(&gatewayPort, "gateway-port", 9990, "Port to serve the gateway server")
	flag.IntVar(&heartPort, "heart-port", 9991, "Port to serve the heart server")
	flag.IntVar(&nyaaPort, "nyaa-port", 9995, "Nyaa grpc server port")
	flag.IntVar(&ultimateTorrentPort, "torrent-port", 9996, "torrent grpc server port")
	flag.Parse()
	flag.Visit(func(fn *flag.Flag) {
		if fn.Name == "help" {
			fmt.Print(helpText)
			os.Exit(1)
		}
	})

	endpoints := map[string]string{
		"nyaa":    fmt.Sprintf("localhost:%d", nyaaPort),
		"torrent": fmt.Sprintf("localhost:%d", ultimateTorrentPort),
	}

	// Run gateway server
	log.WithFields(log.Fields{
		"gatewayPort": gatewayPort,
	}).Infof("Running gateway server on :%d", gatewayPort)
	if err := gateway.Serve(gatewayPort, endpoints); err != nil {
		log.WithFields(log.Fields{
			"error": err,
		}).Fatal(err)
	}

	exit := make(chan os.Signal, 1)
	signal.Notify(exit, os.Interrupt, syscall.SIGTERM)

	// // Graceful shutdown
	log.Info("graceful shutdown loop started")
	for {
		select {
		case <-exit:
			log.Info("Exit signal received. Program has exited.")
			os.Exit(1)
			return
		}
	}
}

const helpText = `Usage: ultimate-heart [options]

ultimate-heart converts REST to gRPC calls, and provides a secondary server
to log information and control the gRPC services.

Options:
  --help                            Prints program help text
  
  --gateway-port=PORT               Run gateway on this PORT
  --heart-port=PORT                 Run secondary server on this PORT
  
  --nyaa-port=PORT                  Run ultimate-nyaa service on this PORT
  --torrent-port=PORT               Run torrent gRPC service on this PORT
`
