package torrent

import (
	"github.com/anacrolix/torrent"
)

// Client wraps the torrent client
type Client struct {
	client *torrent.Client
}

// NewClient wraps NewClient
func NewClient() (*Client, error) {
	c, err := torrent.NewClient(nil)
	if err != nil {
		return nil, err
	}

	client := &Client{
		client: c,
	}
	return client, nil
}

// Close wraps Close
func (c *Client) Close() {
	c.client.Close()
}

// AddMagnet wraps AddMagnet
func (c *Client) AddMagnet(uri string) bool {
	_, err := c.client.AddMagnet(uri)
	if err != nil {
		return false
	}
	return true
}
