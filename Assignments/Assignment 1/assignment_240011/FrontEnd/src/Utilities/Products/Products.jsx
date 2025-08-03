import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import itemsData from "./lost_items.json";
import SearchBar from "../Search/Search_box.jsx";

function LostAndFound() {
  const [searchText, setSearchText] = useState("");

  const filteredItems = {};
  for (const category in itemsData) {
    const matchingItems = itemsData[category].filter(item =>
      (item.name.toLowerCase().includes(searchText.toLowerCase()) ||
        item.id.toLowerCase().includes(searchText.toLowerCase()) ||
        item.location.toLowerCase().includes(searchText.toLowerCase()) ||
        category.toLowerCase().includes(searchText.toLowerCase()))
    );
    if (matchingItems.length > 0) {
      filteredItems[category] = matchingItems;
    }
  }

  return (
    <div className="container my-4">
      <SearchBar value={searchText} onChange={setSearchText} />

      {Object.keys(filteredItems).length === 0 ? (
        <p className="text-muted">No items found.</p>
      ) : (
        Object.keys(filteredItems).map((category) => (
          <div key={category} className="my-5">
            <h4 className="text-success">{category}</h4>
            <div className="d-flex flex-wrap gap-3">
              {filteredItems[category].map((item) => (
                <div
                  key={item.id}
                  className="card p-3"
                  style={{ width: "250px" }}
                >
                  <h5>{item.name}</h5>
                  <p>ID: {item.id}</p>
                  <p>{item.description}</p>
                  <p>
                    <strong>Location:</strong> {item.location}
                  </p>
                  <p>
                    <strong>Contact:</strong> {item.contact}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default LostAndFound;

