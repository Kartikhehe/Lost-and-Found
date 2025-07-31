import { Search } from 'lucide-react';

const SearchBar = ({ searchQuery, onSearchChange, onSearch }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <section className="flex justify-center p-5 gap-2.5">
      <form onSubmit={handleSubmit} className="flex gap-2.5 w-full max-w-md">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search items or locations..."
          className="flex-1 p-3 border border-gray-300 rounded-lg text-xl"
        />
        <button
          type="submit"
          className="px-4 py-3 bg-blue-500 text-green-400 border-none rounded-lg cursor-pointer hover:bg-blue-600 transition-colors"
        >
          <Search size={20} />
        </button>
      </form>
    </section>
  );
};

export default SearchBar;

