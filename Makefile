all: .PHONY

ultimatetorrent-python:
	mkdir -p build/ultimatetorrent-python
	python -m grpc_tools.protoc ultimate_torrent/service/ultimatetorrent.proto -Iultimatetorrent/ --python_out=build/ultimatetorrent-python/ --grpc_python_out=build/ultimatetorrent-python/

.PHONY: ultimatetorrent-python