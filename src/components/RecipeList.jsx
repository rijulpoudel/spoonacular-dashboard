import { Link } from 'react-router-dom';

export default function RecipeList({ data }) {
  return (
    <div className="recipe-grid">
      {data.map((recipe) => (
        <Link 
          key={recipe.id} 
          to={`/recipe/${recipe.id}`}
          style={{ textDecoration: 'none' }}
        >
          <div className="recipe-card">
            <img src={recipe.image} alt={recipe.title} />
            <div className="recipe-content">
              <h3>{recipe.title}</h3>
              <div className="recipe-meta">
                <span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                  </svg>
                  {recipe.healthScore}
                </span>
                <span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                  {recipe.readyInMinutes} mins
                </span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}