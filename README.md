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

github.com/anacrolix/torrent client doesn't expose the logger. Unfortunately, it's outputting a lot of noise.
```bash
$ ./kabedon-nyaa
go-libutp: 2019/06/06 03:53:10 socket.go:172: ignoring socket read error: read udp4 0.0.0.0:58865: wsarecvfrom: The connection has been broken due to keep-alive activity detecting a failure while the operation was in progress.
go-libutp: 2019/06/06 03:53:11 socket.go:172: ignoring socket read error: read udp4 0.0.0.0:58865: wsarecvfrom: The connection has been broken due to keep-alive activity detecting a failure while the operation was in progress.
go-libutp: 2019/06/06 03:53:11 socket.go:172: ignoring socket read error: read udp4 0.0.0.0:58865: wsarecvfrom: The connection has been broken due to keep-alive activity detecting a failure while the operation was in progress.
2019-06-06 03:53:12 portfwd.go:31: discovered 0 upnp devices
```
Turn it off by setting os.Stdout = nil and just log to a file instead, though this can be disadvantageous...

# Issues
If there is a visual studio code go build error that looks like a link failure because of g++, try recloning the project. It seems to solve the problem temporarily.
```
# github.com/greenmochi/kabedon-nyaa
C:\Go\pkg\tool\windows_amd64\link.exe: running g++ failed: exit status 
```