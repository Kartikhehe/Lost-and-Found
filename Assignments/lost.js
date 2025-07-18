function searchItems() {
  const query = document.getElementById("searchInput").value.toLowerCase();
  const cards = document.querySelectorAll(".card");

  cards.forEach(card => {
    const name = card.getAttribute("data-name");
    const location = card.getAttribute("data-location");

    if (name.includes(query) || location.includes(query)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}
function filterStatus(status) {
  const cards = document.querySelectorAll(".card");
  cards.forEach(card => {
    const isFound = card.classList.contains("found");
    const isLost = card.classList.contains("lost");

    if (
      status === "all" ||
      (status === "found" && isFound) ||
      (status === "lost" && isLost)
    ) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}

function filterCategory() {
  const selected = document.getElementById("categoryFilter").value;
  const cards = document.querySelectorAll(".card");

  cards.forEach(card => {
    const category = card.getAttribute("data-category");
    if (selected === "all" || selected === category) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}
function login() {
  window.location.href = "dashlost1.html";
}
function register() {
  window.location.href = "dashlost2.html";
}
function toggleDropdown() {
  const dropdown = document.getElementById("dropdown-menu");
  dropdown.classList.toggle("hidden");
}

function addItem(type) {
  alert("You clicked to add a " + type + " item!");
  // You can redirect or open a form modal here
  // Example: window.location.href = `add.html?type=${type}`;
}
function openModal() {
  document.getElementById("itemModal").style.display = "block";
}

function closeModal() {
  document.getElementById("itemModal").style.display = "none";
}

// Optional: Close modal when clicking outside the content
window.onclick = function (event) {
  const modal = document.getElementById("itemModal");
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
