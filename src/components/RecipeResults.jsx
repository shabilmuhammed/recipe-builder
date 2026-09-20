import { useState } from 'react'
import RecipeCard from './RecipeCard'

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'ind', label: '🌴 Indian' },
  { id: 'west', label: '🌎 Western' },
]

const group = (cuisine) => (cuisine === 'Western' ? 'west' : 'ind')

export default function RecipeResults({ recipes, count, onBack }) {
  const [f, setF] = useState('all')
  const shown = f === 'all' ? recipes : recipes.filter((r) => group(r.cuisine) === f)

  return (
    <div className="results">
      <div className="rhead">
        <button className="back" onClick={onBack} aria-label="Back to ingredients">
          ←
        </button>
        <div className="t">
          <h2>Your Top {recipes.length}</h2>
          <p>
            An even mix of Kerala &amp; Western · {count} ingredient{count === 1 ? '' : 's'}
          </p>
        </div>
      </div>

      <div className="rfilter">
        {FILTERS.map((x) => (
          <button
            key={x.id}
            className={'cat' + (x.id === f ? ' active' : '')}
            onClick={() => setF(x.id)}
          >
            {x.label}
          </button>
        ))}
      </div>

      <div className="rlist">
        {shown.map((r) => (
          <RecipeCard key={recipes.indexOf(r)} recipe={r} rank={recipes.indexOf(r) + 1} />
        ))}
        {shown.length === 0 && (
          <div className="empty-hint">No {f === 'west' ? 'Western' : 'Indian'} recipes this time.</div>
        )}
      </div>
    </div>
  )
}
