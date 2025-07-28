import React, { useState , useEffect} from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, Button, Box , Typography} from '@mui/material';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';


const EditCard = ({ item, onClose, setItems }) => {
  const formattedDate = new Date(item.date).toLocaleDateString();
  const [formData, setFormData] = useState({
  title: item.title || '',
  status: item.status || '',
  contact: item.contact || '',
  phone: item.phone || '',
  place: item.place || '',
  description: item.description || '',
  date: formattedDate||'',
  image: item.image || '',
});

  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(item.image || '');
  const [editable, setEditable] = useState(false);


  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token);
      const id = decoded.id;
     if (item.user_id === id) {
        setEditable(true);
      }
    }
    //clean up the object URL when the component unmounts or imageFile changes
    return () => {
      if (previewUrl && imageFile) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [imageFile, previewUrl, item.user_id]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

   const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleImageUpload = async () => {
    const data = new FormData();
    data.append('image', imageFile);
    const res = await axios.post("http://localhost:5000/items/upload", data);
    return res.data.url ?? res.data.secure_url;
  };

  const handleSubmit = async () => {
    try {
      let imageUrl = formData.image;
      if (imageFile) imageUrl = await handleImageUpload();

      await axios.put(`http://localhost:5000/items/${item.id}`, { ...formData, image: imageUrl });
      const response = await axios.get('http://localhost:5000/items');
      setItems(response.data);
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Dialog open={true} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle textAlign={'center'}>
        <strong>Edit Item Details</strong></DialogTitle>
      <DialogContent>
        {!editable ? (
          <Typography color="error" textAlign="center" p={3}>
            You are not authorized to edit this item.
          </Typography>
        ) : (
        <Box display="flex" flexDirection="column" gap={2} mt={1}>
          <TextField name="title" label="Item Name" fullWidth margin="dense" value={formData.title} onChange={handleInputChange} />
          <Box display="flex" gap={2}>
            <TextField name="status" label="Status" fullWidth margin="dense" value={formData.status} onChange={handleInputChange} />
            <TextField name="place" label="Place found/lost" fullWidth margin="dense" value={formData.place} onChange={handleInputChange} />
            <TextField name="date" label="Date" type="date" fullWidth margin="dense" value={formData.date} onChange={handleInputChange} InputLabelProps={{ shrink: true }} /> 
          </Box>
          <Box display="flex" gap={2}>
            <TextField name="contact" label="Contact" fullWidth margin="dense" value={formData.contact} onChange={handleInputChange} />
            <TextField name="phone" label="Phone no." fullWidth margin="dense" value={formData.phone} onChange={handleInputChange} />
          </Box>
          <TextField name="description" label="Description" fullWidth margin="dense" multiline rows={3} value={formData.description} onChange={handleInputChange} />
          {previewUrl && (
              <>
                <Box textAlign="center">
                  <img
                    src={previewUrl}
                    alt="Item preview"
                    style={{ maxHeight: '200px', objectFit: 'contain', marginTop: '10px' }}
                  />
                </Box>
                <TextField
                  label="Image URL"
                  value={previewUrl}
                  fullWidth
                  margin="dense"
                  InputProps={{ readOnly: true }}
                />
              </>
            )}
          <Button variant="outlined" component="label">
            Upload New Image
            <input type="file" accept="image/*" hidden onChange={handleImageChange}  />
          </Button>
          <Box display="flex" gap={2} mt={2}>
            <Button onClick={handleSubmit} variant="contained" color="primary">EDIT</Button>
          </Box>
        </Box>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default EditCard;
