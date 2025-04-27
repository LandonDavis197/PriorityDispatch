export function SearchBar({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <input
      type="text"
      placeholder="Search"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-1 focus:ring-indigo-200 focus:border-indigo-500 transition"
    />
  );
}
