import { useMemo, useState } from 'react'
import { CATEGORIES, INGREDIENTS } from './data/ingredients'
import { usePantry } from './lib/usePantry'
import { fetchRecipes } from './lib/api'
import Icon from './components/Icon'
import SearchBar from './components/SearchBar'
import CategoryTiles from './components/CategoryTiles'
import IngredientList from './components/IngredientList'
import SelectedTray from './components/SelectedTray'
import FindRecipesButton from './components/FindRecipesButton'
import Loading from './components/Loading'
import RecipeResults from './components/RecipeResults'

const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
const titleCase = (s) => s.replace(/\b\w/g, (c) => c.toUpperCase())
const greeting = () => {
  const h = new Date().getHours()
  return h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening'
}

export default function App() {
  const { selected, has, toggle, remove, clear, add } = usePantry()
  const [query, setQuery] = useState('')
  const [activeCat, setActiveCat] = useState('all')
  const [view, setView] = useState('build') // build | loading | results | error
  const [recipes, setRecipes] = useState([])
  const [error, setError] = useState('')

  const q = query.trim().toLowerCase()
  const items = useMemo(() => {
    if (q) {
      return INGREDIENTS.filter(
        (i) =>
          i.name.toLowerCase().includes(q) ||
          (i.aliases || []).some((a) => a.toLowerCase().includes(q))
      )
    }
    if (activeCat === 'all') return INGREDIENTS
    return INGREDIENTS.filter((i) => i.category === activeCat)
  }, [q, activeCat])

  const catLabel = CATEGORIES.find((c) => c.id === activeCat)?.label || 'All'

  const onToggle = (item) => toggle({ id: item.id, name: item.name, emoji: item.emoji })
  const onAddCustom = (name) => {
    const n = titleCase(name.trim())
    if (!n) return
    add({ id: 'custom:' + slug(n), name: n, emoji: '🍽️' })
    setQuery('')
  }

  const find = async () => {
    setView('loading')
    setError('')
    try {
      const r = await fetchRecipes(selected.map((s) => s.name))
      if (!r || r.length === 0) throw new Error('No recipes came back — try adding a few more ingredients.')
      setRecipes(r)
      setView('results')
    } catch (e) {
      setError(e.message || 'Something went wrong.')
      setView('error')
    }
  }

  if (view === 'loading') return <Loading />
  if (view === 'results')
    return <RecipeResults recipes={recipes} count={selected.length} onBack={() => setView('build')} />
  if (view === 'error')
    return (
      <div className="screen-msg">
        <div className="big">
          <Icon name="alert" size={38} />
        </div>
        <h3>Couldn’t fetch recipes</h3>
        <p>{error}</p>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
          <button className="btn" onClick={find}>
            Try again
          </button>
          <button className="btn ghost" onClick={() => setView('build')}>
            Back
          </button>
        </div>
      </div>
    )

  return (
    <div className="app">
      <header className="topbar">
        <div className="brand">
          <div className="logo">
            <Icon name="chef" size={24} />
          </div>
          <div>
            <h1>Pantry Pal</h1>
            <p className="greet">{greeting()} · what's in your kitchen?</p>
          </div>
        </div>
        <SearchBar value={query} onChange={setQuery} />
        <CategoryTiles
          categories={CATEGORIES}
          active={q ? 'all' : activeCat}
          onChange={(id) => {
            setActiveCat(id)
            setQuery('')
          }}
        />
      </header>

      <main className="scroll">
        <div className="sec-title">
          {q ? `Results for “${query.trim()}”` : catLabel}{' '}
          <span>· {items.length} item{items.length === 1 ? '' : 's'}</span>
        </div>
        <IngredientList
          items={items}
          isSelected={has}
          onToggle={onToggle}
          query={query}
          onAddCustom={onAddCustom}
        />
      </main>

      <footer className="bottom">
        <SelectedTray selected={selected} onRemove={remove} onClear={clear} />
        <FindRecipesButton count={selected.length} onClick={find} />
      </footer>
    </div>
  )
}
