SERVICE=nyaa

all: proto
	@echo GOPATH=$(GOPATH)
	mkdir -p bin
	go build -o bin/kabedon-nyaa.exe

clean:
	rm -rf bin

test:
	go test ./...

proto:
	protoc proto/nyaa.proto -Iproto -I$(GOPATH)/src -I$(GOPATH)/src/github.com/grpc-ecosystem/grpc-gateway/third_party/googleapis --go_out=plugins=grpc:proto 

get-proto:
	git clone git@github.com:greenmochi/kabedon-proto.git

pull-proto:
	if [ ! -d ./kabedon-proto ]; then make get-proto; fi
	pushd kabedon-proto; \
		git pull; \
	popd; \

copy-proto:
	if [ ! -d ./kabedon-proto ]; then make get-proto; fi

	# Add files to kabedon-proto here
	cp proto/nyaa.proto kabedon-proto/nyaa

push-proto:
	make copy-proto
	pushd "kabedon-proto"; \
		git add --all; \
		git commit -m "Update protobuf files for $(SERVICE)"; \
		git push; \
	popd; \

.PHONY: all clean test proto get-proto pull-proto push-proto