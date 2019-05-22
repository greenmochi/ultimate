# kabedon-kokoro
A beating heart to help kabedon-electron control the underworld.

# Install gRPC

Download the protobuf compilers and other binaries for your system. Use the latest release and not the pre-release version.

https://github.com/protocolbuffers/protobuf/releases

eg. For windows, download and place in your path the binaries from protoc-3.7.1-win64.zip 

# Compiling protobufs
Compile stub
```bash
$ protoc -Iproto -I$GOPATH/src -I$GOPATH/src/github.com/grpc-ecosystem/grpc-gateway/third_party/googleapis --go_out=plugins=grpc:proto proto/helloworld.proto
```
Compile gateway
```bash
$ protoc -Iproto/ -I$GOPATH/src -I$GOPATH/src/github.com/grpc-ecosystem/grpc-gateway/third_party/googleapis --grpc-gateway_out=logtostderr=true:proto proto/helloworld.proto
```