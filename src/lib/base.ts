// import.meta.env.BASE_URL doesn't reliably include a trailing slash across
// Astro versions/configs — normalize once here so every `${base}img/...`
// reference in components resolves correctly instead of concatenating into
// e.g. "/coherenzimg/..." (a real bug hit while porting the homepage).
export const base = import.meta.env.BASE_URL.endsWith('/')
  ? import.meta.env.BASE_URL
  : `${import.meta.env.BASE_URL}/`;
