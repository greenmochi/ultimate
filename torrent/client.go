package torrent

import "github.com/anacrolix/torrent"

// Client wraps the torrent client
type Client struct {
	client *torrent.Client
	torrents []*torrent.Torrent
}

// NewClient wraps NewClient
func NewClient() (*Client, error) {
	client, err := torrent.NewClient(nil)
	if err != nil {
		return nil, err
	}

	return &Client{
		client: client,
	}, nil
}

// Close wraps Close
func (c *Client) Close() {
	c.Close()
}

// AddMagnet wraps AddMagnet
func (c *Client) AddMagnet(uri string) bool {
	torrent, err := c.client.AddMagnet(uri)
	if err != nil {
		return false
	}

	<- torrent.GotInfo()
	torrent.DownloadAll()
	c.client.WaitAll()
	c.torrents = append(c.torrents, torrent)
	return true
}