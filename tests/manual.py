import sys

from ultimate_torrent import core

c = core.Core()
magnet = "magnet:?xt=urn:btih:04ec27b1cf4629eb4b2206840af7e519c3763021&dn=%5BHorribleSubs%5D%20Boku%20no%20Hero%20Academia%20-%2038%20%5B480p%5D.mkv&tr=http%3A%2F%2Fnyaa.tracker.wf%3A7777%2Fannounce&tr=udp%3A%2F%2Fopen.stealth.si%3A80%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969%2Fannounce&tr=udp%3A%2F%2Fexodus.desync.com%3A6969%2Fannounce"

c.add_magnet_url(magnet)
c.status()