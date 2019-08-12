import os

def get_save_dir():
    app_data = os.getenv("APPDATA")
    if app_data:
        path = os.path.join(app_data, "ultimate-youtubedl")
        try:
            os.makedirs(path, exist_ok=True)
            print("Successfully created %s directory" % path)
        except OSError as e:
            print("Failed to create %s directory %s" % (path, e))
        else:
            return path
    return ""