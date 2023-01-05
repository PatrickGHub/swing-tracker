import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { ICourseData, IHoleData } from '../../ts/interfaces'
import './roundForm.scss'

const RoundForm = () => {
  const [courses, setCourses] = useState<ICourseData[]>([])
  const [selectedCourse, setSelectedCourse] = useState<ICourseData | undefined>()
  const courseNameInput = useRef<HTMLInputElement | null>(null)
  const holesInput = useRef<HTMLInputElement | null >(null)
  const courseInput = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    const getAllCourses = async () => {
      const allCourses = await axios({
        method: 'POST',
        url: `${process.env.REACT_APP_API_GATEWAY}/data`,
        headers: {
          'x-api-key': `${process.env.REACT_APP_COURSES_API_KEY}`
        },
        data: {
          action: 'GET_ALL',
          type: 'courses'
        }
      })

      setCourses(allCourses.data.Items)
    }

    getAllCourses()
  }, [])

  const handleSubmit = async (event: any) => {
    event.preventDefault()

  //   const data = {
  //     action: 'PUT',
  //     type: 'rounds',
  //     name: courseNameInput.current?.value,
  //     holes: Number(holesInput.current?.value),
  //     par: Number(parInput.current?.value),
  //     yards: null,
  //     holesData: JSON.stringify([...Array(Number(holesInput.current?.value))].map((_, i) => (
  //       {
  //         hole: i + 1,
  //         yards: null,
  //         par: null
  //       }
  //     )))
  //   }

  //   await axios({
  //     method: 'POST',
  //     url: `${process.env.REACT_APP_API_GATEWAY}/data`,
  //     headers: {
  //       'x-api-key': `${process.env.REACT_APP_COURSES_API_KEY}`
  //     },
  //     data
  //   })
  }

  const handleCourseSelect = (e: any) => {
    setSelectedCourse(courses.find((course) => course.name === e.target.value))
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor='course'>Course</label>
      <select
        id='course'
        onChange={handleCourseSelect}
      >
        {courses.map((course) => (
          <option
            key={course.name}
            value={course.name}
          >
            {course.name}
          </option>
        ))}
      </select>

      {
        selectedCourse &&
        JSON.parse(selectedCourse.holesData).map((hole: IHoleData) => {
          return (
            <div key={`hole${hole.hole}Container`}>
              <label
                key={`hole${hole.hole}Label`}
                htmlFor={`hole${hole.hole}`}
              >
                Hole {hole.hole}
              </label>
              <input
                type="number"
                key={`hole${hole.hole}Input`}
                id={`hole${hole.hole}`}
              />
            </div>
          )
        })
      }

      <button type='submit'>Submit</button>
    </form>
  )
}

export default RoundForm
