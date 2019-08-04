all: proto
	@echo GOPATH=$(GOPATH)
	mkdir -p build
	go build -o build/myanimelist.exe

clean:
	rm build/myanimelist.exe

test:
	go test ./...

PROTOC_INCLUDES_PATH=-I$(GOPATH)/src -I$(GOPATH)/src/github.com/grpc-ecosystem/grpc-gateway/third_party/googleapis

proto:
	protoc myanimelist.proto -Iproto/myanimelist $(PROTOC_INCLUDES_PATH) --go_out=plugins=grpc,paths=source_relative:proto/myanimelist
	protoc myanimelist.proto -Iproto/myanimelist/message $(PROTOC_INCLUDES_PATH) --go_out=plugins=grpc,paths=source_relative:proto/myanimelist/message

.PHONY: all clean test proto
