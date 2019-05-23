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