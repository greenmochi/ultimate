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

    def AddToDownloadQueue(self, request, context):

        print("Add to queue url 1")
        url = "https://www.youtube.com/watch?v=ypDPoUPsgaE"
        self.downloader.add_to_queue(DownloadInfo(url))

        print("Add to queue url 2")
        url2 = "https://www.youtube.com/watch?v=ag7qs4Rc-aY"
        self.downloader.add_to_queue(DownloadInfo(url2))
        print(self.downloader.downloads)
        return youtubedl_pb2.DownloadItemResponse(message="Got your request to add to queue")
    
    def AddToDownloadQueueSlow(self, request, context):

        print("Add to queue slow url 1")
        url = "https://www.youtube.com/watch?v=nEpF6ISYdM0"
        self.downloader.add_to_download_queue(url)

        time.sleep(5)

        print("Add to queue slow url 2 after 5 seconds")
        url2 = "https://www.youtube.com/watch?v=pqNmLXkSGxs"
        self.downloader.add_to_download_queue(url2)
        print(self.downloader.queue)
        return youtubedl_pb2.DownloadItemResponse(message="Got your request to add to the slow queue")

    def AllStatus(self, request, context):
        all_status = self.downloader.all_status()
        if len(all_status) > 0:
            status = all_status[0]
            return youtubedl_pb2.AllStatusResponse(url=status.url, title=str(status.state["downloaded_bytes"]))
        return youtubedl_pb2.AllStatusResponse(url="nothing", title="crap")