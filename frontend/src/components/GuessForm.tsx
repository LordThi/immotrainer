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
    <form onSubmit={handleSubmit} style={{ marginTop: 16, display: 'flex', gap: 8 }}>
      <input
        type="number"
        placeholder="Votre estimation en €"
        value={value}
        onChange={e => setValue(e.target.value)}
        min={1}
        style={{
          flex: 1,
          padding: '10px 14px',
          fontSize: 16,
          border: '1px solid #ccc',
          borderRadius: 6,
        }}
      />
      <button
        type="submit"
        style={{
          padding: '10px 20px',
          background: '#2563eb',
          color: '#fff',
          border: 'none',
          borderRadius: 6,
          fontSize: 15,
          cursor: 'pointer',
        }}
      >
        Valider
      </button>
    </form>
  )
}
