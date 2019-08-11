import uuid
from concurrent.futures import ThreadPoolExecutor, wait

import youtube_dl

import hydro_engine.config as config
 
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
        return download_info.id
    
    def remove_from_queue(self, id):
        self.downloads = [
            download for download in self.downloads if download.id != id
        ]
    
    def get_all_downloads(self):
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
        self.id = str(uuid.uuid4())
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

        if save_dir:
            self.save_dir = save_dir
        else:
            self.save_dir = config.get_save_dir()

        self.state = None

    def logger_hook(self):
        def _real_logger_hook(state):
            self.state = state
            print(state)
        return _real_logger_hook
