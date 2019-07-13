all: .PHONY

proto:
	python -m grpc_tools.protoc ultimate_torrent/service/ultimate_torrent.proto \
	-I. \
	--python_out=. \
	--grpc_python_out=.

.PHONY: proto