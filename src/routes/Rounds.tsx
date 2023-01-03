import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import axios from 'axios'

const Rounds = () => {
  const [searchParams] = useSearchParams()
  const course = searchParams.get('course')
  const [rounds, setRounds] = useState([])

  useEffect(() => {
    const getRounds = async () => {
      const allRounds = await axios({
        method: 'POST',
        url: `${process.env.REACT_APP_API_GATEWAY}/data`,
        headers: {
          'x-api-key': `${process.env.REACT_APP_COURSES_API_KEY}`
        },
        data: {
          action: 'GET_ALL',
          type: 'rounds'
        }
      })

      setRounds(allRounds.data.Items)
    }

    getRounds()
  }, [])

  return (
    <div>
      <p>Rounds played</p>
      <p>{ course || 'All courses' }</p>
    </div>
  )
}

export default Rounds
