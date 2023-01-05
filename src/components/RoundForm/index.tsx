import { useRef, useState } from 'react'
import { ICourseData, IHoleData } from '../../ts/interfaces'
import Loader from '../Loader'
import './roundForm.scss'

interface IRoundFormProps {
  courses: ICourseData[]
}

const RoundForm = ({courses}: IRoundFormProps) => {
  const [selectedCourse, setSelectedCourse] = useState<ICourseData | undefined>()
  const courseNameInput = useRef<HTMLInputElement | null>(null)
  const holesInput = useRef<HTMLInputElement | null >(null)
  const courseInput = useRef<HTMLInputElement | null>(null)

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
    <>
      {
        courses.length > 0 ? 
        (
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
      :
        <Loader />
    }
  </>
  )
}

export default RoundForm


// [
//   (
//     { hole: 1, yards: null, par: null },
//     { hole: 2, yards: null, par: null },
//     { hole: 3, yards: null, par: null },
//     { hole: 4, yards: null, par: null },
//     { hole: 5, yards: null, par: null },
//     { hole: 6, yards: null, par: null },
//     { hole: 7, yards: null, par: null },
//     { hole: 8, yards: null, par: null },
//     { hole: 9, yards: null, par: null },
//     { hole: 10, yards: null, par: null },
//     { hole: 11, yards: null, par: null },
//     { hole: 12, yards: null, par: null },
//     { hole: 13, yards: null, par: null },
//     { hole: 14, yards: null, par: null },
//     { hole: 15, yards: null, par: null },
//     { hole: 16, yards: null, par: null },
//     { hole: 17, yards: null, par: null },
//     { hole: 18, yards: null, par: null }
//   )
// ]