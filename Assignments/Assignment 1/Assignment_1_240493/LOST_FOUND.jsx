import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  TextField,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Container,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";


const initialItems = [
  {
    id: 1,
    title: "SMART WATCH",
    Found: "DJAC Building",
    colours: "Black",
    CompanyName: "Apple",
    image: "https://cdn1.smartprix.com/rx-iCHo5S4WB-w1200-h1200/CHo5S4WB.jpg"
  },
  {
    id: 2,
    title: "MOBILE",
    Found: "L7",
    colours: "Silver",
    CompanyName: "VIVO",
    image: "https://th.bing.com/th/id/OIP.3m-Dt58Xz4i7Nf6tlai3UAHaJL?rs=1&pid=ImgDetMain"
  },
  {
    id: 3,
    title: "EARPOD",
    Found: "OAT Stairs",
    colours: "Green",
    CompanyName: "BOAT",
    image: "https://th.bing.com/th/id/OIP.JJL62yozc49yoZcZH2qxfAHaHa?rs=1&pid=ImgDetMain"
  },
  {
    id: 4,
    title: "EARPOD",
    Found: "Audi",
    colours: "White",
    CompanyName: "Oneplus",
    image: "https://th.bing.com/th/id/OIP.JJL62yozc49yoZcZH2qxfAHaHa?rs=1&pid=ImgDetMain"
  }

  
];


export default function LOST_FOUND() {
  const [items, setItems] = useState(initialItems);
  const [search, setSearch] = useState("");

   const navigate = useNavigate();
  const filteredItems = items.filter(
    (item) =>
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.code.toLowerCase().includes(search.toLowerCase())
  );

  const deleteItem = (id) => {
    setItems(items.filter((c) => c.id !== id));
  };
   const [selectedItem, setSelectedItem] = useState(null);
const [open, setOpen] = useState(false);
// const [openModal, setOpenModal] = useState(false);

const handleEditClick = (item) => {
  setSelectedItem(item);
  setOpen(true);
};

const handleClose = () => {
  setOpen(false);
  setSelectedItem(null);
};

const handleItemChange = (e) => {
  setSelectedItem({ ...selectedItem, [e.target.name]: e.target.value });
};

const handleUpdate = () => {
  setItems(items.map((c) => c.id === selectedItem.id ? selectedItem : c));
  handleClose();
};





  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h6">LOST AND FOUND</Typography>
          <Button onClick={() => navigate('/login')} style={{ background: 'white', border: 'none', padding: '8px 16px', borderRadius: '4px', fontWeight: 'bold' }} >LOGIN</Button>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 4 }}>
        <TextField
          fullWidth
          label="Search Item by name or Found At..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          variant="outlined"
          sx={{ mb: 4 }}
        />

        <Grid container spacing={3}>
          {filteredItems.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <Card>
                <CardMedia
                  component="img"
                  height="160"
                  image={item.image}
                  alt={item.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    Item Name: {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>found AT:</strong> {item.Found}<br />
                    <strong>Item Colour:</strong> {item.colours}<br />
                    <strong>Item Company:</strong> {item.CompanyName}
                  </Typography>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => deleteItem(item.id)}
                    sx={{ mt: 2 }}
                  >
                    DELETE
                  </Button>

                  <Button
                    variant="outlined"
                    color="primary"
                onClick={() => handleEditClick(item)}
                 sx={{ mt: 1, ml: 1 }}
                >
               EDIT
                 </Button>

                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ textAlign: "center", mt: 6 }}>
          <Button variant="contained" color="primary">
            + ADD ITEM
          </Button>
        </Box>

        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          sx={{ mt: 6 }}
        >
          © 2025 Jayendra Singh. All rights reserved.
        </Typography>
      </Container>

       
    

      <Dialog open={open} onClose={handleClose} fullWidth>
  <DialogTitle>Edit Item Details</DialogTitle>
  <DialogContent>
    <TextField
      margin="dense"
      name="title"
      label="Item Name"
      fullWidth
      value={selectedItem?.title || ""}
      onChange={handleItemChange}
    />
    <TextField
      margin="dense"
      name="code"
      label="Found At"
      fullWidth
      value={selectedItem?.Found || ""}
      onChange={handleItemChange}
    />
    <TextField
      margin="dense"
      name="colour of item"
      label="Colour of Item"
      type="number"
      fullWidth
      value={selectedItem?.colours || ""}
      onChange={handleItemChange}
    />
    <TextField
      margin="dense"
      name="image"
      label="Image URL"
      fullWidth
       value={selectedItem?.image || ""}
      onChange={handleItemChange}
    />
    <TextField
      margin="dense"
      name="description"
      label="Item Company Name"
      fullWidth
      multiline
      rows={3}
      value={selectedItem?.CompanyName || ""}
      onChange={handleItemChange}
    />
  </DialogContent>
  <DialogActions>
    <Button onClick={handleClose}>Cancel</Button>
    <Button variant="contained" onClick={handleUpdate}>Submit</Button>
  </DialogActions>
</Dialog>

    </Box>
  );
}
