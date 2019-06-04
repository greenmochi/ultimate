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