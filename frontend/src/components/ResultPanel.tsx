// @ts-ignore
import type { GuessResult } from '../App'
import { Button, Col, Row } from 'react-bootstrap'

type Props = {
  result: GuessResult
  onNext: () => void
  isLast: boolean
}

export default function ResultPanel({ result, onNext, isLast }: Props) {
  const { actualPrice, deltaPercent, score } = result

  const deltaVariant =
    deltaPercent < 10 ? 'success' :
    deltaPercent < 25 ? 'warning' :
    'danger'

  return (
    <div className="p-3 border-top">
      <Row className="g-2 mb-3">
        <Col>
          <div className="bg-light rounded p-3 text-center">
            <div className="text-muted small text-uppercase mb-1" style={{ letterSpacing: 0.5 }}>Prix réel</div>
            <div className="fw-bold fs-5">{actualPrice.toLocaleString('fr-FR')} €</div>
          </div>
        </Col>
        <Col>
          <div className="bg-light rounded p-3 text-center">
            <div className="text-muted small text-uppercase mb-1" style={{ letterSpacing: 0.5 }}>Écart</div>
            <div className={`fw-bold fs-5 text-${deltaVariant}`}>{deltaPercent} %</div>
          </div>
        </Col>
        <Col>
          <div className="bg-light rounded p-3 text-center">
            <div className="text-muted small text-uppercase mb-1" style={{ letterSpacing: 0.5 }}>Points</div>
            <div className="fw-bold fs-5 text-primary">+{score}</div>
          </div>
        </Col>
      </Row>
      <Button variant="primary" className="w-100" onClick={onNext}>
        {isLast ? 'Voir mon score final →' : 'Annonce suivante →'}
      </Button>
    </div>
  )
}
