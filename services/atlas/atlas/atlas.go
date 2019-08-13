package atlas

type Atlas struct {
	playlist Playlist
}

func NewAtlas() *Atlas {
	newAtlas := &Atlas{}
	items := LoadPlaylistItemsFromDisk()
	if items != nil {
		newAtlas.playlist = Playlist{Items: items}
	} else {
		newAtlas.playlist = Playlist{Items: make([]PlaylistItem, 0)}
	}
	return newAtlas
}

func (a *Atlas) GetPlaylist() Playlist {
	return a.playlist
}

func (a *Atlas) GetPlaylistItems() []PlaylistItem {
	return a.playlist.Items
}
