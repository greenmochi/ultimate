# ultimate-heart
A beating heart to help ultimate control the underworld.

# Overview
- Run grpc-gateway on one local port
- Run ultimate-heart on a different local port

We need this extra server (ultimate-heart) to handle middleware logic, though not an actual middleware, and other logistical means like logging and gRPC server liveness.

# Requirements
- [go](https://golang.org/) >= 1.12
  ```bash
  $ go version
  go version go1.12.5 windows/amd64
  ```

- [grpc-go](https://github.com/grpc/grpc-go) (gRPC for go)
  ```
  $ go get -u google.golang.org/grpc
  ```

- protoc `latest version`

  Download the protobuf compiler and related binaries from https://github.com/protocolbuffers/protobuf/releases for your system. Use the latest release and not the pre-release version.

  eg. For windows, download and place in your path the binaries from protoc-3.7.1-win64.zip 

- clone this project (prefer to use go module if possible)
  ```bash
  $ git clone https://github.com/greenmochi/ultimate-heart.git
  ```
  or use `go get`
  ```bash
  $ go get -u github.com/greenmochi/ultimate-heart
  ```

# Compiling protobufs
```bash
$ make proto
```

`make proto` essentially executes two command for each gRPC service: one compilation for the gateway and one for the actual gRPC stubs.

# Build
The binary will be located in the `bin` folder.
```bash
$ make
```

# Usage
Running without flags will use default values.
```bash
$ ./ultimate-heart
```

To run gateway on port 9990, you can pass a flag.
```bash
$ ./ultimate-heart --gateway-port=9990
```

Print help text
```bash
$ ./bin/ultimate-heart.exe --help
Usage: ultimate-heart [options]

ultimate-heart converts REST to gRPC calls, and provides a secondary server       
to log information and control the gRPC services.

Options:
  --help                            Prints program help text

  --gateway-port=PORT               Run gateway on this PORT
  --heart-port=PORT                 Run secondary server on this PORT

  --nyaa-port=PORT                  Run ultimate-nyaa service on this PORT        
  --ultimate-torrent-port=PORT      Run ultimate-torrent gRPC service on this PORT
```

# Adding gRPC services to ultimate-heart
One of the main goals of ultimate-heart is to continuously add as many gRPC we want, though that means we need to recompile each time.
This is a checklist to make sure a gRPC service is added correctly to ultimate-heart.

The example service will be ultimate-youtube, a fake service to download youtube videos.

- Add protobuf compilation to Makefile

The Makefile target `proto` should look like this:
```diff
proto:
    protoc nyaa.proto \ 
      -Iproto/nyaa \ 
      -I$(GOPATH)/src \
      -I$(GOPATH)/src/github.com/grpc-ecosystem/grpc-gateway/third_party/googleapis \ 
      --grpc-gateway_out=logtostderr=true:proto/nyaa \
    protoc nyaa.proto \
      -Iproto/nyaa \ 
      -I$(GOPATH)/src \ 
      -I$(GOPATH)/src/github.com/grpc-ecosystem/grpc-gateway/third_party/googleapis \
      --go_out=plugins=grpc:proto/nyaa \
+   protoc youtube.proto \
+     -Iproto/yotuube \
+     -I$(GOPATH)/src \
+     -I$(GOPATH)/src/github.com/grpc-ecosystem/grpc-gateway/third_party/googleapis \
+     --grpc-gateway_out=logtostderr=true:proto/youtube \
+   protoc youtube.proto \
+     -Iproto/youtube \
+     -I$(GOPATH)/src \
+     -I$(GOPATH)/src/github.com/grpc-ecosystem/grpc-gateway/third_party/googleapis \
+     --go_out=plugins=grpc:proto/youtube \
```

- Add a flag for your service in main.go.

In main.go, the code for flag passing should look like this:
```diff
  var helpUsage bool
  var gatewayPort int
  var heartPort int
  var nyaaPort int
+ var youtubePort int
  flag.BoolVar(&helpUsage, "help", false, "Prints help text")
  flag.IntVar(&gatewayPort, "gateway-port", 9990, "Port to serve the gateway server")
  flag.IntVar(&heartPort, "heart-port", 9991, "Port to serve the heart server")
  flag.IntVar(&nyaaPort, "nyaa-port", 9995, "Nyaa grpc server port")
+ flag.IntVar(&youtubePort, "youtube-port", 9996, "Youtube grpc server port")
  flag.Parse()
  flag.Visit(func(fn *flag.Flag) {
  	if fn.Name == "help" {
  		fmt.Print(helpText)
  		os.Exit(1)
  	}
  })
```

- Add the endpoint to the map of endpoints in main.go. 

endpoints should look like this:
```diff
  endpoints := map[string]string{
    "nyaa":             fmt.Sprintf("localhost:%d", nyaaPort),
    "ultimate-torrent": fmt.Sprintf("localhost:%d", ultimateTorrentPort),
+   "ultimate-youtube": fmt.Sprintf("localhost:%d", ultimateYoutubePort),
  }

```

# Notes
If gateway is returning an error where the gRPC service is refusing connection even though the gRPC service is running, restart gateway and the respective gRPC service. I am unsure why, but this solves the problem consistently.