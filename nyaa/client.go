package nyaa

import (
	"fmt"
	"io/ioutil"
	"net/http"
	"strconv"

	"github.com/greenmochi/kabedon-nyaa/logger"

	"github.com/anaskhan96/soup"
)

// Client wraps URL
type Client struct {
	URL     *URL
	Results []Result
}

// Get sends a get request using the current URL
func (c *Client) Get() (string, error) {
	if c.URL == nil {
		return "", fmt.Errorf("Client.URL is nil")
	}

	url := c.URL.String()
	logger.Info("GET request for ", url)

	res, err := http.Get(url)
	if err != nil {
		return "", fmt.Errorf("unable to GET request for %s", url)
	}
	body, err := ioutil.ReadAll(res.Body)
	defer res.Body.Close()
	if err != nil {
		return "", fmt.Errorf("unable to parse body for %s", url)
	}
	return string(body), nil
}

// Parse parse html string and sets the client's results
func (c *Client) Parse(html string) bool {
	var results []Result

	doc := soup.HTMLParse(html)
	if doc.Error != nil {
		return false
	}

	tableBody := doc.Find("tbody")
	if tableBody.Error != nil {
		return false
	}

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
					result.Seeders = uint32(i)
				}
			case 6:
				// Torrent leechers
				leechers := tableData.Text()
				if i, err := strconv.Atoi(leechers); err == nil {
					result.Leechers = uint32(i)
				}
			case 7:
				// Torrent downloads
				downloads := tableData.Text()
				if i, err := strconv.Atoi(downloads); err == nil {
					result.Downloads = uint32(i)
				}
			}
		}
		results = append(results, result)
	}

	c.Results = results

	return true
}
