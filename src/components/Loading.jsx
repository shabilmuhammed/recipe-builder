import { useState, useEffect } from 'react'
import Icon from './Icon'

const MSGS = [
  'Rummaging through your pantry…',
  'Balancing Kerala & Western flavours…',
  'Preheating the air fryer…',
  'Keeping it easy and healthy…',
  'Plating up your top 5…',
]

export default function Loading() {
  const [i, setI] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setI((x) => (x + 1) % MSGS.length), 1800)
    return () => clearInterval(t)
  }, [])
  return (
    <div className="loading">
      <div className="pot">
        <Icon name="chef" size={42} stroke={2} />
      </div>
      <div>
        <h3>Cooking up ideas…</h3>
        <p>{MSGS[i]}</p>
      </div>
      <div className="dots" aria-hidden="true">
        <i></i>
        <i></i>
        <i></i>
      </div>
    </div>
  )
}
