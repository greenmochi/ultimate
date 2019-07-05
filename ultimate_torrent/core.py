from os import path

from ultimate_torrent.libtorrent import libtorrent as lt
print(lt)

class Core():
    """Core is responsible for the main functionality of ultimate-torrent"""

    def __init__(self, session_config=None):
        if session_config is None:
            session_config = {
                "listen_interfaces": "0.0.0.0:6881",
            }
        self.session_config = session_config
        self.session = lt.session(session_config)

    def add_magnet_url(self, magnet):
        add_torrent_params = lt.parse_magnet_uri(magnet)
        downloads = path.expanduser("~/Downloads")
        add_torrent_params.path = downloads
        self.session.add_torrent(add_torrent_params)

    def status(self):
        torrent_handles = self.session.get_torrents()
        for torrent_handle in torrent_handles:
            status = torrent_handle.status()
            print(f"{status.name}: {status.progress * 100}, {status.download_rate / 1000} {status.upload_rate / 1000} peers: {status.num_peers}, state: {status.state}")
