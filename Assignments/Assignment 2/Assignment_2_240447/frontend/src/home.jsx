import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import {
  Typography,
  Button,
  Grid,
  Box,
  Container,
} from '@mui/material';
import NavBar from './contents/NavBar.jsx'
import SearchBar from './contents/SearchBar.jsx'
import ItemCard from './contents/ItemCard.jsx'
import EditCard from './contents/EditCard.jsx'
import AddCard from './contents/AddCard.jsx'

const Home=() =>{
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
   const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleCardClick = (item) => setSelectedItem(item);
  const handleCloseModal = () => setSelectedItem(null);

  useEffect(() => {
  const token = localStorage.getItem('token');
    if (token) {
      try {
        jwtDecode(token);
        setIsAuthenticated(true);
      } catch (err) {
        console.error('Invalid token:', err);
        setIsAuthenticated(false);
      }
    }

  axios.get('http://localhost:5000/items',{
    headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((res) => {
      const sorted = [...res.data].sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
      setItems(sorted);
    })
    .catch((err) => {
      console.error("Failed to fetch items:", err);
      setItems([]);
    });
  }, [navigate]);

  return (
    <>
      {/* Nav Bar */}
      <NavBar/>

      {/* Search Field */}
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>

      {/* Cards */}
      <Container maxWidth={false} sx={{ mt: 4 }}>
        <Grid container spacing={2} justifyContent="flex-start">
          {items
          .filter((i) =>
            i.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            i.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            i.contact?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            i.status?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            i.date?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            i.place?.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <ItemCard item={item} 
              onClick={()=> handleCardClick(item)}
              setItems={setItems}
              />
            </Grid>
          ))}
        </Grid>
        {selectedItem && (
          <EditCard item={selectedItem} onClose={handleCloseModal} setItems={setItems}/>
        )}

        {items.length === 0 && (
          <Typography variant="h6" color="textSecondary" align="center" sx={{ mt: 4 }}>
            No items to display
          </Typography>
        )}

        {/* Add Item Floating Button */}
        <Box sx={{ position: 'fixed', bottom: 20, right: 20, zIndex: 1500 }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => {
              if (isAuthenticated) {
                setAddDialogOpen(true);
              } else {
                alert("Please log in to add an item.");
              }
            }}
            sx={{ borderRadius: '8px', textTransform: 'none', fontWeight: 'bold' }}
          >
            + ADD ITEM
          </Button>
        </Box>
        <AddCard
          open={addDialogOpen}
          onClose={() => setAddDialogOpen(false)}
          setItems={setItems}
        />

      </Container>

      {/* Footer */}
      <footer style={{ textAlign: 'center', padding: '2rem 0' }}>
        <Typography variant="body2">
           © {new Date().getFullYear()} Hemakshi Kumawat | Lost and Found - IIT Kanpur
        </Typography>
      </footer>
    </>
  );
}

export default Home;
