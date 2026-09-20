import { useState } from 'react'

const CUISINE = {
  Western: { cls: 'west', label: '🌎 Western' },
  Kerala: { cls: 'ind', label: '🌴 Kerala' },
  Indian: { cls: 'ind', label: '🇮🇳 Indian' },
}

function pickEmoji(r) {
  const s = (r.name + ' ' + (r.description || '')).toLowerCase()
  const map = [
    ['pasta', '🍝'], ['noodle', '🍜'], ['prawn', '🦐'], ['fish', '🐟'], ['egg', '🍳'],
    ['chicken', '🍗'], ['paneer', '🧀'], ['salad', '🥗'], ['soup', '🍲'], ['wrap', '🌯'],
    ['sandwich', '🥪'], ['pizza', '🍕'], ['chutney', '🥥'], ['curry', '🥘'], ['rice', '🍚'],
    ['bean', '🫘'], ['potato', '🥔'], ['toast', '🍞'], ['stir', '🥘'],
  ]
  for (const [k, e] of map) if (s.includes(k)) return e
  return '🍽️'
}

export default function RecipeCard({ recipe, rank }) {
  const [open, setOpen] = useState(rank === 1)
  const c = CUISINE[recipe.cuisine] || CUISINE.Indian
  const isAir =
    /air/i.test(recipe.cookingMethod || '') || (recipe.tags || []).some((t) => /air/i.test(t))
  const extraTags = (recipe.tags || []).filter((t) => !/air|easy|medium/i.test(t)).slice(0, 2)

  return (
    <div className="rcard">
      <span className="rank">#{rank}</span>
      <div className="rtop">
        <div className="rav">{pickEmoji(recipe)}</div>
        <div>
          <div className="n">{recipe.name}</div>
          {recipe.description && <div className="d">{recipe.description}</div>}
        </div>
      </div>

      <div className="tags">
        <span className={'tag ' + c.cls}>{c.label}</span>
        {recipe.cookingMethod && (
          <span className={'tag' + (isAir ? ' air' : '')}>{recipe.cookingMethod}</span>
        )}
        {recipe.difficulty && (
          <span className={'tag' + (recipe.difficulty === 'Easy' ? ' easy' : '')}>
            {recipe.difficulty}
          </span>
        )}
        {recipe.timeMinutes ? <span className="tag">{recipe.timeMinutes} min</span> : null}
        {extraTags.map((t, i) => (
          <span className="tag" key={i}>
            {t}
          </span>
        ))}
      </div>

      {recipe.whyItFits && <div className="why">✨ {recipe.whyItFits}</div>}

      {recipe.ingredientsHave?.length > 0 && (
        <div className="ing">
          <div className="h">You have</div>
          <div className="pills">
            {recipe.ingredientsHave.map((x, i) => (
              <span className="p have" key={i}>
                ✓ {x}
              </span>
            ))}
          </div>
        </div>
      )}

      {recipe.ingredientsNeeded?.length > 0 && (
        <div className="ing">
          <div className="h">Grab a little</div>
          <div className="pills">
            {recipe.ingredientsNeeded.map((x, i) => (
              <span className="p grab" key={i}>
                + {x}
              </span>
            ))}
          </div>
        </div>
      )}

      <button className="steps-toggle" onClick={() => setOpen((o) => !o)}>
        {open ? 'Hide steps' : 'View steps'} <span className={'arw' + (open ? ' open' : '')}>▾</span>
      </button>

      {open && (
        <div className="steps">
          <ol>
            {(recipe.steps || []).map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ol>
          {recipe.healthNote && <div className="health">🌿 {recipe.healthNote}</div>}
        </div>
      )}
    </div>
  )
}
