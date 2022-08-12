import { IHoleData } from '../../ts/interfaces'
import './holesCard.scss'

interface IHolesCardProps {
  holes: IHoleData[]
}

const HolesCard = ({ holes }: IHolesCardProps) => (
  <div className='holesCard'>
    {holes.map((hole) => (
      <div key={hole.hole} className='hole'>
        <span>Hole {hole.hole}</span>
        <span>Yards: {hole.yards}</span>
        <span>Par: {hole.par}</span>
      </div>
    ))}
  </div>
)

export default HolesCard
