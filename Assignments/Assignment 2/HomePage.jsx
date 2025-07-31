import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { itemsAPI } from '../../utils/auth';
import Header from '../layout/Header';
import SearchBar from '../layout/SearchBar';
import Filters from '../layout/Filters';
import WelcomeMessage from '../layout/WelcomeMessage';
import ItemCard from '../items/ItemCard';
import AddButton from '../items/AddButton';
import ItemModal from '../items/ItemModal';

const HomePage = () => {
  const { isLoggedIn, user } = useAuth();
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [showMyItems, setShowMyItems] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    fetchItems();
  }, [showMyItems]);

  useEffect(() => {
    filterItems();
  }, [items, searchTerm, statusFilter, categoryFilter]);

  const fetchItems = async () => {
    try {
      setLoading(true);
      setError('');
      
      let response;
      if (showMyItems && isLoggedIn) {
        response = await itemsAPI.getMyItems();
      } else {
        response = await itemsAPI.getAll();
      }
      
      setItems(response.items || []);
    } catch (error) {
      console.error('Failed to fetch items:', error);
      setError('Failed to load items. Please try again.');
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  const filterItems = () => {
    let filtered = [...items];

    // Search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(term) ||
        item.location.toLowerCase().includes(term) ||
        (item.description && item.description.toLowerCase().includes(term))
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(item => item.status === statusFilter);
    }

    // Category filter
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(item => item.category === categoryFilter);
    }

    setFilteredItems(filtered);
  };

  const handleAddItem = () => {
    if (!isLoggedIn) {
      alert('Please login to add items');
      return;
    }
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const handleEditItem = (item) => {
    if (!isLoggedIn) {
      alert('Please login to edit items');
      return;
    }
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleDeleteItem = async (itemId) => {
    if (!isLoggedIn) {
      alert('Please login to delete items');
      return;
    }

    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await itemsAPI.delete(itemId);
        await fetchItems(); // Refresh the list
      } catch (error) {
        console.error('Failed to delete item:', error);
        alert('Failed to delete item. Please try again.');
      }
    }
  };

  const handleModalSubmit = async (itemData) => {
    try {
      if (editingItem) {
        await itemsAPI.update(editingItem.id, itemData);
      } else {
        await itemsAPI.create(itemData);
      }
      
      setIsModalOpen(false);
      setEditingItem(null);
      await fetchItems(); // Refresh the list
    } catch (error) {
      console.error('Failed to save item:', error);
      throw error; // Let the modal handle the error display
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingItem(null);
  };

  const canEditItem = (item) => {
    return isLoggedIn && user && item.user_id === user.id;
  };

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat" 
         style={{backgroundImage: "url('https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80')"}}>
      <div className="bg-black bg-opacity-50 min-h-screen">
        <Header />
        
        <main className="container mx-auto px-4 py-8">
          <WelcomeMessage itemCount={filteredItems.length} showMyItems={showMyItems} />
          
          <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
          
          <Filters
            statusFilter={statusFilter}
            categoryFilter={categoryFilter}
            onStatusChange={setStatusFilter}
            onCategoryChange={setCategoryFilter}
            showMyItems={showMyItems}
            onShowMyItemsChange={setShowMyItems}
            isLoggedIn={isLoggedIn}
          />

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}

          {loading ? (
            <div className="text-center py-8">
              <div className="text-white text-xl">Loading items...</div>
            </div>
          ) : (
            <>
              {filteredItems.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-white text-xl mb-4">
                    {showMyItems ? 'You haven\'t posted any items yet.' : 'No items found.'}
                  </div>
                  {isLoggedIn && (
                    <div className="text-white text-lg">
                      {showMyItems ? 'Post your first lost or found item!' : 'Item not found? Post it now!'}
                    </div>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {filteredItems.map((item) => (
                    <ItemCard
                      key={item.id}
                      item={item}
                      onEdit={() => handleEditItem(item)}
                      onDelete={() => handleDeleteItem(item.id)}
                      canEdit={canEditItem(item)}
                    />
                  ))}
                </div>
              )}
            </>
          )}

          <AddButton onClick={handleAddItem} />

          {isModalOpen && (
            <ItemModal
              isOpen={isModalOpen}
              onClose={handleModalClose}
              onSubmit={handleModalSubmit}
              editingItem={editingItem}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default HomePage;

