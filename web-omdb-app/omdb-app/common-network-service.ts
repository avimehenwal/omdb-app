import useSWR from 'swr';

// axio, fetch API, ajax, XMLHTTPRequest
export const fetcherCB = (url) => (
  fetch(url).then((res) => res.json())
)


