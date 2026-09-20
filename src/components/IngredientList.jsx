import IngredientItem from './IngredientItem'

export default function IngredientList({ items, isSelected, onToggle, query, onAddCustom }) {
  if (items.length === 0) {
    const q = query.trim()
    return (
      <div className="list">
        {q ? (
          <div className="item">
            <div className="av">➕</div>
            <div className="meta">
              <div className="n">Add “{q}”</div>
              <div className="s">Not in the list? Add it anyway</div>
            </div>
            <button className="add" onClick={() => onAddCustom(q)} aria-label={`Add ${q}`}>
              +
            </button>
          </div>
        ) : (
          <div className="empty-hint">Nothing here yet.</div>
        )}
      </div>
    )
  }
  return (
    <div className="list">
      {items.map((i) => (
        <IngredientItem key={i.id} item={i} selected={isSelected(i.id)} onToggle={onToggle} />
      ))}
    </div>
  )
}
