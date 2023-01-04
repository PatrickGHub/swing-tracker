import { clsx } from 'clsx'
import '../../scss/card.scss'
import { IRoundData } from '../../ts/interfaces'

interface IRoundCardProps {
  round: IRoundData
  handleRoundSelect: any
  selected: any
}

const RoundCard = ({ round, handleRoundSelect, selected }: IRoundCardProps) => (
  <div
    className={clsx(
      'card',
      selected ? 'selected': null
    )}
    data-roundid={ round.id }
    onClick={(e) => handleRoundSelect(e) }
  >
    <p>Course: { round.course }</p>
    <p>Score: { round.score }</p>
  </div>
)

export default RoundCard
