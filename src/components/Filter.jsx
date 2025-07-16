const cuisines = ['Italian', 'Mexican', 'Chinese', 'Indian', 'American'];

export default function Filter({ cuisineValue, onCuisineChange, healthScoreValue, onHealthScoreChange }) {
  return (
    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
      <select value={cuisineValue} onChange={(e) => onCuisineChange(e.target.value)} style={{ padding: '8px' }}>
        <option value="">All Cuisines</option>
        {cuisines.map(c => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>

      <label htmlFor="healthScoreFilter">Min Health Score:</label>
      <input
        type="range"
        id="healthScoreFilter"
        min="0"
        max="100"
        value={healthScoreValue}
        onChange={(e) => onHealthScoreChange(Number(e.target.value))}
        style={{ width: '150px' }}
      />
      <span>{healthScoreValue}</span>
    </div>
  );
}