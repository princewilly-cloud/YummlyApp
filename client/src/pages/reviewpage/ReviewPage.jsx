import React from 'react';
import './ReviewPage.css';
import { useLocation } from 'react-router-dom';

function ReviewPage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const businessName = queryParams.get('businessName');

  const handleSubmitReview = (event) => {
    event.preventDefault();
  };

  return (
    <div className='reviewpagecontainer'>
      <h1>{businessName}</h1>
      <form onSubmit={handleSubmitReview}>
        <textarea type='text' placeholder='What is in your mind?' />
        <button className="postreview_button" type='submit'>
          Post Review
        </button>
      </form>
    </div>
  );
}

export default ReviewPage;
