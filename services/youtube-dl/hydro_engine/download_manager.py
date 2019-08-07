from __future__ import absolute_import

import time
import youtube_dl

class DownloadManager():
    """Downloads youtube videos from a queue"""

    def __init__(self):
        self.queue = []
    
    def add_to_download_queue(self, url, opts=""):
        self.queue.append(url)
        time.sleep(3)

    def download(self):
        for url in self.queue:
            ydl_opts = {}
            with youtube_dl.YoutubeDL(ydl_opts) as ydl:
                ydl.download([url]) 
    