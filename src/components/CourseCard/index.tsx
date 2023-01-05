import { clsx } from 'clsx'
import { Link } from 'react-router-dom'
import { ICourseData } from '../../ts/interfaces'
import '../../scss/card.scss'

interface ICourseCardProps {
  course: ICourseData,
  handleCourseSelect: Function,
  selected: boolean
}

const CourseCard = ({ course, handleCourseSelect, selected }: ICourseCardProps) => (
  <div
    className={clsx(
      'card',
      selected ? 'selected': null
    )}
    data-coursename={ course.name }
    onClick={(e) => handleCourseSelect(e) }
  >
    <p>{ course.name }</p>
    <p>{ course.holes } holes</p>
    <p>Par: { course.par }</p>
    <Link to={`/rounds?course=${course.name}`}>Rounds played</Link>
    <Link to={`/rounds?course=${course.name}&addRound=true`}>Add round</Link>
  </div>
)

export default CourseCard
