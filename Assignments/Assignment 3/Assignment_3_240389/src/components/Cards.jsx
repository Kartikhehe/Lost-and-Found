import { useState, useMemo, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Card from './Card';
import SearchBar from './SearchBar';
import ItemModal from './ItemModal';
import NavBar from './NavBar';
import { jwtDecode } from "jwt-decode";

function Cards() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);

  const getUserIdFromToken = () => {
    const token = localStorage.getItem('token');
    if (!token) return null;
    try {
      const decoded = jwtDecode(token);
      return decoded.userId;
    } catch (err) {
      return null;
    }
  };

  const getUserEmailFromToken = () => {
    const token = localStorage.getItem('token');
    if (!token) return null;
    try {
      const decoded = jwtDecode(token);
      return decoded.email;
    } catch (err) {
      return null;
    }
  };

  useEffect(() => {
    const baseURL = import.meta.env.VITE_API_URL;
  
    fetch(`${baseURL}/items`)
      .then(res => res.json())
      .then(data => {
        setItems(data);
        setFilteredItems([...data]);
      })
      .catch(err => console.error('Failed to fetch items:', err));
  }, []);

useEffect(() => {
  const filtered = items.filter(item => {
    const queryMatch = (item.title + item.description + item.location)
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const statusMatch = statusFilter === 'all' || item.status === statusFilter;

    const rawDateStr = item.date;
    const itemDate = rawDateStr.includes('/') ? parseDate(rawDateStr) : new Date(rawDateStr);
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;

    const dateMatch =
      (!start || itemDate >= start) &&
      (!end || itemDate <= end);

    return queryMatch && statusMatch && dateMatch;
  });

  setFilteredItems(filtered);
}, [items, searchQuery, statusFilter, startDate, endDate]);
  const userEmail = getUserEmailFromToken();

  const parseDate = (str) => {
    const [day, month, year] = str.split('/');
    return new Date(`${year}-${month}-${day}`);
  };

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

  const handleFilterMyItems = () => {
    const email = getUserEmailFromToken();
    if (!email) {
      toast.error("Login to view your items");
      return;
    }

    const myItems = items.filter(item => item.user_email === email);
    setFilteredItems(myItems);
  };

  return (
    <>
      <NavBar
        onResetFilters={handleResetFilters}
        onFilterLost={handleFilterLost}
        onFilterFound={handleFilterFound}
        onFilterMyItems={handleFilterMyItems}
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
        onClick={() => {
          if (userEmail) {
            setShowAddModal(true);
          } else {
            toast.error("Login to add item");
          }
        }}
      >
        ➕ Add Item
      </button>

      <div className="container mb-5 mt-4">
        <div className="row g-4">
        {filteredItems.length > 0 ? (
          filteredItems.map(item => (
              <div className="col-12 col-sm-6 col-lg-4" key={item.id}>
              <Card
                {...item}
                userEmail={userEmail}
                onUpdate={(updatedItem) => {
                  setItems(prev =>
                    prev.map(i => i.id === updatedItem.id ? updatedItem : i)
                  );
                }}
                onDelete={(deletedId) => {
                  setItems(prev => prev.filter(i => i.id !== deletedId));
                }}
              />
              </div>
            ))
          ) : (
            <p>Item not found? Post it now!</p>
          )}
        </div>
      </div>

      {showAddModal && (
        <ItemModal
          onClose={() => setShowAddModal(false)}
          onSave={(newItem) => {
            setItems(prev => [...prev, newItem]);
            setShowAddModal(false);
          }}
        />
      )}
      <ToastContainer position="bottom-right" autoClose={2000} hideProgressBar newestOnTop closeOnClick pauseOnHover />
    </>
  );
}

export default Cards;
