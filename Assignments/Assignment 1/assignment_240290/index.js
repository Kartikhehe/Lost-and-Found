const addItemBtn = document.getElementById('items');
const itemModal = new bootstrap.Modal(document.getElementById('itemModal'));
const itemForm = document.getElementById('itemForm');
const clearFormButton = document.getElementById('clearFormButton');
const cardContainer = document.getElementById('cardContainer');
const submitBtn = document.getElementById('submitBtn');

addItemBtn.onclick = () => {
  itemForm.reset();
  submitBtn.disabled = false;
  itemModal.show();
};

function attachCardClickHandlers() {
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    card.onclick = () => {
      const title = card.querySelector('.card-title')?.textContent || '';
      const desc = card.querySelector('.card-desc')?.textContent || '';
      const image = card.querySelector('.card-image-top')?.src || '';
      const contact = card.querySelector('.card-contact')?.textContent || '';
      const phone = card.querySelector('.card-phone')?.textContent || '';

      document.getElementById('itemTitle').value = title;
      document.getElementById('itemDesc').value = desc;
      document.getElementById('itemImage').value = image;
      document.getElementById('itemContact').value = contact;
      document.getElementById('itemPhone').value = phone;

      submitBtn.disabled = true;
      itemModal.show();
    };
  });
}
attachCardClickHandlers();

itemForm.onsubmit = (e) => {
  e.preventDefault();

  const title = document.getElementById('itemTitle').value;
  const itemDesc = document.getElementById('itemDesc').value;
  const itemImage = document.getElementById('itemImage').value;
  const itemContact = document.getElementById('itemContact').value;
  const itemPhone = document.getElementById('itemPhone').value;

  const image = itemImage.trim() === '' ? 'default.jpg' : itemImage;

  createCard(title, itemDesc, image, itemContact, itemPhone);

  itemModal.hide();
  itemForm.reset();
};

clearFormButton.onclick = () => {
  itemForm.reset();
};

function createCard(title, itemDesc, image, itemContact, itemPhone) {
  const col = document.createElement('div');
  col.className = 'col d-flex'; 

  const cardHTML = `
    <div class="card rounded-3 shadow w-100"> <!-- w-100 ensures it fills full width -->
      <div class="card-header p-0">
        ${image.trim() 
          ? `<img src="${image}" class="card-image-top object-fit-contain" style="width: 100%; height: 200px; object-fit: contain;">` 
          : `<div style="height:200px; background:#eee;" class="d-flex align-items-center justify-content-center">No Image</div>`
        }
      </div>
      <div class="card-body">
        <div class="card-title"><h3 class="card-title">${title}</h3></div>
        <div class="card-text">
          <p class="card-desc">${itemDesc}</p>
        </div>
        <div class="card-text d-flex">
          <h6>Contact :</h6>
          <p class="card-contact ms-2">${itemContact}</p>
        </div>
        <div class="card-text d-flex">
          <h6>Phone :</h6>
          <p class="card-phone ms-2">${itemPhone}</p>
        </div>
        <div class="card-footer">
          <button class="btn btn-danger rounded-1 w-100 delete-btn">Delete</button>
        </div>
      </div>
    </div>
  `;

  col.innerHTML = cardHTML;

  col.querySelector('.delete-btn').onclick = (e) => {
    e.stopPropagation(); 
    col.remove();
  };

  col.querySelector('.card').onclick = () => {
    document.getElementById('itemTitle').value = title;
    document.getElementById('itemDesc').value = itemDesc;
    document.getElementById('itemImage').value = image;
    document.getElementById('itemContact').value = itemContact;
    document.getElementById('itemPhone').value = itemPhone;

    submitBtn.disabled = true;
    itemModal.show();
  };

  cardContainer.appendChild(col);
}

