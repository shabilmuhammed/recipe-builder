export default function CategoryTiles({ categories, active, onChange }) {
  return (
    <div className="cats">
      {categories.map((c) => (
        <button
          key={c.id}
          className={'cat' + (c.id === active ? ' active' : '')}
          onClick={() => onChange(c.id)}
        >
          <span className="e">{c.emoji}</span>
          {c.label}
        </button>
      ))}
    </div>
  )
}
