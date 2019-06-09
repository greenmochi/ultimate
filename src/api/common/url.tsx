interface KeyValues {
  [key: string]: string;
}

/**
 * Constructs a query parameter string.
 * @param map A map of key-value pairs or `KeyValues`
 * @param prefix Prefix to to the query string, defaults to "?"
 * @returns A query parameter string
 */
export function mapToQueryString(map: KeyValues | Map<string, string>, prefix: string = "?"): string {
  const keyValuePairs: string[] = [];

  if (map instanceof Map) {
    map.forEach((value: string, key: string) => {
      keyValuePairs.push(key + "=" + value);
    })
  } else {
    for (let key in map) {
      if (map[key]) {
        keyValuePairs.push(key + "=" + map[key]);
      }
    }
  }

  if (keyValuePairs.length <= 0) {
    return "";
  }

  return prefix + keyValuePairs.join("&");
}

/**
 * Checks if the base url is in a valid localhost url.
 * 
 * e.g http://localhost:8555
 * @param base Proxy server base url (localhost)
 * @returns Return true if `base` is not malformed
 */
export function isBaseValid(base: string): boolean {
  const regexp = new RegExp(/https?:\/\/localhost:[0-9]+/);
  if (!regexp.test(base)) {
    return false;
  }
  const match: RegExpMatchArray | null = base.match(/[0-9]+/g);
  if (!match || match.length !== 1) {
    return false;
  }

  const port = Number(match[0]);
  if (typeof port !== "number" || isNaN(port)) {
    return false;
  }
  return port >= 0 && port <= 65535;
}

/**
 * Checks if the endpoint is formed correctly.
 * 
 * e.g /myendpoint
 * @param endpoint Proxy/gRPC endpoint
 * @returns Return true if `endpoint` is not malformed
 */
export function isEndpointValid(endpoint: string): boolean {
  const match: RegExpMatchArray | null = endpoint.match(/\/.*/g);
  if (!match || match.length !== 1) {
    return false;
  }
  return true;
}

/**
 * Checks if the query parameters are formed correctly.
 * 
 * e.g ?key1=value1&key2=value2
 * @param queryParams Query parameters
 * @returns Return true if `queryParams` is not malformed
 */
export function isQueryParamsValid(queryParams: string): boolean {
  const match: RegExpMatchArray | null = queryParams.match(/^\?([^=&]+=[^=&]+&)*([^=&]+=[^=&]+)$/g);
  if (!match || match.length !== 1) {
    return false;
  }
  return true;
}

/**
 * Creates a well-formed url with query parameters.
 * 
 * Example: http://localhost:8555/nyaa/search?sort=true&searchTerm=boku no hero academia
 * @param base Proxy server base url (localhost)
 * @param endpoint Proxy/gRPC endpoint
 * @param queryParams Query parameters
 * @returns Formatted url string with query parameters
 */
export function createQueryString(base: string, endpoint: string, queryParams: string): string {
  if (!base || (base && !isBaseValid(base))) {
    console.warn(`Problem creating query string: base=${base}`);
    return "";
  } 
  
  if (!endpoint || (endpoint && !isEndpointValid(endpoint))) {
    console.warn(`Problem creating query string: endpoint=${endpoint}`);
    return "";
  }

  if (!queryParams || (queryParams && !isQueryParamsValid(queryParams))) {
    console.warn(`Problem creating query string: queryParams=${queryParams}`);
    return "";
  }
  return base + endpoint + queryParams;
}