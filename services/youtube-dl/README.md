# hydro engine
A youtube-dl gRPC service.

# Requirements

- Python 3.7+

# Setup

```bash
$ pipenv shell
$ pipenv install
```

# Running

```bash
$ python -m hydro_engine
```

# Tests

# Build (Windows)

# Build (Linux)

## VS Code configuration
If you're using vscode to develop, it is highly recommended to enable the
virtual environment through vscode as well.

`Command palette > Python: Select Interpreter`

Select the virtualenv created for this project.

The integrated terminal will also automatically start the virtualenv in its
shell. As always, check with `pip -V`.

# Goals
- Allow a user to download a youtube video
- Allow a user to view history of downloaded, downloading, removed youtube videos 
    - Allow a user to see current status of downloading items
- Allow multiple configurations for user to quickly download video or only audio

# Backlog
- Add customizable configurations that are saved to disk somewherek
