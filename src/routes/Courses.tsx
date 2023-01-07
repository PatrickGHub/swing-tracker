import { SyntheticEvent, useEffect, useState } from 'react'
import { ICourseData } from '../ts/interfaces'
import { getAllData } from '../utils/apiGateway'
import Loader from '../components/Loader'
import CourseCard from '../components/CourseCard'
import CourseForm from '../components/CourseForm'
import HolesCard from '../components/HolesCard'
// import '../scss/courses.scss'

const Courses = () => {
  const [courses, setCourses] = useState<ICourseData[]>([])
  const [selectedCourse, setSelectedCourse] = useState<ICourseData | null>()
  const [courseFormVisible, setcourseFormVisible] = useState<boolean>(false)

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

  useEffect(() => {
    const fetchCourseData = async() => {
      const allCourses = await getAllData('courses')
      setCourses(allCourses.data.Items.sort(
        (a: ICourseData, b: ICourseData) => a.name.localeCompare(b.name)
      ))
    }

    fetchCourseData()
  }, [])

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
                  <CourseForm />
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
