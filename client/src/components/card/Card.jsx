import React from 'react';
import './Card.css';
import { useNavigate } from 'react-router-dom';

function Card({ item }) {
  const navigate = useNavigate();

  // Define the route to the restaurant page with the restaurant details as state
  const restaurantRoute = `/restaurant?id=${item.id}`;

  const handleClick = () => {
    // Navigate to the restaurant page with restaurant details as state
    navigate(restaurantRoute);
  };
  
  return (
    <div className="card" onClick={handleClick}>
      <div className="imageContainer">
        <img src={item.imageSrc} alt="" />
      </div>
      <div className='restaurantnameContainer'>
        <h2 className="restaurantname">{item.name}</h2>
        <span className='pricedetails'>{item.price}</span>
      </div>
      <div className="businessinformation">
        <div className="businessaddress">
          <img src="/pin.png" alt="" />
          <div>
            <p>{item.address}</p>
            <p>{item.city}</p>
            <p>{`${item.state} ${item.zipCode}`}</p>
          </div>
        </div>
        <div className='businessreview'>
          <h3>{item.category.toUpperCase()}</h3>
          <h3 className='rating'>{`${item.rating} stars`}</h3>
          <p>{`${item.reviewCount} reviews`}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;



