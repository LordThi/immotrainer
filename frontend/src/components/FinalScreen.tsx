import { Button, Container } from 'react-bootstrap'

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
    <Container className="text-center py-5">
      <p className="text-muted text-uppercase small mb-2" style={{ letterSpacing: 1 }}>Score final</p>
      <div className="display-1 fw-black text-primary mb-1">{totalScore}</div>
      <p className="text-muted mb-4">/ {max} points — {mention}</p>
      <Button className="btn-orange px-5 py-3" style={{ borderRadius: 8, fontSize: 16 }} onClick={onReplay}>
        Rejouer une partie
      </Button>
    </Container>
  )
}
