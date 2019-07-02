from ultimate_torrent.service import ultimatetorrent_pb2
from ultimate_torrent.service import ultimatetorrent_pb2_grpc


class UltimateTorrentService(ultimatetorrent_pb2_grpc.UltimateTorrentServicer):
    """Implements UltimateTorrentServier functionalities"""

    def __init__(self):
        pass

    def Ping(self, request, context):
        msg = "Got your message: " + request.message
        return ultimatetorrent_pb2.PingReply(message=msg)

    def Shutdown(self, request, context):
        msg = "Got your message: " + request.message
        return ultimatetorrent_pb2.ShutdownReply(message=msg)
