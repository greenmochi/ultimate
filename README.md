# kabedon-kokoro
A beating heart to help kabedon-electron control the underworld.

# Overview
**Note:** This is somewhat of an awkward configuration. Due to grpc-gateway not exposing the actual mux that's passed to the http handler, we
will temporarily use this setup:

- Run grpc-gateway on one local port
- Run kabedon-kokoro on a different local port

We need this extra server to handle middleware logic, though not an actual middleware, and other logistical means like logging and gRPC server liveness.

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
  $ git clone https://github.com/greenmochi/kabedon-kokoro.git
  ```
  or use `go get`
  ```bash
  $ go get -u github.com/greenmochi/kabedon-kokoro
  ```

# Compiling protobufs
```bash
$ make proto
```

`make proto` essentially executes two command for each gRPC service: one compilation for the gateway and one for the actual gRPC stubs.

Compile gateway manually
```bash
$ protoc nyaa.proto -Iproto/nyaa -I$(GOPATH)/src -I$(GOPATH)/src/github.com/grpc-ecosystem/grpc-gateway/third_party/googleapis --grpc-gateway_out=logtostderr=true:proto/nyaa
```

Compile stubs manually
```bash
$ protoc nyaa.proto -Iproto/nyaa -I$(GOPATH)/src -I$(GOPATH)/src/github.com/grpc-ecosystem/grpc-gateway/third_party/googleapis --go_out=plugins=grpc:proto/nyaa
```

# Build
```bash
$ make
```

# Usage
Running without flags will use default values.
```bash
$ ./kabedon-kokoro
```
To run gateway on port 9990, you can pass a flag.
```bash
$ ./kabedon-kokoro --gateway-port=9990
```
Print help text
```bash
$ ./kabedon-kokoro --help
Usage: kabedon-nyaa [options]

kabedon-nyaa converts REST to gRPC calls, and provides a secondary server
to log information and control the gRPC services.

Options:
  --help              Prints program help text

  --gateway-port=PORT Run gateway on PORT
  --kokoro-port=PORT  Run secondary server on PORT

  --nyaa-port=PORT    Run kabedon-nyaa service on PORT
```

# Adding gRPC services to kabedon-kokoro
One of the main goals of kabedon-kokoro is to continuously add as many gRPC we want, though that means we need to recompile each time.
This is a checklist to make sure a gRPC service is handled correctly in kabedon-kokoro.

The example service will be kabedon-youtube, a fake service to download youtube videos.

- Add protobuf compilation to Makefile

Modify this:
```Makefile
proto:
    protoc nyaa.proto \
      -Iproto/nyaa \
      -I$(GOPATH)/src \
      -I$(GOPATH)/src/github.com/grpc-ecosystem/grpc-gateway/third_party/googleapis \
      --grpc-gateway_out=logtostderr=true:proto/nyaa
    protoc nyaa.proto \
      -Iproto/nyaa \
      -I$(GOPATH)/src \
      -I$(GOPATH)/src/github.com/grpc-ecosystem/grpc-gateway/third_party/googleapis \
      --go_out=plugins=grpc:proto/nyaa
```

To look like this:
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

Modify this:
```golang
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
```

To look like this:
```diff
  var helpUsage bool
  var gatewayPort int
  var kokoroPort int
  var nyaaPort int
+ var youtubePort int
  flag.BoolVar(&helpUsage, "help", false, "Prints help text")
  flag.IntVar(&gatewayPort, "gateway-port", 9990, "Port to serve the gateway server")
  flag.IntVar(&kokoroPort, "kokoro-port", 9991, "Port to serve the kokoro server")
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

- Add a process.Service to the map of services in main.go. It looks something like this at the moment.

Modify this:
```golang
services := map[string]process.Service{
	"nyaa": process.Service{
		Name:   "kabedon-nyaa",
		Binary: "kabedon-nyaa.exe",
		Dir:    "./kabedon-nyaa",
		Args: []string{
			fmt.Sprintf("--port=%d", nyaaPort),
		},
		Port:     nyaaPort,
		Endpoint: fmt.Sprintf("localhost:%d", nyaaPort),
		FullPath: "./kabedon-nyaa/kabedon-nyaa.exe",
	},
}
```

To look like this:
```diff
services := map[string]process.Service{
	"nyaa": process.Service{
                //...
	},
+	"youtube": process.Service{
+		Name:   "kabedon-youtube",
+		Binary: "kabedon-youtube.exe",
+		Dir:    "./kabedon-youtube",
+		Args: []string{
+			fmt.Sprintf("--port=%d", youtubePort),
+		},
+		Port:     youtubePort,
+		Endpoint: fmt.Sprintf("localhost:%d", youtubePort),
+		FullPath: "./kabedon-youtube/kabedon-youtube.exe",
+	},
}
```

- Add a shutdown request to the respective service to process/service.go. For example, let's add "kabedon-youtube" to the shutdown logic.

Modify this:
```golang
import (
	"github.com/greenmochi/kabedon-kokoro/proto/nyaa"
)

func (s *Service) Shutdown() error {
  //...
  switch s.Name {
  case "kabedon-nyaa":
    c := nyaa.NewNyaaClient(conn)
    message := nyaa.ShutdownRequest{}
    _, err = c.Shutdown(ctx, &message)
  default:
    err = fmt.Errorf("unable to determine service to send shutdown request to: service name is %s", s.Name)
  }
  //...
}
```

To look like this:
```diff
import (
	"github.com/greenmochi/kabedon-kokoro/proto/nyaa"
+	"github.com/greenmochi/kabedon-kokoro/proto/youtube"
)

func (s *Service) Shutdown() error {
  //...
  switch s.Name {
  case "kabedon-nyaa":
    c := nyaa.NewNyaaClient(conn)
    message := nyaa.ShutdownRequest{}
    _, err = c.Shutdown(ctx, &message)
+ case "kabedon-youtube":
+   c := youtube.NewYoutubeClient(conn)
+   message := youtube.ShutdownRequest{}
+   _, err = c.Shutdown(ctx, &message)
  default:
    err = fmt.Errorf("unable to determine service to send shutdown request to: service name is %s", s.Name)
  }
  //...
}
```


# Notes
If gateway is returning an error where the gRPC service is refusing connection even though the gRPC service is running, restart gateway and the respective gRPC service. I am unsure why, but this solves the problem consistently.