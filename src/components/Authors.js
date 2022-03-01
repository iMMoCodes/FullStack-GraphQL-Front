import { useMutation, useQuery } from '@apollo/client'
import { useState } from 'react'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'
import Select from 'react-select'

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS)
  const [selectedOption, setSelectedOption] = useState({
    value: null,
    label: null,
  })
  const [born, setBorn] = useState('')
  const [changeBornYear] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  })

  if (result.loading) {
    return <div>loading...</div>
  }
  const options = []

  result?.data?.allAuthors.map((author) =>
    options.push({ value: author.name, label: author.name })
  )

  if (!props.show) {
    return null
  }

  const submit = (e) => {
    e.preventDefault()
    changeBornYear({
      variables: { name: selectedOption.value, setBornTo: parseInt(born) },
    })
    setSelectedOption({ value: null, label: null })
    setBorn('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {result.data.allAuthors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <h2>Set birthyear</h2>
        <form onSubmit={submit}>
          <div>
            <Select
              defaultValue={selectedOption}
              options={options}
              onChange={setSelectedOption}
            />
          </div>
          <div>
            born{' '}
            <input
              value={born}
              onChange={({ target }) => setBorn(target.value)}
            />
          </div>
          <button type='submit'>edit author</button>
        </form>
      </div>
    </div>
  )
}

export default Authors
