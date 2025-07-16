import { useEffect, useState } from 'react';
import SearchBar from './components/SearchBar';
import Filter from './components/Filter'; // We'll modify this to handle healthScore filter
import RecipeList from './components/RecipeList';
import Header from './components/Header';


const API_KEY = '1162f9a743204caa883405a5eae8feed';
const URL = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=50&addRecipeInformation=true`;

function App() {
  const [recipes, setRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCuisine, setFilterCuisine] = useState('');
  const [filterHealthScore, setFilterHealthScore] = useState(0); // New state for health score filter

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await fetch(URL);
        const data = await res.json();
        setRecipes(data.results);
      } catch (err) {
        console.error('Fetch error:', err);
      }
    };
    fetchRecipes();
  }, []);

  const filtered = recipes
    .filter(r => r.title.toLowerCase().includes(searchQuery.toLowerCase()))
    .filter(r => filterCuisine ? r.cuisines.includes(filterCuisine) : true)
    .filter(r => r.healthScore >= filterHealthScore); // Apply health score filter

  // Summary stats
  const total = recipes.length;
  const avgHealth = Math.round(
    recipes.reduce((sum, r) => sum + r.healthScore, 0) / (recipes.length || 1)
  );
  const avgReadyTime = Math.round(
  recipes.reduce((sum, r) => sum + r.readyInMinutes, 0) / (recipes.length || 1)
);


  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <Header />
      
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
        <Filter 
          cuisineValue={filterCuisine} 
          onCuisineChange={setFilterCuisine} 
          healthScoreValue={filterHealthScore}
          onHealthScoreChange={setFilterHealthScore}
        />
      </div>

      <div className="summary">
        <p><strong>Total Recipes:</strong> {total}</p>
        <p><strong>Average Health Score:</strong> {avgHealth}</p>
        <p><strong>Average Ready Time:</strong> {avgReadyTime} mins</p>
      </div>

      <RecipeList data={filtered} />
    </div>
  );
}

export default App;