import time

from hydro_engine.proto import youtubedl_pb2
from hydro_engine.proto import youtubedl_pb2_grpc

from hydro_engine.download_manager import DownloadInfo

class YoutubedlService(youtubedl_pb2_grpc.YoutubeDLServicer):
    """Implemeents YoutubeDLServicer functionalities"""

    def __init__(self, downloader):
        self.downloader = downloader
    
    def Ping(self, request, context):
        msg = "Got your message: " + request.message
        return youtubedl_pb2.PingReply(message=msg)

    def AddToQueue(self, request, context):
        # url = "https://www.youtube.com/watch?v=ypDPoUPsgaE"
        id = self.downloader.add_to_queue(DownloadInfo(request.url))
        return youtubedl_pb2.DownloadItemResponse(id=id)

    def RemoveFromQueue(self, request, context):
        id = request.id
        self.downloader.remove_from_queue(id)
        return youtubedl_pb2.DownloadRemoveResponse(message="Successfully removed from download list")
    
    def GetAllDownloads(self, request, context):
        response = []
        downloads = self.downloader.get_all_downloads()
        for download in downloads:
            response.append(youtubedl_pb2.Download(url=download.url, title=str(download.state["downloaded_bytes"]), status=download.state["status"]))
        return youtubedl_pb2.AllDownloads(downloads=response)