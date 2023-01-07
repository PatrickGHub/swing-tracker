import { ChangeEvent, SyntheticEvent, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'
import HolesCard from '../components/HolesCard'
import Loader from '../components/Loader'
import RoundCard from '../components/RoundCard'
import RoundForm from '../components/RoundForm'
import { getAllData, getDataFilteredByCourseName, deleteItem } from '../utils/apiGateway'
import { ICourseData, IHoleRoundData, IRoundData } from '../ts/interfaces'

const Rounds = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const [searchParams] = useSearchParams()
  const courseParameter = searchParams.get('course')
  const addRoundParameter = searchParams.get('addRound')
  const [courses, setCourses] = useState<ICourseData[]>([])
  const [rounds, setRounds] = useState([])
  const [selectedRound, setSelectedRound] = useState<IRoundData | null>()

  const [roundFormVisible, setRoundFormVisible] = useState<boolean>(false)
  const [selectedFormCourse, setSelectedFormCourse] = useState<ICourseData | undefined>()
  const [formHolesData, setFormHolesData] = useState<IHoleRoundData[]>([])
  const [formRoundPlayedDate, setFormRoundPlayedDate] = useState<Date>(new Date())
  const [formSubmitting, setFormSubmitting] = useState<boolean>(false)

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
      
      setRounds(allRounds.data.Items.sort(
        (a: IRoundData, b: IRoundData) => new Date(b.date).getTime() - new Date(a.date).getTime()
      ))
    }

    fetchCourseData()
    fetchRoundData()
    setLoading(false)
  }, [courseParameter])

  const handleRoundSelect = (event: SyntheticEvent<HTMLButtonElement, Event>) => {
    setRoundFormVisible(false)
    const clickedRoundId = event.currentTarget.getAttribute('data-roundid')
    if (clickedRoundId === selectedRound) {
      return setSelectedRound(null)
    }
  
    setSelectedRound(rounds.find((round: IRoundData) => round.id === clickedRoundId))
  }

  const handleDeleteRound = async (roundId: string) => {
    await deleteItem('rounds', roundId)
  }

  const handleRoundForm = () => {
    setRoundFormVisible(true)
    setSelectedRound(null)
  }

  const handleFormCourseSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedFormCourse(courses.find((course) => course.name === event.target.value))
  }

  const handleFormHolesDataChange = (e: any) => {
    const hole = e.target.getAttribute('data-hole')
    const par = +e.target.getAttribute('data-par')
    const shots = +e.target.value

    const existingObject = formHolesData.find((object) => object.hole === hole)

    if (!existingObject) {
      setFormHolesData([...formHolesData, {
        hole,
        par: par,
        shots: shots
      }])
    } else {
      existingObject.shots = shots
      setFormHolesData(formHolesData)
    }
  }

  const handleFormSubmit = async (event: any) => {
    setFormSubmitting(true)
    event.preventDefault()

    const score = formHolesData.map(hole => hole.shots).reduce((a, b) => a + b)

    const data = {
      action: 'PUT',
      type: 'rounds',
      id: uuidv4(),
      course: selectedFormCourse?.name,
      date: formRoundPlayedDate,
      par: selectedFormCourse?.par,
      score,
      holes: selectedFormCourse?.holes,
      holesData: JSON.stringify(formHolesData)
    }
    
    await axios({
      method: 'POST',
      url: `${process.env.REACT_APP_API_GATEWAY}/data`,
      headers: {
        'x-api-key': `${process.env.REACT_APP_COURSES_API_KEY}`
      },
      data
    })

    setRoundFormVisible(false)
    setFormSubmitting(false)
  }

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
                    handleDeleteRound={handleDeleteRound}
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
                    selectedFormCourse={selectedFormCourse}
                    handleFormCourseSelect={handleFormCourseSelect}
                    handleFormHolesDataChange={handleFormHolesDataChange}
                    formRoundPlayedDate={formRoundPlayedDate}
                    setFormRoundPlayedDate={setFormRoundPlayedDate}
                    handleFormSubmit={handleFormSubmit}
                    formSubmitting={formSubmitting}
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
