export interface IMovies {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

const mockMovie: IMovies = {
  Title: "Sample Title",
  Year: "1988",
  imdbID: "tt0058590",
  Type: "Movie",
  Poster: "N/A"
}

type type = 'movie' | 'series' | 'episode'

export class OmdbAPI {
  type?: string
  _key?: string
  base: string
  sampleUrl?: string

  constructor(type: type = 'movie', _key = '968f91f7') {
    this.type = type
    this._key = _key
    this.sampleUrl ?? `http://www.omdbapi.com/?i=tt3896198&apikey=${_key}`
    this.base = `http://www.omdbapi.com/?apikey=${_key}&type=${type}`
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
