import Navbar from "../Components/Navbar";
import "./home.css";
import SearchBar from "../Components/SearchBar";
import ItemCard from "../Components/Card";
import itemList from "../itemlist";
import Popup from "../Components/Popup";
import { useState } from "react";

export default function Home() {
  const [heading, setHeading] = useState("");

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Navbar />

      <main>
        <SearchBar handleOpen={handleOpen} setHeading={setHeading} />
        <Popup open={open} handleClose={handleClose} heading={heading} />
        <div className="items">
          {itemList.map((item) => (
            <ItemCard
              key={item.id}
              imgURL={item.imgURL}
              itemName={item.itemName}
              location={item.location}
              name={item.name}
              contact={item.contact}
            />
          ))}
        </div>
      </main>
    </>
  );
}
