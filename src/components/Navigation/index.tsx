import { Link } from 'react-router-dom'
import './navigation.scss'

const Navigation = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/courses'>Courses</Link>
        </li>
        <li>
          <Link to='/rounds'>Rounds</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navigation
