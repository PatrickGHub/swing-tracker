import { SyntheticEvent, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import axios from 'axios'
import Loader from '../components/Loader'
import RoundCard from '../components/RoundCard'
import RoundForm from '../components/RoundForm'
import { getAllCourses } from '../utils/apiGateway'
import { ICourseData, IRoundData } from '../ts/interfaces'

const Rounds = () => {
  const [searchParams] = useSearchParams()
  const course = searchParams.get('course')
  const [rounds, setRounds] = useState([])
  const [selectedRound, setSelectedRound] = useState<IRoundData | null>()
  const [roundFormVisible, setRoundFormVisible] = useState<boolean>(false)
  const [courses, setCourses] = useState<ICourseData[]>([])

  const handleRoundSelect = (event: SyntheticEvent<HTMLButtonElement>) => {
    setRoundFormVisible(false)
    const clickedRoundId = event.currentTarget.getAttribute('data-roundid')
    if (clickedRoundId === selectedRound) {
      return setSelectedRound(null)
    }
  
    setSelectedRound(rounds.find((round: IRoundData) => round.id === clickedRoundId))
  }

  const handlecourseForm = () => {
    setRoundFormVisible(true)
  }

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

  useEffect(() => {
    const fetchCourseData = async() => {
      const allCourses = await getAllCourses()
      setCourses(allCourses.data.Items)
    }

    fetchCourseData()
  }, [])

  return (
    <>
      <p>Rounds played</p>
      <p>{ course || 'All courses' }</p>
      <button onClick={handlecourseForm}>Add a round +</button>
      {
        rounds.length > 0 ?
          (
            <div className='coursesRoute'>
              <div className='column1'>
                {(rounds.map((round: IRoundData) => (
                  <RoundCard
                    key={round.id}
                    round={round}
                    handleRoundSelect={handleRoundSelect}
                    selected={selectedRound?.id === round.id}
                  />
                )))}
              </div>

              <div className='column2'>
                {
                  roundFormVisible &&
                  <RoundForm courses={courses} />
                }
              </div>
            </div>
          )
        :
          <Loader />
      }
    </>
  )
}

export default Rounds
