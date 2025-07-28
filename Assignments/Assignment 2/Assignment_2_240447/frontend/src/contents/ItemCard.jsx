import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import {
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';

function ItemCard({item, onClick, setItems}){
const formattedDate = new Date(item.date).toLocaleDateString('en-GB', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric'
});
    const [showActions, setShowActions] = useState(false);
    const [openConfirm, setOpenConfirm] = useState(false);

    useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    const payload = jwtDecode(token);
    if (payload.id === item.user_id) {
      setShowActions(true);
    }
  }, [item.user_id]);

    const handleDelete = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:5000/items/${item.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setItems((prevItems) => prevItems.filter((i) => i.id !== item.id));
    } catch (err) {
      console.error('Delete failed:', err);
    } finally {
      setOpenConfirm(false);
    }
  };
    return (
    <>
        <Card sx={{ width: 300, minHeight: 550, display: 'flex', flexDirection: 'column' , justifyContent: 'space-between'}}>
            <CardMedia component="img" height="300" image={item.image} alt={item.title} />
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" sx={{fontFamily:'Raleway, sans-serif', fontWeight: 1000}}>{item.title}</Typography>
                <Typography variant="body1" sx={{ fontFamily:'Raleway, sans-serif', mb: 1 , fontWeight: 500}}>
                    {item.description}
                </Typography>
            </CardContent>
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="body1" sx={{  mb: 1 }}>
                    <strong>Status:</strong> {item.status}
                </Typography>
                <Typography variant="body1" sx={{  mb: 1 }}>
                    <strong>Place {item.status}:</strong> {item.place}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                    <strong>Date {item.status}:</strong> {formattedDate}
                </Typography>
                <Typography variant="body1" sx={{  mb: 1 }}>
                    <strong>Contact:</strong> {item.contact}
                </Typography>
                <Typography variant="body1" sx={{  mb: 1 }}>
                    <strong>Phone no. :</strong> {item.phone}
                </Typography>
            </CardContent>
            {showActions && (
            <CardActions>
                <Button color="primary" variant="contained" onClick={onClick}>EDIT</Button>
                <Button color="error" variant="contained" onClick={() => setOpenConfirm(true)}>DELETE
                </Button>
            </CardActions>
             )}
        <Dialog open={openConfirm} onClose={() => setOpenConfirm(false)}>
            <DialogTitle>Are you sure you want to delete this item?</DialogTitle>
            <DialogContent>
                <Typography>This action cannot be undone.</Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpenConfirm(false)}>Cancel</Button>
                <Button onClick={handleDelete} color="error" variant="contained">Delete</Button>
            </DialogActions>
        </Dialog>
        </Card>
    </>
    );
}

export default ItemCard;