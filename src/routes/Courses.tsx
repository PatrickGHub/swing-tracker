import { ChangeEvent, FormEvent, SyntheticEvent, useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import axios from 'axios'
import { ICourseData, IHoleData } from '../ts/interfaces'
import { getAllData } from '../utils/apiGateway'
import Loader from '../components/Loader'
import CourseCard from '../components/CourseCard'
import CourseForm from '../components/CourseForm'
import HolesCard from '../components/HolesCard'

const Courses = () => {
  const [courses, setCourses] = useState<ICourseData[]>([])
  const [selectedCourse, setSelectedCourse] = useState<ICourseData | null>()
  const [courseFormVisible, setcourseFormVisible] = useState<boolean>(false)
  const [formCourseName, setFormCourseName] = useState<string | null>(null)
  const [formNumberOfHoles, setFormNumberOfHoles] = useState<number>(0)
  const [formHolesData, setFormHolesData] = useState<IHoleData[]>([])
  const [formSubmitting, setFormSubmitting] = useState<boolean>(false)

  useEffect(() => {
    const fetchCourseData = async() => {
      const allCourses = await getAllData('courses')
      setCourses(allCourses.data.Items.sort(
        (a: ICourseData, b: ICourseData) => a.name.localeCompare(b.name)
      ))
    }

    fetchCourseData()
  }, [])

  const handleCourseSelect = (event: SyntheticEvent<HTMLButtonElement>) => {
    setcourseFormVisible(false)
    const clickedCourseName = event.currentTarget.getAttribute('data-coursename')
    if (clickedCourseName === selectedCourse?.name) {
      return setSelectedCourse(null)
    }
  
    setSelectedCourse(courses.find((course) => course.name === clickedCourseName))
  }

  const handlecourseForm = () => {
    setcourseFormVisible(true)
    setSelectedCourse(null)
  }

  const handleFormChangeCourseName = (event: ChangeEvent<HTMLInputElement>) => {
    setFormCourseName(event.target.value)
  }

  const handleFormChangeNumberOfHoles = (event: ChangeEvent<HTMLInputElement>) => {
    const array = [...Array(+event.target.value).keys()].map(key => ++key)
    const startingHolesObject = array.map((holeNumber) => {
      return {
        hole: holeNumber,
        par: 0,
        yards: 0
      }
    })

    setFormHolesData(startingHolesObject)
    setFormNumberOfHoles(+event.target.value)
    return
  }

  const handleFormParYardsChange = (e: any) => {
    const changedHole: number = +e.target.getAttribute('data-hole')
    const changedKey: keyof IHoleData = e.target.getAttribute('data-key')
    const newValue: number = +e.target.value
    const existingObject: IHoleData | undefined = formHolesData.find((object) => object.hole === changedHole)
    if (existingObject) {
      existingObject[changedKey] = newValue
      setFormHolesData(formHolesData)
    }
  }

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    setFormSubmitting(true)
    event.preventDefault()

    const data = {
      action: 'PUT',
      type: 'courses',
      id: uuidv4(),
      name: formCourseName,
      holes: formNumberOfHoles,
      par: formHolesData.map(hole => hole.par).reduce((a, b) => a + b),
      yards: formHolesData.map(hole => hole.yards).reduce((a, b) => a + b),
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

    setcourseFormVisible(false)
    setFormSubmitting(false)
  }

  return (
    <>
      {
        courses.length > 0 ?
          (
            <div className='twoColumnGrid'>
              <div className='column1'>
                <button onClick={handlecourseForm}>Add a course +</button>
                {(courses.map((course: ICourseData) => (
                  <CourseCard
                    key={course.name}
                    course={course}
                    handleCourseSelect={handleCourseSelect}
                    selected={selectedCourse?.name === course.name}
                  />
                )))}
              </div>

              <div className='column2'>
                {
                  selectedCourse &&
                  <HolesCard holes={selectedCourse.holesData} existingRound={false}/>
                }
                {
                  courseFormVisible &&
                  <CourseForm
                    handleFormChangeCourseName={handleFormChangeCourseName}
                    formNumberOfHoles={formNumberOfHoles}
                    setFormNumberOfHoles={setFormNumberOfHoles}
                    formHolesData={formHolesData}
                    setFormHolesData={setFormHolesData}
                    handleFormChangeNumberOfHoles={handleFormChangeNumberOfHoles}
                    handleFormParYardsChange={handleFormParYardsChange}
                    handleFormSubmit={handleFormSubmit}
                    formSubmitting={formSubmitting}
                  />
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

export default Courses
