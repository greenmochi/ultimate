package main

import (
	"flag"
	"fmt"
	"os"

	"github.com/greenmochi/ultimate-heart/gateway"
	"github.com/greenmochi/ultimate-heart/logger"
)

func main() {
	// Close logger at the end
	defer logger.Close()

	var helpUsage bool
	var gatewayPort int
	var heartPort int
	var nyaaPort int
	var ultimateTorrentPort int
	flag.BoolVar(&helpUsage, "help", false, "Prints help text")
	flag.IntVar(&gatewayPort, "gateway-port", 9990, "Port to serve the gateway server")
	flag.IntVar(&heartPort, "heart-port", 9991, "Port to serve the heart server")
	flag.IntVar(&nyaaPort, "nyaa-port", 9995, "Nyaa grpc server port")
	flag.IntVar(&ultimateTorrentPort, "ultimate-torrent-port", 9996, "ultimate-torrent grpc server port")
	flag.Parse()
	flag.Visit(func(fn *flag.Flag) {
		if fn.Name == "help" {
			fmt.Print(helpText)
			os.Exit(1)
		}
	})

	endpoints := map[string]string{
		"nyaa":             fmt.Sprintf("localhost:%d", nyaaPort),
		"ultimate-torrent": fmt.Sprintf("localhost:%d", ultimateTorrentPort),
	}

	// Run gateway server
	logger.Infof("running gateway server on :%d", gatewayPort)
	if err := gateway.Run(gatewayPort, endpoints); err != nil {
		logger.Fatal(err)
	}

	// Run secondary server
	// go func() {
	// 	logger.Infof("running heart server on :%d", heartPort)
	// 	if err := heart.Run(heartPort, services, shutdown); err != nil {
	// 		logger.Fatal(err)
	// 	}
	// }()

	// shutdown := make(chan bool)
	// exit := make(chan bool)
	// release := make(chan bool)

	// interrupt := make(chan os.Signal, 1)
	// signal.Notify(interrupt, os.Interrupt, syscall.SIGTERM)

	// // Graceful shutdown
	// logger.Infof("graceful shutdown loop started")
	// for {
	// 	select {
	// 	case <-interrupt:
	// 		logger.Info("interrupt signal received")
	// 		release <- true
	// 	case <-shutdown:
	// 		logger.Info("shutdown signal received")
	// 		release <- true
	// 	case <-exit:
	// 		logger.Info("exit signal received. Program exited.")
	// 		os.Exit(1)
	// 		return
	// 	}
	// }
}

const helpText = `Usage: ultimate-heart [options]

ultimate-heart converts REST to gRPC calls, and provides a secondary server
to log information and control the gRPC services.

Options:
  --help                            Prints program help text
  
  --gateway-port=PORT               Run gateway on this PORT
  --heart-port=PORT                 Run secondary server on this PORT
  
  --nyaa-port=PORT                  Run ultimate-nyaa service on this PORT
  --ultimate-torrent-port=PORT      Run ultimate-torrent gRPC service on this PORT
`
