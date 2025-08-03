const itemModal = document.getElementById("itemModal");
const editModal = document.getElementById("editItemModal");
const updateBtn = document.getElementById("updateBtn");
const deleteBtn = document.getElementById("deleteBtn");
let currentCard = null;
function openModal() {
  itemModal.style.display = "block";
}

function closeModal() {
  itemModal.style.display = "none";
}
function openEditModal(card) {
  currentCard = card;
  const name = card.querySelector("p:nth-child(2)").innerText.replace("Item:", "").trim();
  const state = card.querySelector("p:nth-child(3)").innerText.replace("State:", "").trim();
  const place = card.querySelector("p:nth-child(4)").innerText.replace("Losing place:", "").replace("Found place:", "").trim();
  const contact = card.querySelector("p:nth-child(5)").innerText.replace("Contact (if found):", "").replace("Contact no.:", "").trim();
  const imgSrc = card.querySelector("img").src;

  document.getElementById("editItemName").value = name;
  document.getElementById("editItemState").value = state;
  document.getElementById("editItemPlace").value = place;
  document.getElementById("editItemContact").value = contact;
  document.getElementById("editItemImage").value = imgSrc;

  editModal.style.display = "block";
}

function closeEditModal() {
  editModal.style.display = "none";
}

function addItem() {
  const name = document.getElementById("Item").value;
  const state = document.getElementById("State").value;
  const place = document.getElementById("Place").value;
  const contact = document.getElementById("Contact").value;
  const imageURL = document.getElementById("ImageURL").value || "placeholder.png";

  const card = document.createElement("div");
  card.className = "item-card";
  card.innerHTML = `
    <img src="${imageURL}" alt="${name}" />
    <p><strong>Item:</strong> ${name}</p>
    <p><strong>State:</strong> ${state}</p>
    <p><strong>${state === "Found" ? "Found" : "Losing"} place:</strong> ${place}</p>
    <p><strong>${state === "Found" ? "Contact no." : "Contact (if found):"}</strong> ${contact}</p>
    <button class="delete-btn" onclick="this.parentElement.remove()">DELETE</button>
  `;

  document.getElementById("item-list").appendChild(card);
  closeModal();
}

updateBtn.onclick = function () {
  if (!currentCard) return;

  const newName = document.getElementById("editItemName").value;
  const newState = document.getElementById("editItemState").value;
  const newPlace = document.getElementById("editItemPlace").value;
  const newContact = document.getElementById("editItemContact").value;
  const newImg = document.getElementById("editItemImage").value;

  currentCard.querySelector("img").src = newImg;
  currentCard.querySelector("p:nth-child(2)").innerHTML = `<strong>Item:</strong> ${newName}`;
  currentCard.querySelector("p:nth-child(3)").innerHTML = `<strong>State:</strong> ${newState}`;
  currentCard.querySelector("p:nth-child(4)").innerHTML = `<strong>${newState === "Found" ? "Found" : "Losing"} place:</strong> ${newPlace}`;
  currentCard.querySelector("p:nth-child(5)").innerHTML = `<strong>${newState === "Found" ? "Contact no." : "Contact (if found):"}</strong> ${newContact}`;

  closeEditModal();
};

deleteBtn.onclick = function () {
  if (currentCard) {
    currentCard.remove();
    closeEditModal();
  }
};
window.onclick = function (event) {
  if (event.target == itemModal) closeModal();
  if (event.target == editModal) closeEditModal();
};
function login() {
  window.location.href = "dashboard1.html";
}
function register() {
  window.location.href = "dashboard2.html";
}
