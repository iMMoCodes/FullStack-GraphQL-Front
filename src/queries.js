import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`

export const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      author
      published
    }
  }
`
export const CREATE_BOOK = gql`
  mutation createBook(
    $title: String!
    $published: Int!
    $author: String!
    $genres: [String!]
    $addBookId: ID!
  ) {
    addBook(
      title: $title
      published: $published
      author: $author
      genres: $genres
      id: $addBookId
    ) {
      title
      author
      published
      id
      genres
    }
  }
`