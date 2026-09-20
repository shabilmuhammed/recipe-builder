import { useState, useEffect, useCallback } from 'react'

const KEY = 'pantrypal.selected.v1'

function load() {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

// Manages the user's basket/pantry, persisted to localStorage on this device.
export function usePantry() {
  const [selected, setSelected] = useState(load)

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(selected))
    } catch {
      /* private mode / storage blocked — app still works, just won't persist */
    }
  }, [selected])

  const has = useCallback((id) => selected.some((s) => s.id === id), [selected])
  const add = useCallback(
    (item) => setSelected((p) => (p.some((s) => s.id === item.id) ? p : [...p, item])),
    []
  )
  const remove = useCallback((id) => setSelected((p) => p.filter((s) => s.id !== id)), [])
  const toggle = useCallback(
    (item) =>
      setSelected((p) =>
        p.some((s) => s.id === item.id) ? p.filter((s) => s.id !== item.id) : [...p, item]
      ),
    []
  )
  const clear = useCallback(() => setSelected([]), [])

  return { selected, has, add, remove, toggle, clear }
}
