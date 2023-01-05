import { IHoleData, IHoleRoundData } from '../../ts/interfaces'
import './holesCard.scss'

interface IHolesCardProps {
  holes: string
  existingRound: boolean
}

const HolesCard = ({ holes, existingRound }: IHolesCardProps) => (
  <div className='holesCard'>
    {JSON.parse(holes).map((hole: any) => (
      <div key={hole.hole} className='hole'>
        <span>Hole {hole.hole}</span>
        {existingRound ? <span>Shots: {hole.shots}</span> : <span>Yards: {hole.yards}</span> }
        <span>Par: {hole.par}</span>
      </div>
    ))}
  </div>
)
export default HolesCard
