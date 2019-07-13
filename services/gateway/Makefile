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

	protoc torrent.proto \
	  -Iproto/torrent \
	  -I$(GOPATH)/src \
	  -I$(GOPATH)/src/github.com/grpc-ecosystem/grpc-gateway/third_party/googleapis \
	  --grpc-gateway_out=logtostderr=true,grpc_api_configuration=proto/torrent/torrent.yaml:proto/torrent

	protoc torrent.proto \
	  -Iproto/torrent \
	  -I$(GOPATH)/src \
	  -I$(GOPATH)/src/github.com/grpc-ecosystem/grpc-gateway/third_party/googleapis \
	  --go_out=plugins=grpc:proto/torrent

.PHONY: all proto