import { SyntheticEvent, useState } from 'react'
import { ICourseData } from '../ts/interfaces'
import CourseCard from '../components/CourseCard'
import HolesCard from '../components/HolesCard'
import '../scss/courses.scss'

const Courses = () => {
  const [selectedCourse, setSelectedCourse] = useState<ICourseData | null>()

  const handleCourseSelect = (event: SyntheticEvent<HTMLButtonElement>) => {
    const clickedCourseName = event.currentTarget.getAttribute('data-coursename')
    setSelectedCourse(coursesData.find((course) => course.name === clickedCourseName))
  }

  const coursesData = [
    {
      name: 'Course 1',
      holes: 9,
      par: 27,
      yards: 1100,
      holesData: [
        {
          hole: 1,
          yards: 101,
          par: 3
        },
        {
          hole: 2,
          yards: 102,
          par: 3
        },
        {
          hole: 3,
          yards: 103,
          par: 3
        },
        {
          hole: 4,
          yards: 104,
          par: 3
        },
        {
          hole: 5,
          yards: 105,
          par: 3
        },
        {
          hole: 6,
          yards: 106,
          par: 3
        },
        {
          hole: 7,
          yards: 107,
          par: 3
        },
        {
          hole: 8,
          yards: 108,
          par: 3
        },
        {
          hole: 9,
          yards: 109,
          par: 3
        },
      ]
    },
    {
      name: 'Course 2',
      holes: 9,
      par: 27,
      yards: 1200,
      holesData: [
        {
          hole: 1,
          yards: 101,
          par: 3
        },
        {
          hole: 2,
          yards: 102,
          par: 3
        },
        {
          hole: 3,
          yards: 103,
          par: 3
        },
        {
          hole: 4,
          yards: 104,
          par: 3
        },
        {
          hole: 5,
          yards: 105,
          par: 3
        },
        {
          hole: 6,
          yards: 106,
          par: 3
        },
        {
          hole: 7,
          yards: 107,
          par: 3
        },
        {
          hole: 8,
          yards: 108,
          par: 3
        },
        {
          hole: 9,
          yards: 109,
          par: 3
        },
      ]
    }
  ]

  return (
    <div className='coursesRoute'>
      <div>
        {coursesData.map((course: ICourseData) => (
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
