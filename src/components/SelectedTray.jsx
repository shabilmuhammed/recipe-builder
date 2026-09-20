export default function SelectedTray({ selected, onRemove, onClear }) {
  return (
    <>
      <div className="tray-head">
        <span className="lbl">🧺 Your basket{selected.length ? ` · ${selected.length}` : ''}</span>
        {selected.length > 0 && (
          <button className="clr" onClick={onClear}>
            Clear
          </button>
        )}
      </div>
      <div className="tray">
        {selected.length === 0 ? (
          <div className="empty">Tap + on ingredients to add them here…</div>
        ) : (
          selected.map((s) => (
            <span className="chip" key={s.id}>
              {s.emoji} {s.name}
              <button className="x" onClick={() => onRemove(s.id)} aria-label={`Remove ${s.name}`}>
                ✕
              </button>
            </span>
          ))
        )}
      </div>
    </>
  )
}
