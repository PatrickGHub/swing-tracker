import { SyntheticEvent, useEffect, useState } from 'react'
import axios from 'axios'
import { ICourseData } from '../ts/interfaces'
import Loader from '../components/Loader'
import CourseCard from '../components/CourseCard'
import HolesCard from '../components/HolesCard'
import '../scss/courses.scss'

const Courses = () => {
  const [selectedCourse, setSelectedCourse] = useState<ICourseData | null>()
  const [courses, setCourses] = useState<ICourseData[]>([])

  const handleCourseSelect = (event: SyntheticEvent<HTMLButtonElement>) => {
    const clickedCourseName = event.currentTarget.getAttribute('data-coursename')
    setSelectedCourse(courses.find((course) => course.name === clickedCourseName))
  }

  useEffect(() => {
    const getAllCourses = async () => {
      const allCourses = await axios({
        method: 'POST',
        url: `${process.env.REACT_APP_API_GATEWAY}/courses`,
        data: {
          action: 'GET_ALL'
        }
      })

      setCourses(allCourses.data.Items)
    }

    getAllCourses()
  }, [])

  return (
    <>
      {
        courses.length > 0 ?
          (
            <div className='coursesRoute'>
              {(courses.map((course: ICourseData) => (
                <CourseCard
                  key={course.name}
                  course={course}
                  handleCourseSelect={handleCourseSelect}
                  selected={selectedCourse?.name === course.name}
                />
              )))}
              {
                selectedCourse &&
                <HolesCard holes={selectedCourse.holesData} />
              }
            </div>
          )
        :
          <Loader />
      }
    </>
  )
}

export default Courses
