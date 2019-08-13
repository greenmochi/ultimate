all: proto
	@echo GOPATH=$(GOPATH)
	mkdir -p build
	go build -o build/atlas.exe

build:
	mkdir -p build
	go build -o build/atlas.exe

clean:
	rm build/atlas.exe

test:
	go test ./...

PROTOC_INCLUDES=-I$(GOPATH)/src -I$(GOPATH)/src/github.com/grpc-ecosystem/grpc-gateway/third_party/googleapis

proto:
	protoc atlas.proto -Iproto/atlas $(PROTOC_INCLUDES) --go_out=plugins=grpc,paths=source_relative:proto/atlas
	protoc atlas.proto -Iproto/atlas/message $(PROTOC_INCLUDES) --go_out=plugins=grpc,paths=source_relative:proto/atlas/message

.PHONY: all build clean test proto
