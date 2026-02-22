import { useState } from 'react'

type Props = {
  onSubmit: (price: number) => void
}

export default function GuessForm({ onSubmit }: Props) {
  const [value, setValue] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const price = parseInt(value.replace(/\s/g, ''), 10)
    if (!price || price <= 0) return
    onSubmit(price)
  }

  return (
    <form onSubmit={handleSubmit} className="guess-form">
      <label className="guess-label">Quel est le prix de ce bien selon vous ?</label>
      <div className="guess-row">
        <span className="guess-prefix">€</span>
        <input
          className="guess-input"
          type="number"
          placeholder="Ex : 250000"
          value={value}
          onChange={e => setValue(e.target.value)}
          min={1}
          autoFocus
        />
        <button type="submit" className="btn-orange">Valider</button>
      </div>
    </form>
  )
}