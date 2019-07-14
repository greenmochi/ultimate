from concurrent import futures
import time
#import logging

import grpc

import torrent.libtorrent as lt

from torrent.service import torrent_pb2_grpc
from torrent.service.torrent_service import TorrentService
from torrent import core


def main():
    torrent_core = core.Core()
    print("started libtorrent core")

    torrent_service = TorrentService(torrent_core)

    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    torrent_pb2_grpc.add_TorrentServicer_to_server(
        torrent_service, server)
    server.add_insecure_port("[::]:9992")
    server.start()
    print("started server on :9992")

    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        print("server stopped")
        server.stop(0)


if __name__ == "__main__":
    main()
