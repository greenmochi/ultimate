import os
import logging

def get_save_dir():
    app_data = os.getenv("APPDATA")
    if app_data:
        path = os.path.join(app_data, "ultimate-youtubedl")
        if os.path.exists(path):
           return path
        try:
            os.makedirs(path, exist_ok=True)
            logging.info("Successfully created %s directory" % path)
        except OSError as e:
            logging.info("Failed to create %s directory %s" % (path, e))
        else:
            return path
    return ""
