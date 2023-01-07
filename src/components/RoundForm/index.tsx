import DatePicker from 'react-datepicker'
import { ICourseData, IHoleData } from '../../ts/interfaces'
import Loader from '../Loader'
import 'react-datepicker/dist/react-datepicker.css'
import './roundForm.scss'

interface IRoundFormProps {
  courses: ICourseData[],
  selectedCourseName: string | null
  selectedFormCourse: ICourseData | undefined
  handleFormCourseSelect: any
  handleFormHolesDataChange: any
  formRoundPlayedDate: Date
  setFormRoundPlayedDate: any
  handleFormSubmit: any
}

const RoundForm = ({
  courses,
  selectedCourseName,
  selectedFormCourse,
  handleFormCourseSelect,
  handleFormHolesDataChange,
  formRoundPlayedDate,
  setFormRoundPlayedDate,
  handleFormSubmit
}: IRoundFormProps) => {

  return (
    <>
      {
        courses.length > 0 ? 
        (
          <form onSubmit={handleFormSubmit}>
            <fieldset>
              <label htmlFor='course'>Course</label>
              <select
                id='course'
                onChange={handleFormCourseSelect}
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

              <label>Date Played</label>
              <DatePicker
                dateFormat='dd/MM/yyyy'
                selected={formRoundPlayedDate}
                onChange={(date: Date) => setFormRoundPlayedDate(date)}
              />

              {
                selectedFormCourse &&
                JSON.parse(selectedFormCourse.holesData).map((hole: IHoleData) => {
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
                        onChange={handleFormHolesDataChange}
                      />
                    </div>
                  )
                })
              }

              <button type='submit'>Submit</button>
            </fieldset>
          </form>
        )
      :
        <Loader />
    }
  </>
  )
}

export default RoundForm
