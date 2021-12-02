import * as React from "react";
import useSWR from "swr";
import { IMovies, OmdbAPI } from "./omdb-api-service";
import Image from 'next/image'
import styles from '../styles/Home.module.css'

type Props = {
  searchText: string | null,
}

export const GetMoviesByTitle: React.FC<Props> = ({ searchText }) => {

  const { data, error, url } = useSearchByTitle(searchText)

  return (
    <div className={styles.card2}>
      <h3><strong>{data.totalResults && data.totalResults}</strong> Search Results</h3>
      {data?.Search ? <MoviesList movies={data.Search} /> : <pre>{JSON.stringify(data, null, 4)}</pre>}
      <pre>{JSON.stringify(error, null, 4)}</pre>
    </div>
  )
}

export const MoviesList: React.FC<{ movies: IMovies[] }> = ({ movies }) => {
  return (
    <ul>
      {
        movies.map((movie: IMovies) => (
          <li key={movie.imdbID}>
            {/* <pre>{JSON.stringify(movie, null, 4)}</pre> */}
            <div className={styles.flexContainer}>
              {movie.Poster !== "N/A" && <Image
                src={movie.Poster}
                alt={movie.Title}
                height="200px"
                width="200px"
              /> || (<Image
                src="/default-image.png"
                alt={movie.Title}
                height="200px"
                width="200px"
              />)
              }
              <div className={styles.textContainer}>
                <h2>{movie.Title}</h2>
                <div className={styles.subText}>
                  <span>{movie.Year}</span>
                  {/* <span>{movie.Type}</span> */}
                </div>
              </div>
            </div>
          </li>
        ))
      }
    </ul>
  )
}

const fetcherCB = (url) => (
  fetch(url).then((res) => res.json())
)

export const useSearchByTitle = (searchText: string | null) => {
  const apiRef = React.useRef(new OmdbAPI())
  const url = apiRef.current?.searchMovieByTitleURL(searchText)
  const { data, error } = useSWR(url, fetcherCB)
  return { data, error, url }
}