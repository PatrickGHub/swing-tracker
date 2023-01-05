import { SyntheticEvent, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import axios from 'axios'
import Loader from '../components/Loader'
import RoundCard from '../components/RoundCard'
import RoundForm from '../components/RoundForm'
import { getAllData } from '../utils/apiGateway'
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
    const fetchCourseData = async() => {
      const allCourses = await getAllData('courses')
      setCourses(allCourses.data.Items)
    }

    const fetchRoundData = async() => {
      const allRounds = await getAllData('rounds')
      setRounds(allRounds.data.Items)
    }

    fetchCourseData()
    fetchRoundData()
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
