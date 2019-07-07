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
    
    def remove_torrent(self, handle):
        self.session.remove_torrent(handle)
    
    def pause_torrent(self, handle):
        handle.pause()

    def resume_torrent(self, handle):
        handle.resume()

    def find_handle_by_hash(self, hash):
        return self.session.find_torrent(hash)

    def all_handles(self):
        return self.session.get_torrents()

    def get_handle_status(self, handle):
        status = handle.status()
        return {
            "hash": status.info_hash,
            "name": status.name,
            "progress": status.progress,
            "downloadRate": status.download_rate,
            "uploadRate": status.upload_rate,
            "peers": status.num_peers,
            "state": status.state,
            "totalSize": status.total_wanted,
        }
    
    def get_handles_status(self, handles=None):
        handles_status = []
        for handle in handles:
            handles_status.append(self.get_handle_status(handle))
        return handles_status

    def get_all_handles_status(self):
        all_handles_status = []
        for handle in self.all_handles():
            all_handles_status.append(self.get_handle_status(handle))
        return all_handles_status
    