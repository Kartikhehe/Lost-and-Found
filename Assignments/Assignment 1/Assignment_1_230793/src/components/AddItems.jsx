import React, { useState } from 'react'
import './AddItems.css'

function AddItems(props) {

  const [itemDetail, setItemDetail] = useState({
    item: "",
    imgURL: "",
    location: "",
    contName: "",
    contTel: ""
  }
  );

  function handleChange(event) {
    const { name, value } = event.target;
    setItemDetail(prevItemDetails => {
      return {
        ...prevItemDetails,
        [name]: value
      };
    }
    );

  }

  function submitItemDetails(event) {
    props.onAdd(itemDetail);
    props.onClickClose();
    event.preventDefault();
    setItemDetail({
      item: "",
      imgURL: "",
      location: "",
      contName: "",
      contTel: ""
    })
  }

  function closeAddItemCard(event) {
    props.onClickClose();
    event.preventDefault();
  }

  return (
    <div className='add-item-page'>
      <div className="add-item-card">
        <h2>Fill the Details Below</h2>
        <form>
          <input name='item' onChange={handleChange} value={itemDetail.item} placeholder='Name of the item' />
          <input name='imgURL' onChange={handleChange} value={itemDetail.imgURL} placeholder='Img URL' />
          <textarea name='location' onChange={handleChange} value={itemDetail.location} placeholder='Location' />
          <input name='contName' onChange={handleChange} value={itemDetail.contName} placeholder='Your Name' />
          <input name='contTel' onChange={handleChange} value={itemDetail.contTel} placeholder='Your Contact' />
          <button className='item-submit-button' onClick={submitItemDetails}>Add</button>

        </form>
        <button className='close-button' onClick={closeAddItemCard}>X</button>
      </div>
    </div>
  )
}

export default AddItems;
