import { ChangeEvent, FormEvent, useRef, useState } from 'react'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'
import { IHoleData } from '../../ts/interfaces'
import './courseForm.scss'

const CourseForm = () => {
  const courseNameInput = useRef<HTMLInputElement | null>(null)
  const [numberOfHoles, setNumberOfHoles] = useState(0)
  const [holesData, setHolesData] = useState<IHoleData[]>([])

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const data = {
      action: 'PUT',
      type: 'courses',
      id: uuidv4(),
      name: courseNameInput.current?.value,
      holes: numberOfHoles,
      par: holesData.map(hole => hole.par).reduce((a, b) => a + b),
      yards: holesData.map(hole => hole.yards).reduce((a, b) => a + b),
      holesData: JSON.stringify(holesData)
    }

    await axios({
      method: 'POST',
      url: `${process.env.REACT_APP_API_GATEWAY}/data`,
      headers: {
        'x-api-key': `${process.env.REACT_APP_COURSES_API_KEY}`
      },
      data
    })
  }

  const handleChangeNumberOfHoles = (event: ChangeEvent<HTMLInputElement>) => {
    const array = [...Array(+event.target.value).keys()].map(key => ++key)
    const startingHolesObject = array.map((holeNumber) => {
      return {
        hole: holeNumber,
        par: 0,
        yards: 0
      }
    })

    setHolesData(startingHolesObject)
    setNumberOfHoles(+event.target.value)
    return
  }

  const handleParYardsChange = (e: any) => {
    const changedHole: number = +e.target.getAttribute('data-hole')
    const changedKey: keyof IHoleData = e.target.getAttribute('data-key')
    const newValue: number = +e.target.value
    const existingObject: IHoleData | undefined = holesData.find((object) => object.hole === changedHole)
    if (existingObject) {
      existingObject[changedKey] = newValue
      setHolesData(holesData)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor='courseName'>Course Name</label>
      <input
        type='text'
        id='courseName'
        ref={courseNameInput}
      />

      <label htmlFor='number'>Number of Holes</label>
      <input
        type='number'
        id='number'
        onChange={handleChangeNumberOfHoles}
      />

      {
        Array(numberOfHoles).fill(true).map((_, i) => {
          i++

          return (
            <div key={`hole${i}Container`}>
              <span>Hole {i}</span>

              <label htmlFor={`hole${i}Par`}>Par</label>
              <input
                type='number'
                key={`hole${i}ParInput`}
                id={`hole${i}Par`}
                data-hole={i}
                data-key='par'
                onChange={handleParYardsChange}
              />

              <label htmlFor={`hole${i}Yards`}>Yards</label>
              <input
                type='number'
                key={`hole${i}YardsInput`}
                id={`hole${i}Yards`}
                data-hole={i}
                data-key='yards'
                onChange={handleParYardsChange}
              />
            </div>
          )
        })
      }

      <button type='submit'>Submit</button>
    </form>
  )
}

export default CourseForm
