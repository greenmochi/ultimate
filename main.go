package main

import (
	"os"
	"github.com/greenmochi/kabedon-nyaa/torrent"
	"github.com/greenmochi/kabedon-nyaa/logger"
)

const (
	port = ":9995"
)

func main() {
	// Run gRPC service, uncomment/comment when you don't want it running
	//grpc.RunGRPC(port)

	// anacrolix/torrent is outputting crazy noise, turn it off and log to file instead
	os.Stdout = nil

	defer logger.Close()

	client, err := torrent.NewClient()
	if err != nil {
		logger.Fatalf("%+v\n", err)
		os.Exit(1)
	}
	defer client.Close()

	logger.Infoln("Adding magnet")
	magnet := "magnet:?xt=urn:btih:464aa94a230061049a1017c7550e6cf724aa9767&dn=%5BHorribleSubs%5D%20Sewayaki%20Kitsune%20no%20Senko-san%20-%2009%20%5B360p%5D.mkv&tr=http%3A%2F%2Fnyaa.tracker.wf%3A7777%2Fannounce&tr=udp%3A%2F%2Fopen.stealth.si%3A80%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969%2Fannounce&tr=udp%3A%2F%2Fexodus.desync.com%3A6969%2Fannounce"
	if ok := client.AddMagnet(magnet); !ok {
		// fmt.Fprintf(f, "unable to add magnet")
		logger.Error("Unable to add magnet")
	}
	logger.Infoln("Done")
}
