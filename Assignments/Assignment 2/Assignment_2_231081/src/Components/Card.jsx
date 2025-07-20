import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EditIcon from "@mui/icons-material/Edit";
import EditPopup from "./EditPopup";

export default function ItemCard({
  id,
  details,
  onDelete,
  handleOpen,
  setHeading,
  setDetails,
  setURL,
}) {
  const date = details.created_at.substring(0, 10);
  const time = details.created_at.substring(11, 16);

  const deleteItem = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (!confirmed) return;

    try {
      const response = await fetch(`http://localhost:5000/items/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        onDelete(id);
      } else {
        const error = await response.json();
        console.error("Delete failed:", error.message);
      }
    } catch (err) {
      console.error("Error deleting item:", err);
    }
  };

  // const editItem = () => {};

  return (
    <Card
      sx={{
        mb: 3,
        boxShadow: 0,
        border: "1px solid gray",
        width: "450px",
        height: "475px",
        position: "relative",
        marginBottom: "40px",
        "&:hover .checkmark": {
          visibility: "visible",
        },
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <IconButton
          className="checkmark"
          size="large"
          sx={{ position: "absolute", visibility: "hidden" }}
          aria-label="fingerprint"
          variant="contained"
          color="success"
          onClick={deleteItem}
        >
          <CheckCircleIcon fontSize="large" />
        </IconButton>

        <IconButton
          className="checkmark"
          size="large"
          sx={{ position: "absolute", right: 0, visibility: "hidden" }}
          aria-label="fingerprint"
          variant="contained"
          color="primary"
          onClick={() => {
            handleOpen();
            details.status === "Found"
              ? setHeading("Update Found Item")
              : setHeading("Update Lost Item");
            setDetails(details);
            setURL(details.img);
            // console.log(details);
          }}
        >
          <EditIcon fontSize="large" />
        </IconButton>
      </div>

      <CardMedia
        component="img"
        image={details.img}
        alt={details.item_name}
        sx={{
          height: "250px",
          objectFit: "contain",
          bgcolor: "rgb(198, 198, 198)",
        }}
      />
      <CardContent sx={{ height: "140px", lineHeight: 1 }}>
        <h4>{details.item_name}</h4>
        <p>
          Posted at: {date}, {time}
        </p>
        <p>Description: {details.details}</p>
        <p>
          {details.status} : {details.place}
        </p>
        <p>Name : {details.person_name}</p>
        <p>Ph no : {details.phone}</p>
      </CardContent>
      {/* <CardActions>
        <Button
          sx={{ boxShadow: 0, ":hover": { boxShadow: 0 }, ml: 1 }}
          variant="contained"
          size="small"
        >
          MORE
        </Button>
      </CardActions> */}
    </Card>
  );
}
