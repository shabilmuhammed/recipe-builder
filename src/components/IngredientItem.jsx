import Icon from './Icon'

export default function IngredientItem({ item, selected, onToggle }) {
  const sub = item.aliases && item.aliases[0]
  return (
    <div className={'item' + (selected ? ' added' : '')}>
      <div className="av" aria-hidden="true">
        {item.emoji}
      </div>
      <div className="meta">
        <div className="n">{item.name}</div>
        {sub && <div className="s">{sub}</div>}
      </div>
      <button
        className="add"
        onClick={() => onToggle(item)}
        aria-pressed={selected}
        aria-label={selected ? `Remove ${item.name}` : `Add ${item.name}`}
      >
        <Icon name={selected ? 'check' : 'plus'} size={22} stroke={2} />
      </button>
    </div>
  )
}
