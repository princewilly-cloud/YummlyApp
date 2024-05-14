import React,{useEffect,useState} from 'react';
import './ListPage.css';
import Filter from '../../components/filter/Filter';
import Card from '../../components/card/Card';
import { useLocation } from 'react-router-dom';
import Yelp from "../../utils/Yelp";


function ListPage() {
  
  //to get the URL of the List Page
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const term = queryParams.get('term') || '';
  const locationParam = queryParams.get('location') || '';
  const sortBy = queryParams.get('sortBy') || '';

   //Save the list of businesses
   const [businesses, setBusinesses] = useState([]); 

   //Searching the Yelp API based on user query
   const searchYelp = async (term, locationParam, sortBy) => {
     const businesses = await Yelp.search(term, locationParam, sortBy);
     setBusinesses(businesses);
   };

   useEffect(() => {
    searchYelp(term, locationParam, sortBy);
  }, [term, locationParam, sortBy]);

  return (
    <div className="listPage">
      <Filter />
      <div className="cardContainer">
        {businesses.map((item) => (
          <Card key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

export default ListPage;

