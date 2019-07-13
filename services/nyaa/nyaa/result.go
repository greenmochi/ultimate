package nyaa

// Result holds the torrent meta information
type Result struct {
	Category  string
	Name      string
	Link      string
	Size      string
	Date      string
	Seeders   uint32
	Leechers  uint32
	Downloads uint32
}
