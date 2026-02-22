import { useEffect, useState } from 'react'
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
      setPhase('guessing')
    }
  }

  if (phase === 'loading') {
    return <div className="loading">Chargement des annonces…</div>
  }

  if (phase === 'finished') {
    return <FinalScreen totalScore={totalScore} onReplay={loadListings} />
  }

  const listing = listings[currentIndex]
  const progress = ((currentIndex) / listings.length) * 100

  return (
    <div>
      <header className="header">
        <span className="header-logo">ImmoTrainer</span>
        <span className="header-score">
          Annonce <strong>{currentIndex + 1}</strong> / {listings.length} &nbsp;·&nbsp; Score : <strong>{totalScore}</strong>
        </span>
      </header>

      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>

      <div className="card">
        <div className="listing-image-wrap">
          <img className="listing-image" src={listing.imageUrl} alt={listing.title} />
          <span className="listing-badge">{listing.city}</span>
        </div>

        <div className="listing-info">
          <h2 className="listing-title">{listing.title}</h2>
          <div className="listing-tags">
            <span className="tag">{listing.surfaceM2} m²</span>
            {listing.rooms && <span className="tag">{listing.rooms} pièces</span>}
          </div>
          {listing.description && (
            <p className="listing-description">{listing.description.slice(0, 280)}…</p>
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
    </div>
  )
}