import { useState, useMemo } from 'react';
import Card from './Card';
import SearchBar from './SearchBar';
import ItemModal from './ItemModal';
import items from '../../lost-and-found.json';
import NavBar from './NavBar';

function Cards() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const parseDate = (str) => {
    const [day, month, year] = str.split('/');
    return new Date(`${year}-${month}-${day}`);
  };

  const filtered = useMemo(() => {
    return items.filter(item => {
      const queryMatch = (item.title + item.description + item.location)
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      const statusMatch =
        statusFilter === 'all' || item.status === statusFilter;

      const rawDateStr = item.dateLost || item.dateFound;
      const itemDate = rawDateStr.includes('/') ? parseDate(rawDateStr) : new Date(rawDateStr);
      const start = startDate ? new Date(startDate) : null;
      const end = endDate ? new Date(endDate) : null;

      const dateMatch =
        (!start || itemDate >= start) &&
        (!end || itemDate <= end);

      return queryMatch && statusMatch && dateMatch;
    });
  }, [searchQuery, statusFilter, startDate, endDate]);
  const handleResetFilters = () => {
    setSearchQuery('');
    setStatusFilter('all');
    setStartDate('');
    setEndDate('');
  };
  
  const handleFilterLost = () => {
    setStatusFilter('lost');
  };
  
  const handleFilterFound = () => {
    setStatusFilter('found');
  };

  return (
    <>
      <NavBar
        onResetFilters={handleResetFilters}
        onFilterLost={handleFilterLost}
        onFilterFound={handleFilterFound}
      />
      
      <SearchBar onSearch={setSearchQuery} />

      <div className="container mb-3">
        <button
          className="btn btn-outline-primary"
          onClick={() => setShowFilters(!showFilters)}
        >
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </button>
      </div>

      {showFilters && (
        <div className="container mb-4">
          <div className="row g-3 align-items-end">
            <div className="col-md-3">
              <label className="form-label">Status:</label>
              <select
                className="form-select"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All</option>
                <option value="lost">Lost</option>
                <option value="found">Found</option>
              </select>
            </div>

            <div className="col-md-3">
              <label className="form-label">From:</label>
              <input
                type="date"
                className="form-control"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>

            <div className="col-md-3">
              <label className="form-label">To:</label>
              <input
                type="date"
                className="form-control"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>

            <div className="col-md-3 d-flex align-items-end">
              <button
                className="btn btn-secondary w-100"
                onClick={() => {
                  setStatusFilter('all');
                  setStartDate('');
                  setEndDate('');
                }}
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>
      )}

      <button
        className="btn btn-success shadow-lg fw-bold"
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          padding: '0.75rem 1.5rem',
          fontSize: '1.2rem',
          borderRadius: '1rem',
          background: 'linear-gradient(135deg, #28a745, #218838)',
          border: 'none',
          color: 'white',
          boxShadow: '0 6px 12px rgba(0,0,0,0.2)',
          transition: 'transform 0.2s, box-shadow 0.2s',
          zIndex: 1050,
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = 'scale(1.05)';
          e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.3)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 6px 12px rgba(0,0,0,0.2)';
        }}
        onClick={() => setShowAddModal(true)}
      >
        ➕ Add Item
      </button>

      <div className="container mb-5 mt-4">
        <div className="row g-4">
          {filtered.length > 0 ? (
            filtered.map(item => (
              <div className="col-12 col-sm-6 col-lg-4" key={item.id}>
                <Card {...item} />
              </div>
            ))
          ) : (
            <p>No items found.</p>
          )}
        </div>
      </div>

      {showAddModal && (
        <ItemModal
          onClose={() => setShowAddModal(false)}
          onSave={(newItem) => {
            console.log('New item:', newItem);
            setShowAddModal(false);
          }}
        />
      )}
    </>
  );
}

export default Cards;