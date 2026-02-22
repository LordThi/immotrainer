type Props = {
  totalScore: number
  onReplay: () => void
}

export default function FinalScreen({ totalScore, onReplay }: Props) {
  const max = 5000
  const percent = Math.round((totalScore / max) * 100)

  const mention =
    percent >= 90 ? 'Expert immobilier 🏆' :
    percent >= 70 ? 'Très bon œil !' :
    percent >= 50 ? 'Pas mal du tout' :
    'À améliorer'

  return (
    <div className="final-screen">
      <p style={{ fontSize: 14, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 1 }}>Score final</p>
      <div className="final-score">{totalScore}</div>
      <p className="final-max">/ {max} points — {mention}</p>
      <button className="btn-orange" onClick={onReplay}>Rejouer une partie</button>
    </div>
  )
}
