import React, { useEffect, useState } from 'react';
import './Restaurant.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Yelp_Business_Detail from "../../utils/YelpBusinessDetails";

function Restaurant() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const businessId = queryParams.get('id') || '';
  const [business, setBusiness] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const searchYelp = async () => {
      try {
        const business = await Yelp_Business_Detail.search(businessId);
        setBusiness(business);
      } catch (error) {
        console.error('Error fetching business details:', error);
      }
    };

    if (businessId) {
      searchYelp();
    }
  }, [businessId]);

  const handleReviewClick = () => {
    if (business) {
      navigate(`/writeareview?businessName=${encodeURIComponent(business.name)}`);
    }
  };

  if (!business) {
    return <div>Loading...</div>;
  }

  return (
    <div className="restaurantcontainer">
      <div className='top_section_restaurant'>
        <div className="restaurantimageContainer">
          <img src={business.imageSrc} alt="" />
        </div>
        <div className="buttons-container">
          <button onClick={handleReviewClick}>Write a Review</button>
        </div>
      </div>
      <div className='restaurant-details-container'>
        <div className='restaurantnameContainer'>
          <h1 className="selected_restaurant_name">
            {business.name}
          </h1>
        </div>
        <div className="bizinfo">
          <span className='pricedetails'>{business.price}</span>
          <div className="bizaddress">
            <img src="/pin.png" alt="" />
            <div>
              <p>{business.address}</p>
              <p>{business.city}</p>
              <p>{`${business.state} ${business.zipCode}`}</p>
            </div>
          </div>
          <div className='bizreview'>
            <h3>{business.category.toUpperCase()}</h3>
            <h3 className='rating'>{`${business.rating} stars`}</h3>
            <p>{`${business.reviewCount} reviews`}</p>
          </div>
        </div>
      </div>
      <div className='bottom_section_restaurant'>
        <h2>About the Business</h2>
        <div className='bizdescription'>
          <p>{business.description}</p>
        </div>
      </div>
    </div>
  );
}

export default Restaurant;
