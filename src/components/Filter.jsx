const cuisines = ['Italian', 'Mexican', 'Chinese', 'Indian', 'American', 'Mediterranean', 'Japanese', 'Thai'];

export default function Filter({ cuisineValue, onCuisineChange, healthScoreValue, onHealthScoreChange }) {
  return (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
      <select value={cuisineValue} onChange={(e) => onCuisineChange(e.target.value)}>
        <option value="">All Cuisines</option>
        {cuisines.map(c => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>

      <div className="range-container">
        <label htmlFor="healthScoreFilter" style={{ whiteSpace: 'nowrap' }}>
          Health Score: 
        </label>
        <input
          type="range"
          id="healthScoreFilter"
          min="0"
          max="100"
          value={healthScoreValue}
          onChange={(e) => onHealthScoreChange(Number(e.target.value))}
        />
        <span style={{ minWidth: '30px', textAlign: 'center' }}>{healthScoreValue}</span>
      </div>
    </div>
  );
}