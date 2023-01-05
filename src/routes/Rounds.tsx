import { SyntheticEvent, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import HolesCard from '../components/HolesCard'
import Loader from '../components/Loader'
import RoundCard from '../components/RoundCard'
import RoundForm from '../components/RoundForm'
import { getAllData, getDataFilteredByCourseName } from '../utils/apiGateway'
import { ICourseData, IRoundData } from '../ts/interfaces'

const Rounds = () => {
  const [loading, setLoading] = useState(true)
  const [searchParams] = useSearchParams()
  const courseParameter = searchParams.get('course')
  const addRoundParameter = searchParams.get('addRound')
  const [rounds, setRounds] = useState([])
  const [selectedRound, setSelectedRound] = useState<IRoundData | null>()
  const [roundFormVisible, setRoundFormVisible] = useState<boolean>(false)
  const [courses, setCourses] = useState<ICourseData[]>([])

  const handleRoundSelect = (event: SyntheticEvent<HTMLButtonElement, Event>) => {
    setRoundFormVisible(false)
    const clickedRoundId = event.currentTarget.getAttribute('data-roundid')
    if (clickedRoundId === selectedRound) {
      return setSelectedRound(null)
    }
  
    setSelectedRound(rounds.find((round: IRoundData) => round.id === clickedRoundId))
  }

  const handleRoundForm = () => {
    setRoundFormVisible(true)
    setSelectedRound(null)
  }

  useEffect(() => {
    const fetchCourseData = async() => {
      const allCourses = await getAllData('courses')
      setCourses(allCourses.data.Items)
    }

    const fetchRoundData = async() => {

      const allRounds = courseParameter ?
        await getDataFilteredByCourseName('rounds', courseParameter)
        :
        await getAllData('rounds')
      setRounds(allRounds.data.Items)
    }

    fetchCourseData()
    fetchRoundData()
    setLoading(false)
  }, [courseParameter])

  return (
    <>
      {
        loading ?
          <Loader />
        :
          (
            <div className='twoColumnGrid'>
              <div className='column1'>
              <button onClick={handleRoundForm}>Add a round +</button>
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
                  selectedRound &&
                  <HolesCard
                    holes={selectedRound.holesData}
                    existingRound={true}
                  />
                }
                {
                  (roundFormVisible || addRoundParameter) &&
                  <RoundForm
                    courses={courses}
                    selectedCourseName={courseParameter}
                  />
                }
              </div>
            </div>
          )
      }
    </>
  )
}

export default Rounds
