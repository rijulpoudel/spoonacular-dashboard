export default function SearchBar({ value, onChange }) {
  return (
    <input
      type="text"
      placeholder="Search recipes..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{ padding: '8px', flex: 1 }}
    />
  );
}