import useSWR from "swr";
import { fetcherCB } from "./common-network-service";

export interface IMovies {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

type type = 'movie' | 'series' | 'episode'


export class OmdbAPI {
  type?: string
  _key?: string
  base: string
  sampleUrl?: string

  constructor() {
    this._key = process.env.NEXT_PUBLIC_OMDB_API_KEY
    this.sampleUrl ?? `http://www.omdbapi.com/?i=tt3896198&apikey=${this._key}`
    this.base = `http://www.omdbapi.com/?apikey=${this._key}`
  }

  searchMovieByTitleURL = (searchText: string | null) => {
    // trim spaces, as API doesnt accepts whitespaces in search term
    const canonicalized = searchText?.replace(/\s+/g, '');
    const type: type = 'movie'
    const url = `${this.base}&type=${type}&s=${canonicalized}`
    console.log(url);

    return url
  }



  searchByTitleURL = (searchText: string) => {
    // trim spaces, as API doesnt accepts whitespaces in search term
    const canonicalized = searchText.replace(/\s+/g, '');
    const url = `${this.base}&s=${canonicalized}`
    return url
  }

  searchByImdbIdURL = (imdbId: string) => {
    const url = `${this.base}&i=${imdbId}`
    return url
  }

  getMoviesByTitle = async (searchText: string) => {
    const url = this.searchByTitleURL(searchText)
    return this.useGet(url)
  };

  getMoviesById = async (imdbId: string) => {
    const url = this.searchByImdbIdURL(imdbId)
    return this.useGet(url)
  }

  useGet = async (url: string) => {
    try {
      const response = await fetch(url);
      const json = await response.json();
      console.log(JSON.stringify(json, null, 2))
      return json?.Search
    } catch (error) {
      console.error(error);
    }
  }
}
