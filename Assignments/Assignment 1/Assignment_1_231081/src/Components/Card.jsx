import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
} from "@mui/material";

export default function ItemCard(props) {
  return (
    <Card
      key={props.id}
      sx={{
        mb: 3,
        boxShadow: 0,
        border: "1px solid gray",
        width: "450px",
        height: "450px",
      }}
    >
      <CardMedia
        component="img"
        image={props.imgURL}
        alt={props.itemName}
        sx={{
          height: "250px",
          objectFit: "contain",
          bgcolor: "rgb(198, 198, 198)",
        }}
      />
      <CardContent sx={{ height: "140px", lineHeight: 1 }}>
        <h4>{props.itemName}</h4>
        <p>Found : {props.location}</p>
        <p>Name : {props.name}</p>
        <p>Ph no : {props.contact}</p>
      </CardContent>
      <CardActions>
        <Button
          sx={{ boxShadow: 0, ":hover": { boxShadow: 0 }, ml: 1 }}
          variant="contained"
          size="small"
        >
          MORE
        </Button>
      </CardActions>
    </Card>
  );
}
