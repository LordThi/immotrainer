import { useEffect, useState } from 'react'
import { Badge, Container, ProgressBar } from 'react-bootstrap'
import MapView from './components/MapView'
import GuessForm from './components/GuessForm'
import ResultPanel from './components/ResultPanel'
import FinalScreen from './components/FinalScreen'

export type Listing = {
  id: number
  title: string
  city: string
  lat: number
  lng: number
  surfaceM2: number
  rooms: number | null
  imageUrl: string
  description: string | null
}

export type GuessResult = {
  actualPrice: number
  deltaPercent: number
  score: number
}

type Phase = 'loading' | 'guessing' | 'result' | 'finished'

export default function App() {
  const [listings, setListings] = useState<Listing[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [totalScore, setTotalScore] = useState(0)
  const [phase, setPhase] = useState<Phase>('loading')
  const [result, setResult] = useState<GuessResult | null>(null)
  const [descExpanded, setDescExpanded] = useState(false)

  const loadListings = async () => {
    setPhase('loading')
    setCurrentIndex(0)
    setTotalScore(0)
    setResult(null)
    const res = await fetch('/api/listings/random?count=5')
    const data = await res.json()
    setListings(data)
    setPhase('guessing')
  }

  useEffect(() => { loadListings() }, [])

  const handleGuess = async (guessPrice: number) => {
    const res = await fetch('/api/guess', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ listingId: listings[currentIndex].id, guessPrice }),
    })
    const data: GuessResult = await res.json()
    setResult(data)
    setTotalScore(prev => prev + data.score)
    setPhase('result')
  }

  const handleNext = () => {
    if (currentIndex + 1 >= listings.length) {
      setPhase('finished')
    } else {
      setCurrentIndex(prev => prev + 1)
      setResult(null)
      setDescExpanded(false)
      setPhase('guessing')
    }
  }

  if (phase === 'loading') {
    return (
      <Container className="text-center text-muted py-5">
        <p>Chargement des annonces…</p>
      </Container>
    )
  }

  if (phase === 'finished') {
    return <FinalScreen totalScore={totalScore} onReplay={loadListings} />
  }

  const listing = listings[currentIndex]
  const progress = (currentIndex / listings.length) * 100

  return (
    <div>
      <nav className="navbar bg-white border-bottom sticky-top mb-3">
        <Container>
          <span className="navbar-brand fw-bold text-primary mb-0">ImmoTrainer</span>
          <span className="text-muted small">
            Annonce <strong className="text-dark">{currentIndex + 1}</strong> / {listings.length}
            &nbsp;·&nbsp; Score : <strong className="text-dark">{totalScore}</strong>
          </span>
        </Container>
      </nav>

      <ProgressBar now={progress} style={{ height: 3, borderRadius: 0, marginBottom: 16 }} />

      <Container>
        <div className="card border shadow-sm overflow-hidden">
          <div style={{ position: 'relative' }}>
            <img className="listing-image" src={listing.imageUrl} alt={listing.title} />
            <Badge
              bg="dark"
              style={{ position: 'absolute', bottom: 12, left: 12, fontSize: 13, opacity: 0.85 }}
            >
              {listing.city}
            </Badge>
          </div>

          <div className="card-body border-bottom">
            <h2 className="h5 fw-bold mb-2">{listing.title}</h2>
            <div className="d-flex gap-2 flex-wrap mb-2">
              <Badge bg="secondary" className="fw-normal">{listing.surfaceM2} m²</Badge>
              {listing.rooms && <Badge bg="secondary" className="fw-normal">{listing.rooms} pièces</Badge>}
            </div>
            {listing.description && (
              <p className="text-muted small mb-0" style={{ lineHeight: 1.6 }}>
                {descExpanded ? listing.description : listing.description.slice(0, 280) + '…'}
                {' '}
                <button
                  onClick={() => setDescExpanded(v => !v)}
                  className="btn btn-link btn-sm p-0"
                  style={{ fontSize: 13 }}
                >
                  {descExpanded ? 'Réduire' : 'Lire la suite'}
                </button>
              </p>
            )}
          </div>

          <div className="map-wrap">
            <MapView lat={listing.lat} lng={listing.lng} />
          </div>

          {phase === 'guessing' && <GuessForm onSubmit={handleGuess} />}
          {phase === 'result' && result && (
            <ResultPanel result={result} onNext={handleNext} isLast={currentIndex + 1 >= listings.length} />
          )}
        </div>
      </Container>
    </div>
  )
}
