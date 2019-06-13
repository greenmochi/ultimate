import PostQueryData from "./query";

/**
 * Sends a POST request to the nyaa service through the proxy.
 * 
 * @param endpoint The endpoint to send to in the format of /endpoint
 * @param searchTerm The term to search for in nyaa.si
 * @returns The promise to `API_ROOT/endpoint`
 */
export async function fetchResults<T>(endpoint: string, queryData: PostQueryData): Promise<T> {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(queryData),
  };

  return fetch(
    endpoint,
    options
  ).then(response => {
    if (!response.ok) {
      throw new Error(endpoint + " " + response.statusText);
    }
    return response.json();
  })
}