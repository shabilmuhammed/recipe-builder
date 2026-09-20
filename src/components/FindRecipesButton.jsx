import Icon from './Icon'

export default function FindRecipesButton({ count, onClick }) {
  return (
    <button className="find" onClick={onClick} disabled={count === 0}>
      <Icon name="chef" size={22} />
      <span>Find Recipes</span>
      {count > 0 && <span className="cnt">{count}</span>}
    </button>
  )
}
