import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  Typography,
  Button,
  Grid,
  Box,
  Container,
} from '@mui/material';
import items from './Items.jsx'
import NavBar from './contents/NavBar.jsx'
import SearchBar from './contents/SearchBar.jsx'
import ItemCard from './contents/ItemCard.jsx'
import EditCard from './contents/EditCard.jsx'
import AddCard from './contents/AddCard.jsx'

function Home() {
  const [item, setItems] = useState(items);
  const [selectedItem, setSelectedItem] = useState(null);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleCardClick = (item) => setSelectedItem(item);
  const handleCloseModal = () => setSelectedItem(null);

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
            i.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            i.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            i.contact.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <ItemCard item={item} 
              onClick={()=> handleCardClick(item)}
              />
            </Grid>
          ))}
        </Grid>
        {selectedItem && (
          <EditCard item={selectedItem} onClose={handleCloseModal} />
        )}

        {/* Add Course Floating Button */}
        <Box sx={{ position: 'fixed', bottom: 20, right: 20, zIndex: 1500 }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => setAddDialogOpen(true)}
            sx={{ borderRadius: '8px', textTransform: 'none', fontWeight: 'bold' }}
          >
            + ADD ITEM
          </Button>
        </Box>
        <AddCard
          open={addDialogOpen}
          onClose={() => setAddDialogOpen(false)}
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
