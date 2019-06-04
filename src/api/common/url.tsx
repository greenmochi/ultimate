/**
 * Constructs a query parameter string
 * @param map A map of key-value pairs
 * @param prefix Prefix to to the query string, defaults to "?"
 */
export function mapToQueryString(map: Map<string, string>, prefix: string = "?"): string {
  if (map.size <= 0) {
    return "";
  }

  const keyValuePairs: string[] = [];
  map.forEach((value: string, key: string) => {
    keyValuePairs.push(key + "=" + value);
  })

  return prefix + keyValuePairs.join("&");
}

export function isBaseValid(base: string): boolean {
  const regexp = new RegExp(/https?:\/\/localhost:[0-9]+/);
  if (!regexp.test(base)) {
    return false;
  }
  // const portRegexp = new RegExp(/[0-9]+/);
  const match: RegExpMatchArray | null = base.match(/[0-9]+/g);
  if (!match || match.length != 1) {
    return false;
  }

  const port = Number(match[0]);
  if (typeof port !== "number" || isNaN(port)) {
    return false;
  }
  return port >= 0 && port <= 65535;
}

export function createQueryString(base: string, endpoint: string, queryParams: string): string {
  if (!base) {
    console.warn(`Problem creating query string: base=${base}`);
    return "";
  } 
  
  if (!endpoint) {
    console.warn(`Problem creating query string: endpoint=${endpoint}`);
    return "";
  }

  if (!queryParams) {
    console.warn(`Problem creating query string: queryParams=${queryParams}`);
    return "";
  }
  return "";
}