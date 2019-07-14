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
	var helpUsage bool
	var gatewayPort int
	var nyaaPort int
	var torrentPort int
	flag.BoolVar(&helpUsage, "help", false, "Prints help text")
	flag.IntVar(&gatewayPort, "gateway-port", 9990, "Port to serve the gateway server")
	flag.IntVar(&nyaaPort, "nyaa-port", 9991, "Nyaa grpc server port")
	flag.IntVar(&torrentPort, "torrent-port", 9992, "torrent grpc server port")
	flag.Parse()
	flag.Visit(func(fn *flag.Flag) {
		if fn.Name == "help" {
			fmt.Print(helpText)
			os.Exit(1)
		}
	})

	// Setup logrus
	file, err := os.OpenFile("gateway.log", os.O_CREATE|os.O_WRONLY|os.O_TRUNC, 0666)
	if err != nil {
		log.Info("Failed to log to gateway.log file, using default stderr")
	} else {
		log.SetOutput(file)
	}
	defer file.Close()

	endpoints := map[string]string{
		"nyaa":    fmt.Sprintf("localhost:%d", nyaaPort),
		"torrent": fmt.Sprintf("localhost:%d", torrentPort),
	}

	// Run gateway server
	go func() {
		log.WithFields(log.Fields{
			"gatewayPort": gatewayPort,
		}).Infof("Running gateway server on :%d", gatewayPort)
		if err := gateway.Serve(gatewayPort, endpoints); err != nil {
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

const helpText = `Usage: gateway [options]

example: gateway --gateway-port=2352 --nyaa-port=3252

gateway converts REST to gRPC calls. If not ports are provided for
the services, then a default value will be chosen.

Options:
  --help                Prints program help text
  
  --gateway-port=PORT   Run gateway on this port

  --nyaa-port=PORT      Run nyaa service on this port
  --torrent-port=PORT   Run torrent service on this port
`
