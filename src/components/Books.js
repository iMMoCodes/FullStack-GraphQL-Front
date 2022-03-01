import { useQuery } from '@apollo/client'
import { useState } from 'react'
import { ALL_BOOKS } from '../queries'

const Books = (props) => {
  const [genre, setGenre] = useState(null)
  const allResults = useQuery(ALL_BOOKS)
  const result = useQuery(ALL_BOOKS, {
    variables: { genre },
  })
  let genres = []

  if (result.loading || allResults.loading) {
    return <div>loading...</div>
  }

  if (!props.show) {
    return null
  }

  allResults.data.allBooks.map((book) =>
    book.genres.map((genre) => {
      if (genres.indexOf(genre) === -1) {
        genres.push(genre)
      }
      return genres
    })
  )

  return (
    <div>
      <h2>books</h2>
      {genre && <h4>in genre {genre}</h4>}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {result.data.allBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => setGenre(null)}>All genres</button>
      {genres.map((genre) => (
        <button
          key={genre}
          onClick={({ target }) => setGenre(target.outerText)}
        >
          {genre}
        </button>
      ))}
    </div>
  )
}

export default Books
