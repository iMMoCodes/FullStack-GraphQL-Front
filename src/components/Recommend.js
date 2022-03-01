import { useQuery } from '@apollo/client'
import React from 'react'
import { ALL_BOOKS, ME } from '../queries'

const Recommend = (props) => {
  const user = useQuery(ME)
  const books = useQuery(ALL_BOOKS, {
    variables: { genre: user?.data?.me?.favoriteGenre.toLowerCase() },
  })

  if (user.loading) {
    return <div>loading...</div>
  }
  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>recommendations</h2>
      <h4>books in your favorite genre {user.data.me.favoriteGenre}</h4>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.data.allBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommend
