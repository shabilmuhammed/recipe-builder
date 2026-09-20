export default function FindRecipesButton({ count, onClick }) {
  return (
    <button className="find" onClick={onClick} disabled={count === 0}>
      <span>🍳 Find Recipes</span>
      {count > 0 && <span className="cnt">{count}</span>}
    </button>
  )
}
