const API_ROOT = "http://localhost:8000";

export function fetchResults<T>(endpoint: string, searchTerm: string): Promise<T> {
  const fullUrl = API_ROOT + endpoint;
  const data = { "searchTerm": searchTerm };
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  return fetch(
    fullUrl,
    options
  )
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
}