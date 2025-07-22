import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const API_KEY = '1162f9a743204caa883405a5eae8feed';

export default function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await fetch(
          `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`
        );
        const data = await res.json();
        setRecipe(data);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipe();
  }, [id]);

  if (loading) return <div style={{ textAlign: 'center', padding: '2rem' }}>Loading recipe...</div>;
  if (!recipe) return <div style={{ textAlign: 'center', padding: '2rem' }}>Recipe not found</div>;

  return (
    <div>
      <Link to="/" className="back-button">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
        Back to Recipes
      </Link>

      <div className="detail-container">
        <div className="recipe-header">
          <div className="recipe-image">
            <img src={recipe.image} alt={recipe.title} />
          </div>
          <div className="recipe-info">
            <h1 className="recipe-title">{recipe.title}</h1>
            
            <div className="recipe-stats">
              <div className="stat-item">
                <svg className="stat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                </svg>
                <span>Health Score: {recipe.healthScore}</span>
              </div>
              <div className="stat-item">
                <svg className="stat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                <span>Ready in: {recipe.readyInMinutes} mins</span>
              </div>
              <div className="stat-item">
                <svg className="stat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
                <span>Serves: {recipe.servings}</span>
              </div>
            </div>

            <div className="recipe-summary" dangerouslySetInnerHTML={{ __html: recipe.summary }} />
          </div>
        </div>

        <div style={{ padding: '2rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          <div>
            <h2 style={{ marginBottom: '1.5rem', color: 'var(--primary)' }}>Ingredients</h2>
            <ul style={{ listStyle: 'none' }}>
              {recipe.extendedIngredients.map(ing => (
                <li key={ing.id} style={{ marginBottom: '0.8rem', display: 'flex', alignItems: 'center' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '0.5rem', flexShrink: 0 }}>
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                    <line x1="9" y1="9" x2="9.01" y2="9"></line>
                    <line x1="15" y1="9" x2="15.01" y2="9"></line>
                  </svg>
                  <span>{ing.original}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 style={{ marginBottom: '1.5rem', color: 'var(--primary)' }}>Instructions</h2>
            {recipe.instructions ? (
              <div dangerouslySetInnerHTML={{ __html: recipe.instructions }} />
            ) : (
              <p>No instructions provided for this recipe.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}