package atlas

import (
	"io/ioutil"
	"path/filepath"
	"strings"

	log "github.com/sirupsen/logrus"

	"github.com/greenmochi/ultimate/services/atlas/config"
)

type Playlist struct {
	Items []PlaylistItem
}

type PlaylistItem struct {
	Filename string
	Path     string
}

// LoadPlaylistItemsFromDisk reads the filename and path of valid media files from .../APPDATA/ultimate-youtubedl
// into a slice of PlaylistItem
func LoadPlaylistItemsFromDisk() []PlaylistItem {
	youtubedl := filepath.Join(config.AppDataDir(), "ultimate-youtubedl")
	if youtubedl == "" {
		return nil
	}

	mediaFiles, err := ioutil.ReadDir(youtubedl)
	if err != nil {
		log.Errorf("Failed to read youtubedl directory %s: %s", youtubedl, err)
		return nil
	}

	var playlistItems []PlaylistItem
	for _, mediaFile := range mediaFiles {
		filename := mediaFile.Name()
		validMedia := isValidMedia(filepath.Ext(filename))
		log.Infof("file=%s", filename)
		if !validMedia || mediaFile.IsDir() {
			continue
		}
		playlistItems = append(playlistItems, PlaylistItem{
			Filename: filename,
			Path:     filepath.Join(youtubedl, filename),
		})
	}
	return playlistItems
}

func isValidMedia(ext string) bool {
	ext = strings.ToLower(ext)
	log.Infof("ext=%s", ext)
	switch ext {
	case ".mp3":
		fallthrough
	case ".m4a":
		fallthrough
	case ".webm":
		fallthrough
	case ".mkv":
		return true
	}
	return false
}
