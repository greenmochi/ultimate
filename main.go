package main

import (
	"flag"
	"fmt"
	"os"
	"os/signal"
	"path/filepath"
	"syscall"

	"github.com/greenmochi/kabedon-kokoro/gateway"
	"github.com/greenmochi/kabedon-kokoro/kokoro"
	"github.com/greenmochi/kabedon-kokoro/logger"
	"github.com/greenmochi/kabedon-kokoro/process"
)

func main() {
	// Setup logger
	defer logger.Close()

	var helpUsage bool
	var gatewayPort int
	var kokoroPort int
	var nyaaPort int
	flag.BoolVar(&helpUsage, "help", false, "Prints help text")
	flag.IntVar(&gatewayPort, "gateway-port", 9990, "Port to serve the gateway server")
	flag.IntVar(&kokoroPort, "kokoro-port", 9991, "Port to serve the kokoro server")
	flag.IntVar(&nyaaPort, "nyaa-port", 9995, "Nyaa grpc server port")
	flag.Parse()
	flag.Visit(func(fn *flag.Flag) {
		if fn.Name == "help" {
			fmt.Print(helpText)
			os.Exit(1)
		}
	})

	shutdown := make(chan bool)
	exit := make(chan bool)
	release := make(chan bool)

	// Run all gRPC services
	go func() {
		binary := "./kabedon-nyaa.exe"
		logger.Infof("running %s on port=%d", binary, nyaaPort)
		cmd, err := process.Start(binary, nyaaPort)
		if err != nil {
			fullpath, err := filepath.Abs(binary)
			if err != nil {
				logger.Fatal("couldn't resolve binary full path:", err)
			} else {
				logger.Fatal("binary full path:", fullpath)
			}
		}

		// Wait for release signal when kabedon-kokoro finishes
		<-release

		// TODO: Do a graceful shutdown for each gRPC service.
		// Add a way to search for runaway gRPC servers and kill them by name

		// if err := cmd.Process.Release(); err != nil {
		// 	logger.Fatalf("unable to release resources for %s: %s", binary, err)
		// }

		// Try to kill process by finding it (if it exists) with FindProcess
		// if _, err := os.FindProcess(cmd.ProcessState.Pid()); err == nil {
		// 	if err := cmd.Process.Kill(); err != nil {
		// 		logger.Fatalf("unable to kill %s: %s", binary, err)
		// 	}
		// }
		if err := cmd.Process.Kill(); err != nil {
			logger.Fatalf("unable to kill %s: %s", binary, err)
		}
		logger.Infof("killed %s", binary)
		logger.Info(binary, " finished with ", err)

		exit <- true
	}()

	// Load and run all gateway handlers on a port
	go func() {
		endpoints := map[string]string{
			"nyaa": fmt.Sprintf("localhost:%d", nyaaPort),
		}
		logger.Infof("running gateway server on :%d", gatewayPort)
		if err := gateway.Run(gatewayPort, endpoints); err != nil {
			logger.Fatal(err)
		}
	}()

	// Run secondary server
	go func() {
		logger.Infof("running kokoro server on :%d", kokoroPort)
		if err := kokoro.Run(kokoroPort, gatewayPort, shutdown); err != nil {
			logger.Fatal(err)
		}
	}()

	interrupt := make(chan os.Signal, 1)
	signal.Notify(interrupt, os.Interrupt, syscall.SIGTERM)

	// Graceful shutdown
	logger.Infof("graceful shutdown loop started")
	for {
		select {
		case <-shutdown:
			logger.Info("shutdown signal received")
			release <- true
		case <-interrupt:
			logger.Info("interrupt signal received")
			release <- true
		case <-exit:
			logger.Info("exit signal received. Program exited.")
			os.Exit(1)
			return
		}
	}
}

const helpText = `Usage: kabedon-kokoro [options]

kabedon-kokoro converts REST to gRPC calls, and provides a secondary server
to log information and control the gRPC services.

Options:
  --help              Prints program help text
  
  --gateway-port=PORT Run gateway on PORT
  --kokoro-port=PORT  Run secondary server on PORT
  
  --nyaa-port=PORT    Run kabedon-nyaa service on PORT
`
