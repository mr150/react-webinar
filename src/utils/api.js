export function apiGet(section, params) {
  return fetch(`/api/v1/${section}?${new URLSearchParams(params)}`)
    .then(response => response.json());
}
