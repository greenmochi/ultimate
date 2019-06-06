package api

import (
	"strconv"

	"github.com/anaskhan96/soup"
)

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

// Parse parse html string and finds results for each torrent
func Parse(html string) []Result {
	var results []Result

	doc := soup.HTMLParse(html)
	tableBody := doc.Find("tbody")
	for _, tableRow := range tableBody.FindAll("tr") {
		result := Result{}
		for i, tableData := range tableRow.FindAll("td") {
			switch i {
			case 0:
				// Torrent Category
				link := tableData.Find("a")
				result.Category = link.Attrs()["title"]
			case 1:
				// Torrent name
				links := tableData.FindAll("a")
				if len(links) == 1 {
					link := links[0]
					title := link.Text()
					result.Name = title
				} else if len(links) == 2 {
					link := links[1]
					title := link.Text()
					result.Name = title
				}
			case 2:
				// Torrent link
				links := tableData.FindAll("a")
				if len(links) == 2 {
					result.Link = links[1].Attrs()["href"]
				}
			case 3:
				// Torrent size
				size := tableData.Text()
				result.Size = size
			case 4:
				// Torrent date
				date := tableData.Text()
				result.Date = date
			case 5:
				// Torrent seeders
				seeders := tableData.Text()
				if i, err := strconv.Atoi(seeders); err == nil {
					result.Seeders = uint64(i)
				}
			case 6:
				// Torrent leechers
				leechers := tableData.Text()
				if i, err := strconv.Atoi(leechers); err == nil {
					result.Leechers = uint64(i)
				}
			case 7:
				// Torrent downloads
				downloads := tableData.Text()
				if i, err := strconv.Atoi(downloads); err == nil {
					result.Downloads = uint64(i)
				}
			}
		}
		results = append(results, result)
	}
	return results
}
