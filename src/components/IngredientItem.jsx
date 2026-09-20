export default function IngredientItem({ item, selected, onToggle }) {
  const sub = item.aliases && item.aliases[0]
  return (
    <div className={'item' + (selected ? ' added' : '')}>
      <div className="av">{item.emoji}</div>
      <div className="meta">
        <div className="n">{item.name}</div>
        {sub && <div className="s">{sub}</div>}
      </div>
      <button className="add" onClick={() => onToggle(item)} aria-label={selected ? `Remove ${item.name}` : `Add ${item.name}`}>
        {selected ? '✓' : '+'}
      </button>
    </div>
  )
}
