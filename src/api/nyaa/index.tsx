export interface NyaaResult {
  category:   string;
  name:       string;
  link:       string;
  size:       string;
  date:       string;
  seeders:    number;
  leechers:   number;
  downloads:  number;
}

export function fetchResults<T>(endpoint: string, searchTerm: string): Promise<T> {
  return fetch(endpoint)
    .then(response => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
}