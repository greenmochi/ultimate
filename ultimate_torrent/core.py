
class Core():
    """Core is responsible for the main functionality of ultimate-torrent"""

    def __init__(self, config=None):
        if config is None:
            config = {}
        self.config = config