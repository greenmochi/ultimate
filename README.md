# kabedon-nyaa
A gRPC service to scrape nyaa.si and download torrent.

# Overview
kabedon-nyaa is meant to be used in joint with kabedon-electron and kabedon-kokoro.

# Install gRPC
Download the protobuf compilers and other binaries for your system. Use the latest release and not the pre-release version.

https://github.com/protocolbuffers/protobuf/releases

eg. For windows, download and place in your path the binaries from protoc-3.7.1-win64.zip 

# Install gcc
```bash
$ choco install mingw
```

# Compiling
Build everything
```bash
$ make
```

Build protobufs
```bash
$ make proto
```

# Running
```bash
$ bin/kabedon-nyaa
```

# Notes
github.com/anacrolix/torrent uses github.com/anacrolix/go-libutp which is a go wrapper for github.com/bittorrent/libutp and it requires gcc to compile bittorrent's transport protocol library.