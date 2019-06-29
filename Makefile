SERVICE=heart

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

get-proto:
	git clone git@github.com:greenmochi/ultimate-proto.git

pull-proto:
	if [ ! -d ./ultimate-proto ]; then make get-proto; fi
	pushd ultimate-proto; \
		git pull; \
	popd; \

update-proto:
	if [ ! -d ./ultimate-proto ]; then make pull-proto; fi
	cp ultimate-proto/nyaa/*.proto proto/

.PHONY: all proto get-proto pull-proto copy-proto update-proto