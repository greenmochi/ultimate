import grpc

from hydro_engine.proto import youtubedl_pb2
from hydro_engine.proto import youtubedl_pb2_grpc

with grpc.insecure_channel("localhost:8123") as channel:
    stub = youtubedl_pb2_grpc.YoutubeDLStub(channel)
    status = stub.AllStatus(youtubedl_pb2.AllStatusRequest())
    print(status)
    status = stub.AllStatus(youtubedl_pb2.AllStatusRequest())
    print(status)
    status = stub.AllStatus(youtubedl_pb2.AllStatusRequest())
    print(status)
    status = stub.AllStatus(youtubedl_pb2.AllStatusRequest())
    print(status)
    status = stub.AllStatus(youtubedl_pb2.AllStatusRequest())
    print(status)
    status = stub.AllStatus(youtubedl_pb2.AllStatusRequest())
    print(status)
    status = stub.AllStatus(youtubedl_pb2.AllStatusRequest())
    print(status)
    status = stub.AllStatus(youtubedl_pb2.AllStatusRequest())
    print(status)
    