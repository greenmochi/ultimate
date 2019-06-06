package api

type Result struct {
	Category  CategoryOpt
	Name      string
	Link      string
	Size      string
	Date      string
	Seeders   uint64
	Leechers  uint64
	Downloads uint64
}
