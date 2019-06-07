package nyaa

// Result holds the torrent meta information
type Result struct {
	Category  string
	Name      string
	Link      string
	Size      string
	Date      string
	Seeders   uint64
	Leechers  uint64
	Downloads uint64
}
