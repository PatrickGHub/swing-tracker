import { ICourseData } from '../../ts/interfaces'
import './courseCard.scss'

interface ICourseCardProps {
  course: ICourseData
}

const CourseCard = ({ course }: ICourseCardProps) => (
  <div className='courseCard'>
    <div>{ course.name }</div>
    <div>{ course.holes } holes</div>
    <div>Par: { course.par }</div>
  </div>
)

export default CourseCard
