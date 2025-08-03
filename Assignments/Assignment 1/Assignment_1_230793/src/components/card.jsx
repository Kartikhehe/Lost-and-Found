import React from 'react';
import ReactDOM from 'react-dom/client';

function Card(props) {

  function handleClick() {
    props.onDelete(props.id)
  }

  return (
    <div className="lost-card">
      <div className="img-container">
        <img src={props.img} alt="lost-found-img" />
      </div>
      <div className="item-details">
        <p>{props.name}</p>
        <div className="item-location">
          {props.location}
        </div>
        <div className="contact-details">
          <div className="contact-name">
            <div style={{ fontWeight: '500', marginRight: '10px' }}>Contact:</div>
            <div>{props.contName}</div>
          </div>
          <div className="contact-no">
            <div style={{ fontWeight: '500', marginRight: '10px' }}>Phone:</div>
            <div>{props.contTel}</div>
          </div>
        </div>
        <button onClick={handleClick}>DELETE</button>
      </div>
    </div>
  );
}

export default Card;