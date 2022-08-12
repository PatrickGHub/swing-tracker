import { clsx } from 'clsx'
import { ICourseData } from '../../ts/interfaces'
import './courseCard.scss'

interface ICourseCardProps {
  course: ICourseData,
  handleCourseSelect: Function,
  selected: boolean
}

const CourseCard = ({ course, handleCourseSelect, selected }: ICourseCardProps) => (
  <div
    className={clsx(
      'courseCard',
      selected ? 'selected': null
    )}
    data-coursename={ course.name }
    onClick={(e) => handleCourseSelect(e) }
  >
    <div>{ course.name }</div>
    <div>{ course.holes } holes</div>
    <div>Par: { course.par }</div>
  </div>
)

export default CourseCard
