import { useSearchParams } from 'react-router-dom'

const Rounds = () => {
  const [searchParams] = useSearchParams()
  const course = searchParams.get('course')

  return (
    <div>
      <p>Rounds played</p>
      <p>{ course || 'All courses' }</p>
    </div>
  )
}

export default Rounds
