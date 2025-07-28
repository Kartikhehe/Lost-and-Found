import React from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, Button, Box } from '@mui/material';

function EditCard({ item, onClose }) {
  return (
    <Dialog open={true} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle textAlign={'center'}>
        <strong>Edit Item Details</strong></DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2} mt={1}>
          <TextField label="Item Name" defaultValue={item.title} fullWidth />
          <Box display="flex" gap={2}>
            <TextField label="Contact" defaultValue={item.contact} fullWidth />
            <TextField label="Phone no." defaultValue={item.phone} fullWidth />
          </Box>
          <TextField label="Image URL" defaultValue={item.image} fullWidth />
          <TextField label="Description" defaultValue={item.description} fullWidth multiline rows={3} />
          <Box display="flex" gap={2} mt={2}>
            <Button variant="contained" color="primary">EDIT</Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default EditCard;
