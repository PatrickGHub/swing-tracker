import { ChangeEvent, useEffect, useState } from 'react'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'
import { ICourseData, IHoleData, IHoleRoundData } from '../../ts/interfaces'
import Loader from '../Loader'
import './roundForm.scss'

interface IRoundFormProps {
  courses: ICourseData[],
  selectedCourseName: string | null
}

const RoundForm = ({ courses, selectedCourseName }: IRoundFormProps) => {
  const [selectedCourse, setSelectedCourse] = useState<ICourseData | undefined>()
  const [holesData, setHolesData] = useState<IHoleRoundData[]>([])

  const handleSubmit = async (event: any) => {
    event.preventDefault()

    const score = holesData.map(hole => hole.shots).reduce((a, b) => a + b)

    const data = {
      action: 'PUT',
      type: 'rounds',
      id: uuidv4(),
      course: selectedCourse?.name,
      par: selectedCourse?.par,
      score,
      holes: selectedCourse?.holes,
      holesData: JSON.stringify(holesData)
    }
    
    console.log(JSON.stringify(data, null, 2))

    await axios({
      method: 'POST',
      url: `${process.env.REACT_APP_API_GATEWAY}/data`,
      headers: {
        'x-api-key': `${process.env.REACT_APP_COURSES_API_KEY}`
      },
      data
    })
  }

  const handleCourseSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedCourse(courses.find((course) => course.name === event.target.value))
  }

  const handleHolesDataChange = (e: any) => {
    const hole = e.target.getAttribute('data-hole')
    const par = e.target.getAttribute('data-par')
    const shots = e.target.value

    const existingObject = holesData.find((object) => object.hole === hole)

    if (!existingObject) {
      setHolesData([...holesData, {
        hole,
        par: Number(par),
        shots: Number(shots)
      }])
    } else {
      existingObject.shots = shots
      setHolesData(holesData)
    }
  }

  useEffect(() => {
    if (selectedCourseName) {
      setSelectedCourse(courses.find((course) => course.name === selectedCourseName))
    }
  }, [selectedCourseName, courses])

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
              defaultValue={selectedCourseName || 'Select a course'}
            >
              <option disabled>Select a course</option>
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
                      data-hole={hole.hole}
                      data-par={hole.par}
                      onChange={handleHolesDataChange}
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
