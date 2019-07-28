package main

import "github.com/greenmochi/ultimate/services/myanimelist/myanimelist"

func main() {
	mal := myanimelist.New()
	if mal != nil {
	}
	mal.InitDB()
	defer mal.CloseDB()
	mal.GetUserAnimeList("choco1drop")
}
