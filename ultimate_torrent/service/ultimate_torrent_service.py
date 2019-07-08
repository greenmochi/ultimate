import time

from ultimate_torrent.service import ultimate_torrent_pb2
from ultimate_torrent.service import ultimate_torrent_pb2_grpc

class UltimateTorrentService(ultimate_torrent_pb2_grpc.UltimateTorrentServicer):
    """Implements UltimateTorrentServier functionalities"""

    def __init__(self):
        pass

    def Ping(self, request, context):
        msg = "Got your message: " + request.message
        return ultimate_torrent_pb2.PingReply(message=msg)

    def Shutdown(self, request, context):
        msg = "Got your message: " + request.message
        return ultimate_torrent_pb2.ShutdownReply(message=msg)

    def AllTorrentStatus(self, request, context):
        msg = "Go your AllTorrentStatus request: " + request.message
        for i in range(3):
            msg = msg + " " + str(i)
            time.sleep(1)
            yield ultimate_torrent_pb2.AllTorrentStatusReply(message=msg)