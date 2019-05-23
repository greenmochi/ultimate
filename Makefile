all: 
	echo $(GOPATH)

proto:
	protoc proto/nyaa.proto -Iproto -I$(GOPATH)/src -I$(GOPATH)/src/github.com/grpc-ecosystem/grpc-gateway/third_party/googleapis --go_out=plugins=grpc:proto 

.PHONY: proto