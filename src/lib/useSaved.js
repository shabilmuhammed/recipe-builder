import { useState, useEffect, useCallback } from 'react'

const KEY = 'pantrypal.saved.v1'

// Stable id for a recipe so we can tell if it's already saved.
export const recipeId = (r) =>
  ((r.name || '') + '|' + (r.cuisine || '')).toLowerCase().replace(/[^a-z0-9|]+/g, '-')

function load() {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

// Saved recipes, persisted on-device. (Swap load/persist for a Vercel Blob/KV
// API later to sync across devices — the component API below stays the same.)
export function useSaved() {
  const [saved, setSaved] = useState(load)

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(saved))
    } catch {
      /* storage blocked — feature still works for the session */
    }
  }, [saved])

  const isSaved = useCallback((id) => saved.some((r) => r._id === id), [saved])

  const toggleSave = useCallback((recipe) => {
    const id = recipeId(recipe)
    setSaved((prev) =>
      prev.some((r) => r._id === id)
        ? prev.filter((r) => r._id !== id)
        : [{ ...recipe, _id: id, _savedAt: Date.now() }, ...prev]
    )
  }, [])

  const remove = useCallback((id) => setSaved((prev) => prev.filter((r) => r._id !== id)), [])

  return { saved, isSaved, toggleSave, remove, count: saved.length }
}
