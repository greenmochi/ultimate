import * as url from "./url";

test("create query parameter string with non-empty map", () => {
  const map: Map<string, string> = new Map<string, string>();
  map.set("key1", "value1");
  expect(url.mapToQueryString(map)).toBe("?key1=value1");

  map.set("key2", "value2");
  expect(url.mapToQueryString(map)).toBe("?key1=value1&key2=value2");
});

test("create query parameter string with empty map", () => {
  const map: Map<string, string> = new Map<string, string>();
  expect(url.mapToQueryString(map)).toBe("");
});

test("valid base url", () => {
  let base: string = "http://localhost:8000";
  expect(url.isBaseValid(base)).toBeTruthy();
  base = "https://localhost:8000";
  expect(url.isBaseValid(base)).toBeTruthy();

  base = "http://localhost:0";
  expect(url.isBaseValid(base)).toBeTruthy();
  base = "https://localhost:0";
  expect(url.isBaseValid(base)).toBeTruthy();

  base = "http://localhost:65535";
  expect(url.isBaseValid(base)).toBeTruthy();
  base = "https://localhost:65535";
  expect(url.isBaseValid(base)).toBeTruthy();
});

test("invalid base url", () => {
  let base: string = "bad url";
  expect(url.isBaseValid(base)).toBeFalsy();

  base = "http://localhost";
  expect(url.isBaseValid(base)).toBeFalsy();
  base = "http://localhost:";
  expect(url.isBaseValid(base)).toBeFalsy();
  base = "http://localhost:-12512";
  expect(url.isBaseValid(base)).toBeFalsy();
  base = "http://localhost:9999999";
  expect(url.isBaseValid(base)).toBeFalsy();
  base = "http://localhsdfsdfost:123";
  expect(url.isBaseValid(base)).toBeFalsy();
  base = "http://localhost:123:456";
  expect(url.isBaseValid(base)).toBeFalsy();
});

test("valid endpoint", () => {
  let endpoint: string = "/nyaa";
  expect(url.isEndpointValid(endpoint)).toBeTruthy();
  endpoint = "/nyaa/nyaa";
  expect(url.isEndpointValid(endpoint)).toBeTruthy();
  endpoint = "/nyaa/qerty"
  expect(url.isEndpointValid(endpoint)).toBeTruthy();
  endpoint = "/nyaa/qerty320487932jg%3215325235";
  expect(url.isEndpointValid(endpoint)).toBeTruthy();
  endpoint = "/nyaa/sdafio sadiof jsdoif";
  expect(url.isEndpointValid(endpoint)).toBeTruthy();
});

test("invalid endpoint", () => {
  let endpoint: string = "nyaa";
  expect(url.isEndpointValid(endpoint)).toBeFalsy();
  endpoint = "";
  expect(url.isEndpointValid(endpoint)).toBeFalsy();
});

test("valid query parameter string", () => {
  let queryParams: string = "?key1=value1";
  expect(url.isQueryParamsValid(queryParams)).toBeTruthy();
  queryParams = "?key1=value1&key2=value2";
  expect(url.isQueryParamsValid(queryParams)).toBeTruthy();
});

test("invalid query parameter string", () => {
  let queryParams: string = "key1=value1";
  expect(url.isQueryParamsValid(queryParams)).toBeFalsy();
  queryParams = "?";
  expect(url.isQueryParamsValid(queryParams)).toBeFalsy();
  queryParams = "";
  expect(url.isQueryParamsValid(queryParams)).toBeFalsy();
  queryParams = "?key1=value1&";
  expect(url.isQueryParamsValid(queryParams)).toBeFalsy();
  queryParams = "key1=value1&key2=value2";
  expect(url.isQueryParamsValid(queryParams)).toBeFalsy();
  queryParams = "?key1=value1key2=value2";
  expect(url.isQueryParamsValid(queryParams)).toBeFalsy();
  queryParams = "?key1=value1&key2=value2&";
  expect(url.isQueryParamsValid(queryParams)).toBeFalsy();
});

test("valid url query string", () => {
  let base: string = "http://localhost:8555/nyaa";
  let endpoint: string = "/search";

  let map: Map<string, string> = new Map<string, string>();
  map.set("searchTerm", "boku no hero academia");
  let queryParams: string = url.mapToQueryString(map);

  expect(url.createQueryString(base, endpoint, queryParams)).toBe("http://localhost:8555/nyaa/search?searchTerm=boku no hero academia");

  map.set("anotherKey", "anotherValue");
  queryParams = url.mapToQueryString(map);

  expect(url.createQueryString(base, endpoint, queryParams)).toBe("http://localhost:8555/nyaa/search?searchTerm=boku no hero academia&anotherKey=anotherValue");
});

test("invalid url query string", () => {
  console.warn = jest.fn();

  let base: string = "";
  let endpoint: string = "/myendpoint";

  let map: Map<string, string> = new Map<string, string>();
  map.set("searchTerm", "boku no hero academia");
  let queryParams: string = url.mapToQueryString(map);

  expect(url.createQueryString(base, endpoint, queryParams)).toBe("");
  expect(console.warn).toHaveBeenCalledTimes(1);

  base = "http://localhost:8000";
  endpoint = "";
  queryParams = queryParams;

  expect(url.createQueryString(base, endpoint, queryParams)).toBe("");
  expect(console.warn).toHaveBeenCalledTimes(2);

  base = "http://localhost:8000";
  endpoint = "/myendpoint"
  queryParams = "";

  expect(url.createQueryString(base, endpoint, queryParams)).toBe("");
  expect(console.warn).toHaveBeenCalledTimes(3);

  base = "http://localhost:800033";
  endpoint = "/myendpoint"
  queryParams = url.mapToQueryString(map);
  expect(url.createQueryString(base, endpoint, queryParams)).toBe("");
  expect(console.warn).toHaveBeenCalledTimes(4);
});