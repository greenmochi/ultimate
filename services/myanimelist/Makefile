all: proto
	@echo GOPATH=$(GOPATH)
	mkdir -p build
	go build -o build/myanimelist.exe

clean:
	rm build/myanimelist.exe

test:
	go test ./...

proto:
	protoc myanimelist.proto \
	-Iproto/myanimelist \
	-I$(GOPATH)/src \
	-I$(GOPATH)/src/github.com/grpc-ecosystem/grpc-gateway/third_party/googleapis \
	--go_out=plugins=grpc:proto/myanimelist

.PHONY: all clean test proto
