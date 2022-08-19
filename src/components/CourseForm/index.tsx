import { useRef } from 'react'
import axios from 'axios'
import './courseForm.scss'

const CourseForm = () => {
  const courseNameInput = useRef<HTMLInputElement | null>(null)
  const holesInput = useRef<HTMLInputElement | null>(null)
  const parInput = useRef<HTMLInputElement | null>(null)

  const handleSubmit = async (event: any) => {
    event.preventDefault()

    const data = {
      action: 'PUT',
      name: courseNameInput.current?.value,
      holes: holesInput.current?.value,
      par: parInput.current?.value
    }

    await axios({
      method: 'POST',
      url: `${process.env.REACT_APP_API_GATEWAY}/courses`,
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
