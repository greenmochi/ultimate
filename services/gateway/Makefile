all: proto
	@echo GOPATH=$(GOPATH)
	mkdir -p bin
	go build -o bin/ultimate-heart.exe

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

	protoc ultimate_torrent.proto \
	  -Iproto/ultimate_torrent \
	  -I$(GOPATH)/src \
	  -I$(GOPATH)/src/github.com/grpc-ecosystem/grpc-gateway/third_party/googleapis \
	  --grpc-gateway_out=logtostderr=true,grpc_api_configuration=proto/ultimate_torrent/ultimate_torrent.yaml:proto/ultimate_torrent

	protoc ultimate_torrent.proto \
	  -Iproto/ultimate_torrent \
	  -I$(GOPATH)/src \
	  -I$(GOPATH)/src/github.com/grpc-ecosystem/grpc-gateway/third_party/googleapis \
	  --go_out=plugins=grpc:proto/ultimate_torrent

.PHONY: all proto