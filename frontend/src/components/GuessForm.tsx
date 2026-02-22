import { useState } from 'react'
import { Button, Form, InputGroup } from 'react-bootstrap'

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
    <Form onSubmit={handleSubmit} className="p-3 border-top">
      <Form.Label className="fw-semibold mb-2">
        Quel est le prix de ce bien selon vous ?
      </Form.Label>
      <InputGroup>
        <span className="guess-prefix">€</span>
        <Form.Control
          type="number"
          placeholder="Ex : 250 000"
          value={value}
          onChange={e => setValue(e.target.value)}
          min={1}
          autoFocus
          style={{ borderLeft: 'none', borderRadius: '0 6px 6px 0' }}
        />
        <Button type="submit" className="btn-orange ms-2" style={{ borderRadius: 6 }}>
          Valider
        </Button>
      </InputGroup>
    </Form>
  )
}
