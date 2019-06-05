import * as url from "../common/url";

const API_ROOT = "http://localhost:8000/nyaa";

/**
 * Sends a POST request to the nyaa service through the proxy.
 * 
 * @param endpoint The endpoint to send to in the format of /endpoint
 * @param searchTerm The term to search for in nyaa.si
 * @returns The promise to `API_ROOT/endpoint`
 */
export async function fetchResults<T>(searchTerm: string, endpoint: string = "/search"): Promise<T> {
  const queryParams: string = url.mapToQueryString({ "searchTerm": searchTerm });
  const fullUrl: string = url.createQueryString(API_ROOT, endpoint, queryParams);
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  return fetch(
    fullUrl,
    options
  ).then(response => {
    if (!response.ok) {
      throw new Error(fullUrl + " " + response.statusText);
    }
    return response.json();
  })
}