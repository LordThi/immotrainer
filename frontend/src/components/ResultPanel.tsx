// @ts-ignore
import type { GuessResult } from '../App'

type Props = {
  result: GuessResult
  onNext: () => void
  isLast: boolean
}

export default function ResultPanel({ result, onNext, isLast }: Props) {
  const { actualPrice, deltaPercent, score } = result

  return (
    <div style={{
      marginTop: 16,
      padding: 20,
      background: '#fff',
      borderRadius: 8,
      border: '1px solid #e5e5e5',
    }}>
      <p style={{ fontSize: 14, color: '#666', marginBottom: 4 }}>Prix réel</p>
      <p style={{ fontSize: 28, fontWeight: 700, marginBottom: 12 }}>
        {actualPrice.toLocaleString('fr-FR')} €
      </p>

      <p style={{ fontSize: 14, color: '#666', marginBottom: 4 }}>Écart</p>
      <p style={{ fontSize: 20, fontWeight: 600, color: deltaPercent < 10 ? '#16a34a' : '#dc2626', marginBottom: 12 }}>
        {deltaPercent} %
      </p>

      <p style={{ fontSize: 14, color: '#666', marginBottom: 4 }}>Points gagnés</p>
      <p style={{ fontSize: 24, fontWeight: 700, color: '#2563eb', marginBottom: 20 }}>
        + {score}
      </p>

      <button
        onClick={onNext}
        style={{
          width: '100%',
          padding: '12px',
          background: '#1a1a1a',
          color: '#fff',
          border: 'none',
          borderRadius: 6,
          fontSize: 15,
          cursor: 'pointer',
        }}
      >
        {isLast ? 'Voir mon score final' : 'Annonce suivante →'}
      </button>
    </div>
  )
}
