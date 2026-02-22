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

  useEffect(() => {
    loadListings()
  }, [])

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
    return <p style={{ padding: 24 }}>Chargement...</p>
  }

  if (phase === 'finished') {
    return <FinalScreen totalScore={totalScore} onReplay={loadListings} />
  }

  const listing = listings[currentIndex]

  return (
    <div>
      <header style={{ marginBottom: 16 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700 }}>ImmoTrainer</h1>
        <p style={{ color: '#666', fontSize: 14 }}>
          Annonce {currentIndex + 1} / {listings.length} — Score : {totalScore}
        </p>
      </header>

      <img
        src={listing.imageUrl}
        alt={listing.title}
        style={{ width: '100%', height: 240, objectFit: 'cover', borderRadius: 8, marginBottom: 12 }}
      />

      <div style={{ marginBottom: 12 }}>
        <h2 style={{ fontSize: 18 }}>{listing.title}</h2>
        <p style={{ color: '#555', marginBottom: 6 }}>
          {listing.city} · {listing.surfaceM2} m²{listing.rooms ? ` · ${listing.rooms} pièces` : ''}
        </p>
        {listing.description && (
          <p style={{ fontSize: 13, color: '#777', lineHeight: 1.5 }}>
            {listing.description.slice(0, 300)}…
          </p>
        )}
      </div>

      <MapView lat={listing.lat} lng={listing.lng} />

      {phase === 'guessing' && <GuessForm onSubmit={handleGuess} />}
      {phase === 'result' && result && (
        <ResultPanel result={result} onNext={handleNext} isLast={currentIndex + 1 >= listings.length} />
      )}
    </div>
  )
}
