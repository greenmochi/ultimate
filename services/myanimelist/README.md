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
- Store anime page for each user anime (from their anime list)
    - Problem: A user will frequently view the anime in their anime list. We want decrease the lookup time for those anime
    - Expectation: Viewing an anime from a user's anime list should be less than 10ms
    - Solution: After fetching the user's anime list, fetch all anime for each anime in their list.
    - Points of interest:
        - myanimelist/fetch/fetch.go
            - GetUserAnimeList(user string)
- Force update
    - Problem: A user's animelist or anime information might be outdated because that information is stored and pulled
    from an sqlite database.
    - Expectation: There should be a way to refresh their list in the database
    - Solution: Add a gRPC rpc method to force refresh the users list and all the anime in the database
    - Points of intrrest:
        - myanimelist.net might limit us or block us. Consider a way to do incremental updates if necessary

# Reference
- Building MAL requests
    - https://github.com/jikan-me/jikan