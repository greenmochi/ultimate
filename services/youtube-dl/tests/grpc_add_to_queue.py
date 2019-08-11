import grpc
import time

from hydro_engine.proto import youtubedl_pb2
from hydro_engine.proto import youtubedl_pb2_grpc

with grpc.insecure_channel("localhost:8123") as channel:
    stub = youtubedl_pb2_grpc.YoutubeDLStub(channel)
    id = stub.AddToQueue(youtubedl_pb2.DownloadItem(url="https://www.youtube.com/watch?v=vDEbdmXR4Jc"))

    time.sleep(5)

    status = stub.GetAllDownloads(youtubedl_pb2.AllDownloadsRequest())
    print(status)
    status = stub.GetAllDownloads(youtubedl_pb2.AllDownloadsRequest())
    print(status)