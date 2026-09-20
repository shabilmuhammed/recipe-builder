import RecipeCard from './RecipeCard'
import Icon from './Icon'

export default function SavedRecipes({ saved, onToggleSave, onBack }) {
  return (
    <div className="results">
      <div className="rhead">
        <button className="back" onClick={onBack} aria-label="Back to ingredients">
          <Icon name="back" size={22} />
        </button>
        <div className="t">
          <h1>Saved recipes</h1>
          <p>
            {saved.length} recipe{saved.length === 1 ? '' : 's'} kept for later
          </p>
        </div>
      </div>

      <div className="rlist">
        {saved.length === 0 ? (
          <div className="saved-empty">
            <div className="big">
              <Icon name="bookmark" size={34} />
            </div>
            <h3>No saved recipes yet</h3>
            <p>Tap the bookmark on any recipe and the whole thing is kept right here for later.</p>
          </div>
        ) : (
          saved.map((r) => (
            <RecipeCard key={r._id} recipe={r} saved onToggleSave={onToggleSave} />
          ))
        )}
      </div>
    </div>
  )
}
