from concurrent import futures
import time
import logging

import grpc
from hydro_engine.proto import youtubedl_pb2_grpc
from hydro_engine.proto.youtubedl_service import YoutubedlService

from hydro_engine.download_manager import DownloadManager

def main():
    logging.basicConfig(filename="youtubedl.log", filemode="w", format="%(asctime)s - %(message)s", level=logging.INFO)
    download_manager = DownloadManager()
    logging.info("Running hydro engine...")

    youtubedl_service = YoutubedlService(download_manager)

    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    youtubedl_pb2_grpc.add_YoutubeDLServicer_to_server(youtubedl_service, server)
    server.add_insecure_port("[::]:9994")
    server.start()
    logging.info("started server on :9994")

    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        logging.info("server stopped")
        server.stop(0)

if __name__ == "__main__":
    main()