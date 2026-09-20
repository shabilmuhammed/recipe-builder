export default function SearchBar({ value, onChange }) {
  return (
    <div className="search">
      <span className="ic">🔍</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search ingredients…"
        inputMode="search"
        autoCapitalize="none"
        autoCorrect="off"
      />
      {value && (
        <button className="clearq" onClick={() => onChange('')} aria-label="Clear search">
          ✕
        </button>
      )}
    </div>
  )
}
