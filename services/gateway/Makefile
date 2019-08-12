all: proto
	@echo GOPATH=$(GOPATH)
	mkdir -p build
	go build -o build/gateway.exe

build: 
	mkdir -p build
	go build -o build/gateway.exe

clean:
	rm -rf build

PROTOC_INCLUDES=-I$(GOPATH)/src -I$(GOPATH)/src/github.com/grpc-ecosystem/grpc-gateway/third_party/googleapis

proto:
	protoc nyaa.proto -Iproto/nyaa $(PROTOC_INCLUDES) --grpc-gateway_out=logtostderr=true,paths=source_relative:proto/nyaa
	protoc nyaa.proto -Iproto/nyaa $(PROTOC_INCLUDES) --go_out=plugins=grpc,paths=source_relative:proto/nyaa
	protoc torrent.proto -Iproto/torrent $(PROTOC_INCLUDES) --grpc-gateway_out=logtostderr=true,paths=source_relative:proto/torrent
	protoc torrent.proto -Iproto/torrent $(PROTOC_INCLUDES) --go_out=plugins=grpc,paths=source_relative:proto/torrent
	protoc myanimelist.proto -Iproto/myanimelist $(PROTOC_INCLUDES) --grpc-gateway_out=logtostderr=true,paths=source_relative:proto/myanimelist
	protoc myanimelist.proto -Iproto/myanimelist $(PROTOC_INCLUDES) --go_out=plugins=grpc,paths=source_relative:proto/myanimelist
	protoc myanimelist.proto -Iproto/myanimelist/message $(PROTOC_INCLUDES) --grpc-gateway_out=logtostderr=true,paths=source_relative:proto/myanimelist/message
	protoc myanimelist.proto -Iproto/myanimelist/message $(PROTOC_INCLUDES) --go_out=plugins=grpc,paths=source_relative:proto/myanimelist/message
	protoc youtubedl.proto -Iproto/youtubedl $(PROTOC_INCLUDES) --grpc-gateway_out=logtostderr=true,paths=source_relative:proto/youtubedl
	protoc youtubedl.proto -Iproto/youtubedl $(PROTOC_INCLUDES) --go_out=plugins=grpc,paths=source_relative:proto/youtubedl

.PHONY: all build clean proto