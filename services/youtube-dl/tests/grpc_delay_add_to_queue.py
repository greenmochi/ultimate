import grpc

from hydro_engine.proto import youtubedl_pb2
from hydro_engine.proto import youtubedl_pb2_grpc

with grpc.insecure_channel("localhost:8123") as channel:
    stub = youtubedl_pb2_grpc.YoutubeDLStub(channel)
    stub.AddToDownloadQueueSlow(youtubedl_pb2.DownloadItem(url="na"))
    