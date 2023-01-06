import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from "@fortawesome/free-solid-svg-icons"
import { clsx } from 'clsx'
import { IRoundData } from '../../ts/interfaces'
import '../../scss/card.scss'

interface IRoundCardProps {
  round: IRoundData
  handleRoundSelect: any
  selected: boolean
  handleDeleteRound: any
}

const RoundCard = ({ round, handleRoundSelect, selected, handleDeleteRound }: IRoundCardProps) => (
  <div
    className={clsx(
      'card',
      selected ? 'selected': null
    )}
    data-roundid={ round.id }
    onClick={(e) => handleRoundSelect(e) }
  >
    <p>Course: { round.course }</p>
    <p>Date: { new Date(round.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) }</p>
    <p>Score: { round.score }</p>
    <p onClick={() => handleDeleteRound(round.id)}>
      <FontAwesomeIcon icon={faTrashCan} />
    </p>
  </div>
)

export default RoundCard
