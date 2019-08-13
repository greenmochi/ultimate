all: build

build:
	pyinstaller hydro_engine/__main__.py --name youtube-dl

proto:
	python -m grpc_tools.protoc hydro_engine/proto/youtubedl.proto -I. --python_out=. --grpc_python_out=.

.PHONY: all build proto