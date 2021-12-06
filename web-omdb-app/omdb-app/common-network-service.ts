import useSWR from 'swr';

// axio, fetch API, ajax, XMLHTTPRequest
export const fetcherCB = (url: string) => (
  fetch(url).then((res) => res.json())
)


