all: proto
	@echo GOPATH=$(GOPATH)
	mkdir -p build
	go build -o build/nyaa.exe

clean:
	rm -rf build

test:
	go test ./...

proto:
	protoc nyaa.proto \
	-Iproto/nyaa \
	-I$(GOPATH)/src \
	-I$(GOPATH)/src/github.com/grpc-ecosystem/grpc-gateway/third_party/googleapis \
	--go_out=plugins=grpc:proto/nyaa

.PHONY: all clean test proto