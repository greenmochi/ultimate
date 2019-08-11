from __future__ import absolute_import

from concurrent.futures import ThreadPoolExecutor, wait
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
    if d["status"] == "downloading":
        print('Done downloading, now converting ...')

class DownloadManager(object):
    """Downloads youtube videos from a queue"""

    def __init__(self):
        self.downloads = []
        self.executor = ThreadPoolExecutor(max_workers=4)
    
    def download(self, download_info):
        with youtube_dl.YoutubeDL(download_info.opts) as ytdl:
            ytdl.download([download_info.url])

    def add_to_queue(self, download_info):
        download = self.executor.submit(self.download, download_info)
        self.downloads.append(download)
    
    def add_lots_to_queue(self, download_info_list):
        for download_info in download_info_list:
            self.add_to_queue(download_info)

    def status(self):
        pass

class DownloadInfo(object):
    """Information to pass to youtube-dl"""

    def __init__(self, url, opts=None, save_dir=None):
        self.url = url
        self.default_opts = {
            "formats": "bestaudio/best",
            # "outtmpl": "{}/%(title)s.%(ext)s".format(save_dir),
            "outtmpl": "%(title)s.%(ext)s",
            "noplaylist": True,
            "logger": YoutubeDLLogger(),
            "progress_hooks": [logger_hook],
        }
        if opts:
            self.opts = opts
        else:
            self.opts = self.default_opts