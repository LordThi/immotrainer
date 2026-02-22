type Props = {
  totalScore: number
  onReplay: () => void
}

export default function FinalScreen({ totalScore, onReplay }: Props) {
  const max = 5000

  return (
    <div style={{ textAlign: 'center', paddingTop: 60 }}>
      <h1 style={{ fontSize: 28, marginBottom: 8 }}>Partie terminée !</h1>
      <p style={{ color: '#666', marginBottom: 32 }}>Voici votre score final</p>

      <p style={{ fontSize: 64, fontWeight: 800, color: '#2563eb', marginBottom: 8 }}>
        {totalScore}
      </p>
      <p style={{ color: '#999', marginBottom: 48 }}>/ {max} points</p>

      <button
        onClick={onReplay}
        style={{
          padding: '14px 32px',
          background: '#2563eb',
          color: '#fff',
          border: 'none',
          borderRadius: 8,
          fontSize: 16,
          cursor: 'pointer',
        }}
      >
        Rejouer
      </button>
    </div>
  )
}
