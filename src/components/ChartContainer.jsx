import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function ChartContainer({ title, data, dataKey, barKey, color }) {
  const [showChart, setShowChart] = useState(true);

  return (
    <div className="chart-container">
      <div className="chart-header">
        <h3 className="chart-title">{title}</h3>
        <button 
          className="toggle-button"
          onClick={() => setShowChart(!showChart)}
        >
          {showChart ? 'Hide Chart' : 'Show Chart'}
        </button>
      </div>
      
      {showChart && (
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#dfe6e9" />
            <XAxis 
              dataKey={dataKey} 
              tick={{ fill: '#636E72' }}
              axisLine={{ stroke: '#dfe6e9' }}
            />
            <YAxis 
              tick={{ fill: '#636E72' }}
              axisLine={{ stroke: '#dfe6e9' }}
            />
            <Tooltip 
              contentStyle={{
                background: '#FFFFFF',
                border: 'none',
                borderRadius: '8px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
              }}
            />
            <Legend />
            <Bar 
              dataKey={barKey} 
              fill={color}
              radius={[4, 4, 0, 0]}
              animationDuration={1500}
            />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}