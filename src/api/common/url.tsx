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