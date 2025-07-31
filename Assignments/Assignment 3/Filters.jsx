const Filters = ({ 
  statusFilter, 
  categoryFilter, 
  onStatusChange, 
  onCategoryChange,
  showMyItems,
  onShowMyItemsChange,
  isLoggedIn
}) => {
  return (
    <div className="flex flex-wrap gap-4 mb-8 justify-center">
      {/* Status Filters */}
      <div className="flex gap-2">
        <button
          onClick={() => onStatusChange('all')}
          className={`px-4 py-2 rounded-md font-medium transition-colors ${
            statusFilter === 'all'
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          All
        </button>
        <button
          onClick={() => onStatusChange('found')}
          className={`px-4 py-2 rounded-md font-medium transition-colors ${
            statusFilter === 'found'
              ? 'bg-green-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          ✅ Found
        </button>
        <button
          onClick={() => onStatusChange('lost')}
          className={`px-4 py-2 rounded-md font-medium transition-colors ${
            statusFilter === 'lost'
              ? 'bg-red-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          ❌ Lost
        </button>
      </div>

      {/* Category Filter */}
      <select
        value={categoryFilter}
        onChange={(e) => onCategoryChange(e.target.value)}
        className="px-4 py-2 rounded-md border border-gray-300 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="all">All Categories</option>
        <option value="electronics">Electronics</option>
        <option value="accessories">Accessories</option>
        <option value="books">Books</option>
      </select>

      {/* My Items Filter - Only show if logged in */}
      {isLoggedIn && (
        <button
          onClick={() => onShowMyItemsChange(!showMyItems)}
          className={`px-4 py-2 rounded-md font-medium transition-colors ${
            showMyItems
              ? 'bg-purple-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          📋 My Items
        </button>
      )}
    </div>
  );
};

export default Filters;