SERVICE=nyaa

all: proto
	@echo GOPATH=$(GOPATH)
	mkdir -p bin
	go build -o bin/ultimate-nyaa.exe

clean:
	rm -rf bin

test:
	go test ./...

proto:
	protoc proto/nyaa.proto -Iproto -I$(GOPATH)/src -I$(GOPATH)/src/github.com/grpc-ecosystem/grpc-gateway/third_party/googleapis --go_out=plugins=grpc:proto 

get-proto:
	git clone git@github.com:greenmochi/ultimate-proto.git

pull-proto:
	if [ ! -d ./ultimate-proto ]; then make get-proto; fi
	pushd ultimate-proto; \
		git pull; \
	popd; \

copy-proto:
	if [ ! -d ./ultimate-proto ]; then make get-proto; fi

	# Add files to ultimate-proto here
	cp proto/nyaa.proto ultimate-proto/nyaa

push-proto:
	make copy-proto
	pushd "ultimate-proto"; \
		git add --all; \
		git commit -m "Update protobuf files for $(SERVICE)"; \
		git push; \
	popd; \

.PHONY: all clean test proto get-proto pull-proto push-proto