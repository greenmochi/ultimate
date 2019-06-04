import * as url from "./url";

test("create query parameter string with non-empty map", () => {
  let map: Map<string, string> = new Map<string, string>();
  map.set("key1", "value1");
  expect(url.mapToQueryString(map)).toBe("?key1=value1");

  map.set("key2", "value2");
  expect(url.mapToQueryString(map)).toBe("?key1=value1&key2=value2");
});

test("create query parameter string with empty map", () => {
  let map: Map<string, string> = new Map<string, string>();
  expect(url.mapToQueryString(map)).toBe("");
});