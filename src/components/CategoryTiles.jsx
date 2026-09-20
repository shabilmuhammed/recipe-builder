export default function CategoryTiles({ categories, active, onChange }) {
  return (
    <div className="cats" role="tablist" aria-label="Ingredient categories">
      {categories.map((c) => (
        <button
          key={c.id}
          role="tab"
          aria-selected={c.id === active}
          className={'cat' + (c.id === active ? ' active' : '')}
          onClick={() => onChange(c.id)}
        >
          <span className="e" aria-hidden="true">
            {c.emoji}
          </span>
          {c.label}
        </button>
      ))}
    </div>
  )
}
