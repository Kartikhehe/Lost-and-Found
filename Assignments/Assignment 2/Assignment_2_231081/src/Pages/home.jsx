import Navbar from "../Components/Navbar";
import "./home.css";
import SearchBar from "../Components/SearchBar";
import ItemCard from "../Components/Card";
import itemList from "../itemlist";
import Popup from "../Components/Popup";
import { useState, useEffect } from "react";
import EditPopup from "../Components/EditPopup";

export default function Home() {
  const [heading, setHeading] = useState("");

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [details, setDetails] = useState({});
  const [url, setURL] = useState("");
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await fetch("http://localhost:5000/items");
        const data = await res.json();
        console.log(data);
        setItems(data);
      } catch (err) {
        console.error("Failed to fetch items:", err);
      }
    };

    fetchItems();
  }, []);

  const handleDelete = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <>
      <Navbar />

      <main>
        <SearchBar handleOpen={handleOpen} setHeading={setHeading} />
        <Popup open={open} handleClose={handleClose} heading={heading} />
        <EditPopup
          imgURL={url}
          open={open}
          handleClose={handleClose}
          heading={heading}
          details={details}
        />
        <div className="items">
          {items.map((item) => {
            return (
              <ItemCard
                setDetails={setDetails}
                setURL={setURL}
                handleOpen={handleOpen}
                setHeading={setHeading}
                key={item.id}
                id={item.id}
                details={item}
                onDelete={handleDelete}
              />
            );
          })}
        </div>
      </main>
    </>
  );
}
