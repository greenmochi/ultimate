# nyaa
A gRPC service to scrape nyaa.si and download torrent.

# Overview
nyaa is meant to be used in joint with ultimate-electron and ultimate-kokoro.

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
$ bin/nyaa
```

# Managing protobufs
This just clones https://github.com/greenmochi/ultimate-proto
```bash
$ make get-proto
```

Enters ultimate-proto directory and git pulls
```bash
$ make pull-proto
```

This copies the .proto files in proto/ to somewhere ultimate-proto/. Everytime you add a new a .proto file to your project, you would need to modify the this Makefile target. If you update your .proto files (and already modified this Makefile target), then just run this.
```bash
$ make copy-proto
```

Enters ultimate-proto directory and pushes any changes to https://github.com/greenmochi/ultimate-proto repository.
```bash
$ make push-proto
```

# Notes
github.com/anacrolix/torrent uses github.com/anacrolix/go-libutp which is a go wrapper for github.com/bittorrent/libutp and it requires gcc to compile bittorrent's transport protocol library.

github.com/anacrolix/torrent client doesn't expose the logger. Unfortunately, it's outputting a lot of noise.
```bash
$ ./nyaa
go-libutp: 2019/06/06 03:53:10 socket.go:172: ignoring socket read error: read udp4 0.0.0.0:58865: wsarecvfrom: The connection has been broken due to keep-alive activity detecting a failure while the operation was in progress.
go-libutp: 2019/06/06 03:53:11 socket.go:172: ignoring socket read error: read udp4 0.0.0.0:58865: wsarecvfrom: The connection has been broken due to keep-alive activity detecting a failure while the operation was in progress.
go-libutp: 2019/06/06 03:53:11 socket.go:172: ignoring socket read error: read udp4 0.0.0.0:58865: wsarecvfrom: The connection has been broken due to keep-alive activity detecting a failure while the operation was in progress.
2019-06-06 03:53:12 portfwd.go:31: discovered 0 upnp devices
```
Turn it off by setting os.Stdout = nil and just log to a file instead, though this can be disadvantageous...

It turns out, there exist no clean solution to managing all the .proto files for a project. It seems like most people end up hacking together a bash script or centralizing their protobuf (ultimate does the same), and then just pulls from that repository.

# Issues
If there is a visual studio code go build error that looks like a link failure because of g++, try recloning the project. It seems to solve the problem temporarily.
```
# github.com/greenmochi/nyaa
C:\Go\pkg\tool\windows_amd64\link.exe: running g++ failed: exit status 
```