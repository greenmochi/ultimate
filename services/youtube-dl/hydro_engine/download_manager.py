from __future__ import absolute_import

from concurrent.futures import ThreadPoolExecutor, wait
import time
import youtube_dl

class DownloadManager(object):
    """Downloads youtube videos from a queue"""

    def __init__(self):
        self.executor = ThreadPoolExecutor(max_workers=4)
        self.downloads = []
    
    def download(self, download_info):
        with youtube_dl.YoutubeDL(download_info.opts) as ytdl:
            ytdl.download([download_info.url])

    def add_to_queue(self, download_info):
        self.executor.submit(self.download, download_info)
        self.downloads.append(download_info)
    
    def all_status(self):
        return self.downloads

class DownloadLogger(object):
    def debug(self, msg):
        pass

    def warning(self, msg):
        pass

    def error(self, msg):
        print(msg)

class DownloadInfo(object):
    """Information to pass to youtube-dl"""

    def __init__(self, url, opts=None, save_dir=None):
        self.id = "poop"
        self.url = url
        self.default_opts = {
            "formats": "bestaudio/best",
            # "outtmpl": "{}/%(title)s.%(ext)s".format(save_dir),
            "outtmpl": "%(title)s.%(ext)s",
            "noplaylist": True,
            "logger": DownloadLogger(),
            "progress_hooks": [self.logger_hook()],
        }
        if opts:
            self.opts = opts
        else:
            self.opts = self.default_opts
        self.save_dir = save_dir

        self.state = None

    def logger_hook(self):
        def _real_logger_hook(state):
            self.state = state
            print(state)
        return _real_logger_hook
