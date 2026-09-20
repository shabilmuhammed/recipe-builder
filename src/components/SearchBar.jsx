import Icon from './Icon'

export default function SearchBar({ value, onChange }) {
  return (
    <div className="search">
      <span className="ic">
        <Icon name="search" size={20} />
      </span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search ingredients…"
        inputMode="search"
        autoCapitalize="none"
        autoCorrect="off"
        aria-label="Search ingredients"
      />
      {value && (
        <button className="clearq" onClick={() => onChange('')} aria-label="Clear search">
          <Icon name="x" size={16} />
        </button>
      )}
    </div>
  )
}
