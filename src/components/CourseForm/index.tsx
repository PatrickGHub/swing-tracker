import { FormEvent, useRef } from 'react'
import axios from 'axios'
import './courseForm.scss'

const CourseForm = () => {
  const courseNameInput = useRef<HTMLInputElement | null>(null)
  const holesInput = useRef<HTMLInputElement | null >(null)
  const parInput = useRef<HTMLInputElement | null>(null)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const data = {
      action: 'PUT',
      type: 'courses',
      name: courseNameInput.current?.value,
      holes: Number(holesInput.current?.value),
      par: Number(parInput.current?.value),
      yards: null,
      holesData: JSON.stringify([...Array(Number(holesInput.current?.value))].map((_, i) => (
        {
          hole: i + 1,
          yards: null,
          par: null
        }
      )))
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

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor='courseName'>Course Name</label>
      <input
        type='text'
        id='courseName'
        ref={courseNameInput}
      />

      <label htmlFor='holes'>Number of Holes</label>
      <input
        type='number'
        id='holes'
        ref={holesInput}
      />

      <label htmlFor='par'>Par</label>
      <input
        type='number'
        id='par'
        ref={parInput}
      />

      <button type='submit'>Submit</button>
    </form>
  )
}

export default CourseForm
