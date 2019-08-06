all: .PHONY

proto:
	python -m grpc_tools.protoc torrent/service/torrent.proto -I. --python_out=.  --grpc_python_out=.

.PHONY: proto