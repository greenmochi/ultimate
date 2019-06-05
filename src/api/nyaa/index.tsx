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
  // const fullUrl: string = API_ROOT +  `?searchTerm=${searchTerm}`;
  const fullUrl: string = url.createQueryString(API_ROOT, endpoint, "");
  const urlParams = new URLSearchParams(new URL(fullUrl).search);
  console.log(fullUrl);
  console.log(urlParams.get("searchTerm"));
  let params3: URLSearchParams = new URLSearchParams([["foo", "1"],["bar", "2"]]);
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
      throw new Error(response.statusText);
    }
    return response.json();
  })
}