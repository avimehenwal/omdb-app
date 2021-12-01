import * as React from "react";
import useSWR from "swr";
import { fetcherCB } from "./common-network-service";
import { IMovies, OmdbAPI } from "./omdb-api-service";

type Props = {
  searchText: string | null,
  // isEnabled?: boolean,
}

export const GetMoviesByTitle: React.FC<Props> = ({ searchText }) => {

  const { data, error } = useSearchByTitle(searchText)

  return (
    <>
      <h1>Movie List</h1>
      <pre>{JSON.stringify(data, null, 4)}</pre>
      <pre>{JSON.stringify(error, null, 4)}</pre>
    </>
  )
}

export const useSearchByTitle = (searchText: string | null) => {
  const apiRef = React.useRef(new OmdbAPI())
  const url = apiRef.current?.searchMovieByTitleURL(searchText)
  const { data, error } = useSWR(url, fetcherCB)

  return { data, error }
}