import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Grid,
  Box
} from '@mui/material';

const AddCard = ({ open, onClose, onSubmit }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontWeight: 'bold', textAlign: 'center' }}>
        Add Item Details
      </DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2} mt={1}>
            <TextField label="Item Name" fullWidth />
            <Box display="flex" gap={2}>
                <TextField label="Contact"  fullWidth />
                <TextField label="Phone no."  fullWidth />
            </Box>
            <TextField label="Image URL"  fullWidth />
            <TextField label="Description"  fullWidth multiline rows={3} />
            <Box display="flex" gap={2} mt={2}>
                <Button variant="contained" color="primary">ADD</Button>
            </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default AddCard;
