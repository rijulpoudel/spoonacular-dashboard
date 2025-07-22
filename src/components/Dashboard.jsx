import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import Filter from './Filter';
import RecipeList from './RecipeList';
import ChartContainer from './ChartContainer';

const API_KEY = '1162f9a743204caa883405a5eae8feed';
const URL = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=50&addRecipeInformation=true`;

export default function Dashboard() {
  const [recipes, setRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCuisine, setFilterCuisine] = useState('');
  const [filterHealthScore, setFilterHealthScore] = useState(0);

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
    .filter(r => r.healthScore >= filterHealthScore);

  // Summary stats
  const total = recipes.length;
  const avgHealth = Math.round(
    recipes.reduce((sum, r) => sum + r.healthScore, 0) / (recipes.length || 1)
  );
  const avgReadyTime = Math.round(
    recipes.reduce((sum, r) => sum + r.readyInMinutes, 0) / (recipes.length || 1)
  );

  // Prepare data for charts
  // Chart 1: Recipe count by cuisine
  const cuisineCounts = {};
  recipes.forEach(recipe => {
    recipe.cuisines.forEach(cuisine => {
      if (cuisine) {
        cuisineCounts[cuisine] = (cuisineCounts[cuisine] || 0) + 1;
      }
    });
  });
  const cuisineCountData = Object.entries(cuisineCounts)
    .map(([cuisine, count]) => ({ cuisine, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  // Chart 2: Average health score by cuisine
  const cuisineHealthData = {};
  const cuisineRecipeCount = {};
  recipes.forEach(recipe => {
    recipe.cuisines.forEach(cuisine => {
      if (cuisine) {
        if (!cuisineHealthData[cuisine]) {
          cuisineHealthData[cuisine] = 0;
          cuisineRecipeCount[cuisine] = 0;
        }
        cuisineHealthData[cuisine] += recipe.healthScore;
        cuisineRecipeCount[cuisine] += 1;
      }
    });
  });
  const cuisineAvgHealthData = Object.keys(cuisineHealthData)
    .map(cuisine => ({
      cuisine,
      avgHealth: Math.round(cuisineHealthData[cuisine] / cuisineRecipeCount[cuisine])
    }))
    .sort((a, b) => b.avgHealth - a.avgHealth)
    .slice(0, 5);

  return (
    <div>

        <div className="search-filter-container">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
        <Filter 
          cuisineValue={filterCuisine} 
          onCuisineChange={setFilterCuisine} 
          healthScoreValue={filterHealthScore}
          onHealthScoreChange={setFilterHealthScore}
        />
      </div>

      <div className="summary">
        <div className="summary-card">
          <h3>{total}</h3>
          <p>Total Recipes</p>
        </div>
        <div className="summary-card">
          <h3>{avgHealth}</h3>
          <p>Avg Health Score</p>
        </div>
        <div className="summary-card">
          <h3>{avgReadyTime}</h3>
          <p>Avg Ready Time (mins)</p>
        </div>
        <div className="summary-card">
          <h3>{filtered.length}</h3>
          <p>Matching Recipes</p>
        </div>
      </div>
      
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
        <Filter 
          cuisineValue={filterCuisine} 
          onCuisineChange={setFilterCuisine} 
          healthScoreValue={filterHealthScore}
          onHealthScoreChange={setFilterHealthScore}
        />
      </div>

      <div className="summary" style={{ marginBottom: '20px' }}>
        <p><strong>Total Recipes:</strong> {total}</p>
        <p><strong>Average Health Score:</strong> {avgHealth}</p>
        <p><strong>Average Ready Time:</strong> {avgReadyTime} mins</p>
      </div>

      <ChartContainer 
        title="Top Cuisines by Recipe Count" 
        data={cuisineCountData} 
        dataKey="cuisine" 
        barKey="count" 
        color="#8884d8" 
      />
      
      <ChartContainer 
        title="Top Cuisines by Health Score" 
        data={cuisineAvgHealthData} 
        dataKey="cuisine" 
        barKey="avgHealth" 
        color="#82ca9d" 
      />

      <RecipeList data={filtered} />
    </div>
  );
}