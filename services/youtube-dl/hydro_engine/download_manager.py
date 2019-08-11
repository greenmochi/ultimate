from __future__ import absolute_import

from concurrent.futures import ThreadPoolExecutor
import time
import youtube_dl

class YoutubeDLLogger(object):
    def debug(self, msg):
        pass

    def warning(self, msg):
        pass

    def error(self, msg):
        print(msg)

def logger_hook(d):
    if d["status"] == "finished":
        print('Done downloading, now converting ...')

class DownloadManager(object):
    """Downloads youtube videos from a queue"""

    def __init__(self):
        self.default_opts = {
            "formats": "bestaudio/best",
            "outtmpl": "%(id)s",
            "noplaylist": True,
            "logger": YoutubeDLLogger(),
            "progress_hooks": [logger_hook],
        }
        self.queue = []
        self.executor = ThreadPoolExecutor(max_workers=4)
    
    def add_to_download_queue(self, url, opts=""):
        self.queue.append((url, opts))

    def download(self):
        for url in self.queue:
            ydl_opts = {}
            with youtube_dl.YoutubeDL(ydl_opts) as ydl:
                ydl.download([url]) 