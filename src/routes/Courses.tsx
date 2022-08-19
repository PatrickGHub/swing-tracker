import { SyntheticEvent, useEffect, useState } from 'react'
import axios from 'axios'
import { ICourseData } from '../ts/interfaces'
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
    <div className='coursesRoute'>
      <div>
        {courses && courses.map((course: ICourseData) => (
          <CourseCard
            key={course.name}
            course={course}
            handleCourseSelect={handleCourseSelect}
            selected={selectedCourse?.name === course.name}
          />
        ))}
      </div>

      {
        selectedCourse &&
        <HolesCard holes={selectedCourse.holesData} />
      }
    </div>
  )
}

export default Courses
