package main

import (
	"flag"
	"fmt"
	"os"

	gateway "github.com/greenmochi/ultimate/services/gateway/gateway"
	log "github.com/sirupsen/logrus"
)

func main() {
	var helpUsage bool
	var gatewayPort int
	var nyaaPort int
	var torrentPort int
	var myanimelistPort int
	var youtubedlPort int
	flag.BoolVar(&helpUsage, "help", false, "Prints help text")
	flag.IntVar(&gatewayPort, "gateway-port", 9990, "Port to serve the gateway server")
	flag.IntVar(&nyaaPort, "nyaa-port", 9991, "Nyaa grpc server port")
	flag.IntVar(&torrentPort, "torrent-port", 9992, "torrent grpc server port")
	flag.IntVar(&myanimelistPort, "myanimelist-port", 9993, "myanimelist grpc server port")
	flag.IntVar(&youtubedlPort, "youtubedl-port", 9994, "youtubedl grpc server port")
	flag.Parse()
	flag.Visit(func(fn *flag.Flag) {
		if fn.Name == "help" {
			fmt.Print(helpText)
			os.Exit(1)
		}
	})

	// Setup logrus
	log.SetFormatter(&log.JSONFormatter{})
	file, err := os.OpenFile("gateway.log", os.O_CREATE|os.O_WRONLY|os.O_TRUNC, 0666)
	if err != nil {
		log.Info("Failed to log to gateway.log file, using default stderr")
		log.SetOutput(os.Stderr)
	} else {
		log.SetOutput(file)
	}
	defer file.Close()

	endpoints := map[string]string{
		"nyaa":        fmt.Sprintf("localhost:%d", nyaaPort),
		"torrent":     fmt.Sprintf("localhost:%d", torrentPort),
		"myanimelist": fmt.Sprintf("localhost:%d", myanimelistPort),
		"youtubedl":   fmt.Sprintf("localhost:%d", youtubedlPort),
	}

	// Run gateway server
	log.Infof("Running gateway server on :%d", gatewayPort)
	if err := gateway.Serve(endpoints, gatewayPort); err != nil {
		log.Error(err)
	}
}

const helpText = `Usage: gateway [options]

example: gateway --gateway-port=2352 --nyaa-port=3252

gateway converts http calls to gRPC calls. If no ports are provided for
the services, then a default value will be chosen.

Options:
  --help                	Prints program help text

  --gateway-port=PORT   	Run gateway on this port

  --nyaa-port=PORT      	Run nyaa service on this port
  --torrent-port=PORT   	Run torrent service on this port
  --myanimelist-port=PORT   Run myanimelist service on this port
  --youtubedl-port=PORT   	Run youtubedl service on this port
`
