# myanimelist

A gRPC service to retrieve a user's animelist and any related anime information through an easy-to-use api.

# Build

Build everything
```bash
$ make
```

Build just the protobufs
```bash
$ make proto
```

# Running

```bash
$ build/myanimelist
```

# Goals
- (User Interface) Allow a user to browse through anime
    - Random, popular, featured, discover, airing.
    - Similar to Netflix and Youtube's home page.
- Retrieve a user's animelist and expose it through an endpoint with ultimate's gateway 
    - e.g. myanimelist/animelist/[USERNAME]
- Store multiple user's animelist in the database
- Send a signal to torrent a specific anime (like a shortcut) to the torrent gRPC service
- Retrieve information for a specific anime
    - e.g. Dr. Stone's information https://myanimelist.net/anime/38691/Dr_Stone
- Store all data in a local database (e.g. SQLite)
    - Enables caching benefits
    - Less network requests
    - Faster to load information from disk, to myanimelist service, to ultimate's ui.

# Backlog
- (If MyAnimeList.net's api is fixed) Provide full account functionality such as modifying ratings, adding anime, etc.
- Optimize search results
    - Problem: Send a search query to myanimelist, parse the results, then grab ~50 images as blobs takes seconds.
    - Expectation: The search query and its entirety should take a couple hundred milliseconds.
    - Solution: find a way to speed up the search query and the image request process
    - Points of interest:
        - myanimelist/fetch/fetch.go 
            - func AnimeSearchResults(query string) ([]*data.AnimeSearchResult, error);
            - func getImage(url string) ([]byte, error);

# Reference
- Building MAL requests
    - https://github.com/jikan-me/jikan