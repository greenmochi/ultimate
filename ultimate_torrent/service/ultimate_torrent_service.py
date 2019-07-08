import time

from ultimate_torrent.service import ultimate_torrent_pb2
from ultimate_torrent.service import ultimate_torrent_pb2_grpc

class UltimateTorrentService(ultimate_torrent_pb2_grpc.UltimateTorrentServicer):
    """Implements UltimateTorrentServier functionalities"""

    def __init__(self, core):
        self.core = core

    def Ping(self, request, context):
        msg = "Got your message: " + request.message
        return ultimate_torrent_pb2.PingReply(message=msg)

    def Shutdown(self, request, context):
        msg = "Got your message: " + request.message
        return ultimate_torrent_pb2.ShutdownReply(message=msg)
    
    def AddMagnetUri(self, request, context):
        handle = self.core.add_magnet_uri(request.magnet)
        status = self.core.get_handle_status(handle)
        return ultimate_torrent_pb2.AddMagnetUriReply(hash=status["hash"])
    
    def RemoveTorrent(self, request, context):
        self.core.remove_torrent(request.hash)
        return ultimate_torrent_pb2.RemoveTorrentRequest()
    
    def PauseTorrent(self, request, context):
        self.core.pause_torrent(request.hash)
        return ultimate_torrent_pb2.PauseTorrentReply()
    
    def ResumeTorrent(self, request, context):
        self.core.resume_torrent(request.hash)
        return ultimate_torrent_pb2.ResumeTorrentReply()

    def AllTorrentStatus(self, request, context):
        while True:
            all_torrent_status = []
            for status in self.core.get_all_handles_status():
                print(status)
                time.sleep(1)
                all_torrent_status.append(ultimate_torrent_pb2.TorrentStatus(
                    hash=status["hash"],
                    name=status["name"],
                    progress=status["progress"],
                    download_rate=status["download_rate"],
                    upload_rate=status["upload_rate"],
                    peers=status["peers"],
                    seeds=status["seeds"],
                    state=status["state"],
                    total_size=status["total_size"],
                ))
            yield ultimate_torrent_pb2.AllTorrentStatusReply(all_torrent_status=all_torrent_status)
