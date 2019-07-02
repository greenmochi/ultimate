all: .PHONY

ultimatetorrent-python:
	mkdir -p build/ultimatetorrent-python
	protoc ultimatetorrent/ultimatetorrent.proto -Iultimatetorrent/ --python_out=build/ultimatetorrent-python/

.PHONY: ultimatetorrent-python