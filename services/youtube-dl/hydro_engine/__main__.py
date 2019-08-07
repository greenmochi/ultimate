from concurrent import futures
import time

import grpc
from hydro_engine.proto import youtubedl_pb2_grpc
from hydro_engine.proto.youtubedl_service import YoutubedlService

from hydro_engine.download_manager import DownloadManager

def main():
    download_manager = DownloadManager()
    print("Running hydro engine...")

    youtubedl_service = YoutubedlService(download_manager)

    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    youtubedl_pb2_grpc.add_YoutubeDLServicer_to_server(youtubedl_service, server)
    server.add_insecure_port("[::]:8123")
    server.start()
    print("started server on :8123")

    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        print("server stopped")
        server.stop(0)

if __name__ == "__main__":
    main()