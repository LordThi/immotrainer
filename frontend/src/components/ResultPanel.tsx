// @ts-ignore
import type { GuessResult } from '../App'

type Props = {
  result: GuessResult
  onNext: () => void
  isLast: boolean
}

export default function ResultPanel({ result, onNext, isLast }: Props) {
  const { actualPrice, deltaPercent, score } = result
  const deltaColor = deltaPercent < 10 ? 'var(--green)' : deltaPercent < 25 ? 'var(--orange)' : 'var(--red)'

  return (
    <div className="result-panel">
      <div className="result-grid">
        <div className="result-cell">
          <div className="result-cell-label">Prix réel</div>
          <div className="result-cell-value">{actualPrice.toLocaleString('fr-FR')} €</div>
        </div>
        <div className="result-cell">
          <div className="result-cell-label">Écart</div>
          <div className="result-cell-value" style={{ color: deltaColor }}>{deltaPercent} %</div>
        </div>
        <div className="result-cell">
          <div className="result-cell-label">Points</div>
          <div className="result-cell-value" style={{ color: 'var(--blue)' }}>+{score}</div>
        </div>
      </div>
      <button className="btn-blue" onClick={onNext}>
        {isLast ? 'Voir mon score final →' : 'Annonce suivante →'}
      </button>
    </div>
  )
}
