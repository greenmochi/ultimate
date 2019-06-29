package main

import (
	"flag"
	"fmt"
	"os"
	"os/signal"
	"syscall"

	"github.com/greenmochi/ultimate-heart/gateway"
	"github.com/greenmochi/ultimate-heart/heart"
	"github.com/greenmochi/ultimate-heart/logger"
	"github.com/greenmochi/ultimate-heart/process"
)

func main() {
	// Setup logger
	defer logger.Close()

	var helpUsage bool
	var gatewayPort int
	var heartPort int
	var nyaaPort int
	flag.BoolVar(&helpUsage, "help", false, "Prints help text")
	flag.IntVar(&gatewayPort, "gateway-port", 9990, "Port to serve the gateway server")
	flag.IntVar(&heartPort, "heart-port", 9991, "Port to serve the heart server")
	flag.IntVar(&nyaaPort, "nyaa-port", 9995, "Nyaa grpc server port")
	flag.Parse()
	flag.Visit(func(fn *flag.Flag) {
		if fn.Name == "help" {
			fmt.Print(helpText)
			os.Exit(1)
		}
	})

	services := map[string]process.Service{
		"nyaa": process.Service{
			Name:   "ultimate-nyaa",
			Binary: "ultimate-nyaa.exe",
			Dir:    "./ultimate-nyaa",
			Args: []string{
				fmt.Sprintf("--port=%d", nyaaPort),
			},
			Port:     nyaaPort,
			Endpoint: fmt.Sprintf("localhost:%d", nyaaPort),
			FullPath: "./ultimate-nyaa/ultimate-nyaa.exe",
		},
	}

	shutdown := make(chan bool)
	exit := make(chan bool)
	release := make(chan bool)

	// Run all gRPC services
	for _, service := range services {
		go func(service process.Service) {
			cmd, err := process.Start(service.Binary, service.Dir, service.Args)
			if err != nil {
				logger.Errorf("unable to start %s: %s\n%+v\n", service.Name, err, service)
			}
			logger.Infof("running service=%s on port=%d", service.FullPath, service.Port)

			// Wait for release signal when ultimate-heart finishes
			<-release

			if err := service.Shutdown(); err != nil {
				logger.Fatalf("could not send shutdown request to %s. %v", service.Endpoint, err)
				if err := cmd.Process.Kill(); err != nil {
					logger.Fatalf("unable to kill %s. %s", service.Binary, err)
				}
				logger.Infof("killed %s", service.Binary)
			} else {
				logger.Info("shutdown request sucessfully sent")
			}

			exit <- true
		}(service)
	}

	// Run gateway server
	go func() {
		logger.Infof("running gateway server on :%d", gatewayPort)
		if err := gateway.Run(gatewayPort, services); err != nil {
			logger.Fatal(err)
		}
	}()

	// Run secondary server
	go func() {
		logger.Infof("running heart server on :%d", heartPort)
		if err := heart.Run(heartPort, services, shutdown); err != nil {
			logger.Fatal(err)
		}
	}()

	interrupt := make(chan os.Signal, 1)
	signal.Notify(interrupt, os.Interrupt, syscall.SIGTERM)

	// Graceful shutdown
	logger.Infof("graceful shutdown loop started")
	for {
		select {
		case <-interrupt:
			logger.Info("interrupt signal received")
			release <- true
		case <-shutdown:
			logger.Info("shutdown signal received")
			release <- true
		case <-exit:
			logger.Info("exit signal received. Program exited.")
			os.Exit(1)
			return
		}
	}
}

const helpText = `Usage: ultimate-heart [options]

ultimate-heart converts REST to gRPC calls, and provides a secondary server
to log information and control the gRPC services.

Options:
  --help              Prints program help text
  
  --gateway-port=PORT Run gateway on PORT
  --heart-port=PORT  Run secondary server on PORT
  
  --nyaa-port=PORT    Run ultimate-nyaa service on PORT
`
