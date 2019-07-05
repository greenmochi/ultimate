from concurrent import futures
import time
#import logging

import grpc

import ultimate_torrent.libtorrent as lt

from ultimate_torrent.service import ultimate_torrent_pb2_grpc
from ultimate_torrent.service.ultimate_torrent_service import UltimateTorrentService


def main():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    ultimate_torrent_pb2_grpc.add_UltimateTorrentServicer_to_server(
        UltimateTorrentService(), server)
    server.add_insecure_port("[::]:50051")
    server.start()
    print("started server on :50051")
    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        print("server stopped")
        server.stop(0)


if __name__ == "__main__":
    main()
