import type { NextApiRequest, NextApiResponse } from 'next'
import { IMovies } from '../../omdb-app/omdb-api-service'

interface IResponse {
  Search: IMovies[],
  totalResults: string,
  Response: string
}
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<IResponse>
) {
  res.status(200).json(searchSampleForVan)
}

const searchSampleForVan: IResponse = { "Search": [{ "Title": "Van Helsing", "Year": "2004", "imdbID": "tt0338526", "Type": "movie", "Poster": "https://m.media-amazon.com/images/M/MV5BODRmY2NhNDItOWViNi00OTIyLTk3YjYtYzY0YTFlMDg1YzQ0L2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg" }, { "Title": "Van Wilder", "Year": "2002", "imdbID": "tt0283111", "Type": "movie", "Poster": "https://m.media-amazon.com/images/M/MV5BMTM4YjQxYzAtNzAyNy00Zjk1LTk4ZTMtNTUwNTBjMWY1M2IwXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg" }, { "Title": "The Lady in the Van", "Year": "2015", "imdbID": "tt3722070", "Type": "movie", "Poster": "https://m.media-amazon.com/images/M/MV5BOTY0MjM3NTQyOF5BMl5BanBnXkFtZTgwMzcwNjUxNzE@._V1_SX300.jpg" }, { "Title": "Van Wilder 2: The Rise of Taj", "Year": "2006", "imdbID": "tt0480271", "Type": "movie", "Poster": "https://m.media-amazon.com/images/M/MV5BMTg1NTA0MzA2OV5BMl5BanBnXkFtZTcwMjA2MzA0MQ@@._V1_SX300.jpg" }, { "Title": "Van Wilder: Freshman Year", "Year": "2009", "imdbID": "tt1276434", "Type": "movie", "Poster": "https://m.media-amazon.com/images/M/MV5BNmQ0MzZiZWQtOTZlZS00NzJmLWI5NTMtM2ZmYTg4MmUwNzg4XkEyXkFqcGdeQXVyNDgyODgxNjE@._V1_SX300.jpg" }, { "Title": "Bankier van het verzet", "Year": "2018", "imdbID": "tt4610378", "Type": "movie", "Poster": "https://m.media-amazon.com/images/M/MV5BZGYzYTExOWEtMDlhZi00ZGVkLTg0NWYtZDZlN2UzZWZjYTE4XkEyXkFqcGdeQXVyMjI5NzU3Nzc@._V1_SX300.jpg" }, { "Title": "The Van", "Year": "1996", "imdbID": "tt0118064", "Type": "movie", "Poster": "https://m.media-amazon.com/images/M/MV5BMTRlZGI1NzUtMWU4Yy00Y2RkLWFlMmQtOTE2YWNhMWEzY2Q5XkEyXkFqcGdeQXVyNjMwMjk0MTQ@._V1_SX300.jpg" }, { "Title": "VAN valami furcsa és megmagyarázhatatlan", "Year": "2014", "imdbID": "tt3496334", "Type": "movie", "Poster": "https://m.media-amazon.com/images/M/MV5BNDk3MzYyMjU5NF5BMl5BanBnXkFtZTgwNzQ5MDkzMzE@._V1_SX300.jpg" }, { "Title": "Jean-Claude Van Johnson", "Year": "2016", "imdbID": "tt5655056", "Type": "movie", "Poster": "https://m.media-amazon.com/images/M/MV5BMjIzMzA5NDk0NF5BMl5BanBnXkFtZTgwMDY2OTE2OTE@._V1_SX300.jpg" }, { "Title": "Van Diemen's Land", "Year": "2009", "imdbID": "tt1361843", "Type": "movie", "Poster": "https://m.media-amazon.com/images/M/MV5BMjAzODIzNjY5NF5BMl5BanBnXkFtZTcwMDkyNDM4Mg@@._V1_SX300.jpg" }], "totalResults": "2030", "Response": "True" }