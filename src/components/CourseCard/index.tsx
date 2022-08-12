import { ICourseData } from '../../ts/interfaces'
import './courseCard.scss'

interface ICourseCardProps {
  course: ICourseData,
  handleCourseSelect: Function
}

const CourseCard = ({ course, handleCourseSelect }: ICourseCardProps) => (
  <div className='courseCard' data-coursename={ course.name } onClick={(e) => handleCourseSelect(e) }>
    <div>{ course.name }</div>
    <div>{ course.holes } holes</div>
    <div>Par: { course.par }</div>
  </div>
)

export default CourseCard
