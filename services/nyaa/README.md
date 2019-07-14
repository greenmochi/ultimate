# nyaa
A gRPC service to scrape nyaa.si and download torrent, used in joint with ultimate and its gateway.

# Requirements

- grpc (latest)

# Build
Build everything
```bash
$ make
```

Build just the protobufs
```bash
$ make proto
```

# Running
```bash
$ build/nyaa
```