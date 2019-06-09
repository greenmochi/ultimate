# kabedon-kokoro
A beating heart to help kabedon-electron control the underworld.

# Overview
Note: This is somewhat of an awkward configuration. Due to grpc-gateway not exposing the actual mux that's passed to the http handler, we
will temporarily use this setup:

- Run grpc-gateway on one local port
- Run kabedon-kokoro on a different local port

We need this extra server to handle middleware logic, though not an actual middleware, and other logistical means like logging and gRPC server liveness.

# Install gRPC

Download the protobuf compilers and other binaries for your system. Use the latest release and not the pre-release version.

https://github.com/protocolbuffers/protobuf/releases

eg. For windows, download and place in your path the binaries from protoc-3.7.1-win64.zip 

# Compiling protobufs
Compile stub
```bash
$ protoc proto/helloworld.proto -Iproto -I$GOPATH/src -I$GOPATH/src/github.com/grpc-ecosystem/grpc-gateway/third_party/googleapis --go_out=plugins=grpc:proto 
```
Compile gateway
```bash
$ protoc proto/helloworld.proto -Iproto/ -I$GOPATH/src -I$GOPATH/src/github.com/grpc-ecosystem/grpc-gateway/third_party/googleapis --grpc-gateway_out=logtostderr=true:proto 
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

# Notes
If gateway is returning an error where the gRPC service is refusing connection even though the gRPC service is running, restart gateway and the respective gRPC service. I am unsure why, but this solves the problem consistently.