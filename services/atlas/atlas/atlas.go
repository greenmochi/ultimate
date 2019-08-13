package atlas

type Atlas struct {
	Playlist Playlist
}

func NewAtlas() *Atlas {
	newAtlas := &Atlas{}
	items := LoadPlaylistItemsFromDisk()
	if items != nil {
		newAtlas.Playlist = Playlist{Items: items}
	} else {
		newAtlas.Playlist = Playlist{Items: make([]PlaylistItem, 0)}
	}
	return newAtlas
}

func (a *Atlas) GetPlaylist() Playlist {
	return a.Playlist
}

func (a *Atlas) GetPlaylistItems() []PlaylistItem {
	return a.Playlist.Items
}
