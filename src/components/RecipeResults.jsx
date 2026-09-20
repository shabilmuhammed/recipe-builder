import { useState } from 'react'
import RecipeCard from './RecipeCard'
import Icon from './Icon'

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
          <Icon name="back" size={22} />
        </button>
        <div className="t">
          <h1>Your Top {recipes.length}</h1>
          <p>
            An even mix of Kerala &amp; Western · {count} ingredient{count === 1 ? '' : 's'}
          </p>
        </div>
      </div>

      <div className="rfilter" role="tablist" aria-label="Filter by cuisine">
        {FILTERS.map((x) => (
          <button
            key={x.id}
            role="tab"
            aria-selected={x.id === f}
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
