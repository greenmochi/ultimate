import grpc

from ultimate_torrent.service import ultimate_torrent_pb2
from ultimate_torrent.service import ultimate_torrent_pb2_grpc

class Client():
    """Client to test the service"""

    def __init__(self):
        self.channel = grpc.insecure_channel("localhost:50051")
        self.stub = ultimate_torrent_pb2_grpc.UltimateTorrentStub(self.channel)
    
    def close(self):
        self.channel.close()
    
    def ping(self):
        ping_req = ultimate_torrent_pb2.PingRequest(message="This is my ping request")
        ping_reply = self.stub.Ping(ping_req)
        print("Our ping reply:", ping_reply)

    def shutdown(self):
        shutdown_req = ultimate_torrent_pb2.ShutdownRequest(message="This is my shutdown request")
        shutdown_reply = self.stub.Shutdown(shutdown_req)
        print("Our shutdown reply:", shutdown_reply)
    