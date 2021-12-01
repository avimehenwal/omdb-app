import type { NextApiRequest, NextApiResponse } from 'next'
import { IMovies } from '../../omdb-app/omdb-api-service'

const mockMovie: IMovies = {
  Title: "Sample Title",
  Year: "1988",
  imdbID: "tt0058590",
  Type: "Movie",
  Poster: "N/A"
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<IMovies>
) {
  res.status(200).json(mockMovie)
}
