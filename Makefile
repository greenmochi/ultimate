all: 
	@echo GOPATH=$(GOPATH)
	mkdir -p bin
	go build -o bin/kabedon-kokoro

proto:
	protoc proto/nyaa.proto -Iproto/ -I$(GOPATH)/src -I$(GOPATH)/src/github.com/grpc-ecosystem/grpc-gateway/third_party/googleapis --grpc-gateway_out=logtostderr=true:proto 
	protoc proto/nyaa.proto -Iproto -I$(GOPATH)/src -I$(GOPATH)/src/github.com/grpc-ecosystem/grpc-gateway/third_party/googleapis --go_out=plugins=grpc:proto 

.PHONY: proto