import { SyntheticEvent, useEffect, useState } from 'react'
import { ICourseData } from '../ts/interfaces'
import { getAllCourses } from '../utils/apiGateway'
import Loader from '../components/Loader'
import CourseCard from '../components/CourseCard'
import CourseForm from '../components/CourseForm'
import HolesCard from '../components/HolesCard'
import '../scss/courses.scss'

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
      const allCourses = await getAllCourses()
      setCourses(allCourses.data.Items)
    }

    fetchCourseData()
  }, [])

  // useEffect(() => {
  //   setCourses([
  //     {
  //       name: 'Course 1',
  //       holes: 9,
  //       par: 27,
  //       yards: 1100,
  //       holesData: [
  //         {
  //           hole: 1,
  //           yards: 101,
  //           par: 3
  //         },
  //         {
  //           hole: 2,
  //           yards: 102,
  //           par: 3
  //         },
  //         {
  //           hole: 3,
  //           yards: 103,
  //           par: 3
  //         },
  //         {
  //           hole: 4,
  //           yards: 104,
  //           par: 3
  //         },
  //         {
  //           hole: 5,
  //           yards: 105,
  //           par: 3
  //         },
  //         {
  //           hole: 6,
  //           yards: 106,
  //           par: 3
  //         },
  //         {
  //           hole: 7,
  //           yards: 107,
  //           par: 3
  //         },
  //         {
  //           hole: 8,
  //           yards: 108,
  //           par: 3
  //         },
  //         {
  //           hole: 9,
  //           yards: 109,
  //           par: 3
  //         },
  //       ]
  //     },
  //     {
  //       name: 'Course 2',
  //       holes: 9,
  //       par: 27,
  //       yards: 1200,
  //       holesData: [
  //         {
  //           hole: 1,
  //           yards: 101,
  //           par: 3
  //         },
  //         {
  //           hole: 2,
  //           yards: 102,
  //           par: 3
  //         },
  //         {
  //           hole: 3,
  //           yards: 103,
  //           par: 3
  //         },
  //         {
  //           hole: 4,
  //           yards: 104,
  //           par: 3
  //         },
  //         {
  //           hole: 5,
  //           yards: 105,
  //           par: 3
  //         },
  //         {
  //           hole: 6,
  //           yards: 106,
  //           par: 3
  //         },
  //         {
  //           hole: 7,
  //           yards: 107,
  //           par: 3
  //         },
  //         {
  //           hole: 8,
  //           yards: 108,
  //           par: 3
  //         },
  //         {
  //           hole: 9,
  //           yards: 109,
  //           par: 3
  //         },
  //       ]
  //     }
  //   ])
  // }, [])

  return (
    <>
      {
        courses.length > 0 ?
          (
            <div className='coursesRoute'>
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
                  <HolesCard holes={selectedCourse.holesData} />
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
