import React from 'react';
import {
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  CardActions,
} from '@mui/material';

function ItemCard({item, onClick}){
    return (
        <Card sx={{ width: 300, height: 450, display: 'flex', flexDirection: 'column' , justifyContent: 'space-between'}}>
            <CardMedia component="img" height="200" image={item.image} alt={item.title} />
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" sx={{fontFamily:'Raleway, sans-serif', fontWeight: 1000}}>{item.title}</Typography>
                <Typography variant="body2" sx={{ fontFamily:'Raleway, sans-serif', mb: 1 , fontWeight: 500}}>
                    {item.description}
                </Typography>
            </CardContent>
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="body2" sx={{ fontFamily:'Raleway, sans-serif', mb: 1 }}>
                    <strong>Contact:</strong> {item.contact}
                </Typography>
                <Typography variant="body2" sx={{ fontFamily:'Raleway, sans-serif', mb: 1 }}>
                    <strong>Phone:</strong> {item.phone}
                </Typography>
            </CardContent>
            <CardActions>
                <Button color="primary" variant="contained" onClick={onClick}>EDIT</Button>
                <Button color="error" variant="contained" >DELETE</Button>
            </CardActions>
        </Card>
    );
}

export default ItemCard;