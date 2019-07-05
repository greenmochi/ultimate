# video-player

It is possible to play an .mkv file with subtitles through just the <video> tag alone on the chrome browser.

index.html:

```html
<video id="video" controls preload="metadata">
    <source src="./foo.mkv" type="video/webm">
    <track label="English" kind="subtitles" scrlang="en" src="./subs.vtt" default>
</video>
```

We we also know we can extract (if available) using ffmpeg from an .mkv file.

```bash
ffmpeg -i foo.mkv -map 0:s:0 subs.vtt
```
We can also extract different subtitles if there are many by
specifying the specific stream like so for the next subtitle stream.

```bash
ffmpeg -i foo.mkv -map 0:s:1 subs.vtt
```


