export default function RecipeList({ data }) {
  return (
    <div className="recipe-grid">
      {data.map((recipe) => (
        <div key={recipe.id} className="recipe-card">
          <img src={recipe.image} alt={recipe.title} />
          <h3>{recipe.title}</h3>
          <p>Ready in: {recipe.readyInMinutes} mins</p>
          <p>Health Score: {recipe.healthScore}</p>
        </div>
      ))}
    </div>
  );
}