import express from "express";
import pg from "pg";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

const db = new pg.Client({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
});
db.connect();

app.post("/items", async (req, res) => {
  console.log(req.body);
  const result = await db.query(
    "INSERT INTO items (item_name, details, place, person_name, phone, img, status) values ($1, $2, $3, $4, $5, $6, $7);",
    [
      req.body.itemName,
      req.body.details,
      req.body.location,
      req.body.personName,
      req.body.phone,
      req.body.imgURL,
      req.body.status,
    ]
  );
});

app.get("/items", async (req, res) => {
  const result = await db.query("SELECT * FROM items;");
  res.send(result.rows);
});

app.post("/items/:id", async (req, res) => {
  const id = req.params.id;

  const result = await db.query(
    "UPDATE items SET item_name=$1, place=$2, details=$3, person_name=$4, phone=$5, img=$6 WHERE id=$7",
    [
      req.body.itemName,
      req.body.location,
      req.body.details,
      req.body.personName,
      req.body.phone,
      req.body.imgURL,
      id,
    ]
  );

  res.json({ success: true });
});

app.delete("/items/:id", async (req, res) => {
  const id = Number(req.params.id) + 1;
  console.log("Received DELETE for item ID:", id);

  try {
    const result = await db.query("DELETE FROM items WHERE id = $1", [id]);
    console.log("Rows affected:", result.rowCount);

    if (result.rowCount === 0) {
      // No item was deleted (e.g. wrong ID)
      return res.status(404).json({ error: "Item not found" });
    }

    res.status(200).json({ message: "Item deleted successfully" });
  } catch (err) {
    console.error("Error deleting item:", err);
    res.status(500).json({ error: "Failed to delete item" });
  }
});
app.listen(5000, () => {
  console.log("Server running");
});
