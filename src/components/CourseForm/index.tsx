import { ChangeEvent } from 'react'
import { IHoleData } from '../../ts/interfaces'
import './courseForm.scss'

interface ICourseFormProps {
  handleFormChangeCourseName: (event: ChangeEvent<HTMLInputElement>) => void
  formNumberOfHoles: number
  setFormNumberOfHoles: (value: number) => void
  formHolesData: IHoleData[]
  setFormHolesData: (value: IHoleData[]) => void
  handleFormChangeNumberOfHoles: (e: any) => void
  handleFormParYardsChange: (e: any) => void
  handleFormSubmit: (e: any) => void
}

const CourseForm = ({
  handleFormChangeCourseName, 
  formNumberOfHoles, 
  handleFormChangeNumberOfHoles,
  handleFormParYardsChange,
  handleFormSubmit
}: ICourseFormProps) => (
  <form onSubmit={handleFormSubmit}>
    <label htmlFor='courseName'>Course Name</label>
    <input
      type='text'
      id='courseName'
      onChange={handleFormChangeCourseName}
    />

    <label htmlFor='number'>Number of Holes</label>
    <input
      type='number'
      id='number'
      onChange={handleFormChangeNumberOfHoles}
    />

    {
      Array(formNumberOfHoles).fill(true).map((_, i) => {
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
              onChange={handleFormParYardsChange}
            />

            <label htmlFor={`hole${i}Yards`}>Yards</label>
            <input
              type='number'
              key={`hole${i}YardsInput`}
              id={`hole${i}Yards`}
              data-hole={i}
              data-key='yards'
              onChange={handleFormParYardsChange}
            />
          </div>
        )
      })
    }

    <button type='submit'>Submit</button>
  </form>
)

export default CourseForm
