import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Box
} from '@mui/material';
import axios from 'axios';

const AddCard = ({ open, onClose, setItems }) => {
  const [formData, setFormData] = useState({
    title: '',
    status: '',
    place: '',
    date: '',
    contact: '',
    phone: '',
    description: '',
    image: ''
  });

  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const data = new FormData();
    data.append('image', file);

    try {
      setUploading(true);
      const res = await axios.post(
        'http://localhost:5000/items/upload',
        data
      );
      setFormData((prev) => ({ ...prev, image: res.data.url }));
    } catch (error) {
      console.error('Image upload failed:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('You must be logged in to add an item.');
        return;
      }

      const response = await axios.post('http://localhost:5000/items', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const updated = await axios.get('http://localhost:5000/items');
      setItems(updated.data);
      setFormData({
        title: '',
        status: '',
        place: '',
        date: '',
        contact: '',
        phone: '',
        description: '',
        image: ''
      });
      onClose();
    } catch (err) {
      console.error('Error adding item:', err);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontWeight: 'bold', textAlign: 'center' }}>
        Add Item Details
      </DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2} mt={1}>
          <TextField label="Item Name" name="title" value={formData.title} onChange={handleChange} fullWidth />
          <Box display="flex" gap={2}>
            <TextField label="Status" name="status" value={formData.status} onChange={handleChange} fullWidth />
            <TextField label="Place found/lost" name="place" value={formData.place} onChange={handleChange} fullWidth />
            <TextField label="Date found/lost" name="date" value={formData.date} onChange={handleChange} type ='date' InputLabelProps={{ shrink: true }}fullWidth />
          </Box>
          <Box display="flex" gap={2}>
            <TextField label="Contact" name="contact" value={formData.contact} onChange={handleChange} fullWidth />
            <TextField label="Phone no." name="phone" value={formData.phone} onChange={handleChange} fullWidth />
          </Box>
          <TextField label="Description" name="description" value={formData.description} onChange={handleChange} fullWidth multiline rows={3} />
          
          <Button variant="outlined" component="label">
            Upload Image
            <input type="file" accept="image/*" hidden onChange={handleImageUpload} />
            {uploading && <p>Uploading...</p>}
            {formData.image && (
            <img src={formData.image} alt="Uploaded preview" style={{ maxHeight: 150 }} />
            )}
          </Button>

          <Box display="flex" gap={2} mt={2}>
            <Button variant="contained" color="primary" onClick={handleSubmit}>ADD</Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default AddCard;
