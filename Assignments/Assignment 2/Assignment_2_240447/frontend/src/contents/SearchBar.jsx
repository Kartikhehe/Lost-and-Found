import React from 'react';
import {
  TextField,
  Container,
} from '@mui/material';

function SearchBar({ searchQuery, setSearchQuery }) {
  return (
    <Container maxWidth={false} sx={{ mt: 3 }}>
      <TextField
        label="Search items..."
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </Container>
  );
}

export default SearchBar;
