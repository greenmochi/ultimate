package torrent

import "github.com/anacrolix/torrent"

// Client wraps the torrent client
type Client struct {
	client *torrent.Client
}

// NewClient wraps anacrolix torrent new client
func NewClient() (*Client, error) {
	client, err := torrent.NewClient(nil)
	if err != nil {
		return nil, err
	}
	return &Client{
		client: client,
	}, nil
}