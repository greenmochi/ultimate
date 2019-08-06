all: build

build:
	pyinstaller youtube_dl/__main__.p9y --name youtube-dl

proto:
	python -m grpc_tools.protoc torrent/service/torrent.proto -I. --python_out=.  --grpc_python_out=.

.PHONY: all build proto