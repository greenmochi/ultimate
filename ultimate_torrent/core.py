from os import path

import ultimate_torrent.libtorrent as lt

class Core():
    """Core is responsible for the main functionality of ultimate-torrent"""

    def __init__(self, session_config=None):
        if session_config is None:
            session_config = {
                "listen_interfaces": "0.0.0.0:6881",
            }
        self.session_config = session_config
        self.session = lt.session(session_config)

    def add_magnet_uri(self, magnet):
        add_torrent_params = lt.parse_magnet_uri(magnet)
        add_torrent_params.save_path = path.expanduser("~/Downloads")
        handle = self.session.add_torrent(add_torrent_params)
        return handle

    def find_torrent_by_hash(self, hash):
        return self.session.find_torrent(hash)
    
    def find_torrent_by_id(self, id):
        handles = self.all_torrent_handles()
        for handle in handles:
            if id == handle.id():
                return handle
        return None

    def all_torrent_handles(self):
        return self.session.get_torrents()
    
    def get_status(self, handles=None):
        if handles is None:
            handles = self.all_torrent_handles()
        all_status = []
        for handle in handles:
            status = handle.status()
            info = {
                "name": status.name,
                "progress": status.progress,
                "downloadRate": status.download_rate,
                "uploadRate": status.upload_rate,
                "peers": status.num_peers,
                "state": status.state,
                "totalSize": status.total_wanted,
            }
            all_status.append(info)
        return all_status
    