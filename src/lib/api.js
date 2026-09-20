// Calls our own serverless function, which talks to OpenAI (the key stays on the server).
export async function fetchRecipes(ingredients) {
  const res = await fetch('/api/recipes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ingredients }),
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(data.error || `Request failed (${res.status})`)
  return data.recipes || []
}
