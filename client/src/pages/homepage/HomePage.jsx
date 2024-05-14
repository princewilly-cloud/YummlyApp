
import SearchBar from '../../components/search/SearchBar'
import './HomePage.css'
import Card from '../../components/card/Card'
import {React,useState, useEffect} from 'react';
import Yelp from "../../utils/Yelp";



const HomePage = () => {
  //Save the list of businesses
  const [businesses, setBusinesses] = useState([]); 
  const [loading, setLoading] = useState(true);

 
    //Searching the Yelp API based on user query
    const searchYelp = async (term, location, sortBy) => {
      try {
        const businesses = await Yelp.search(term, location, sortBy);
        setBusinesses(businesses);
        setLoading(false); // Set loading to false when data is fetched
      } catch (error) {
        console.error('Error fetching data from Yelp API:', error);
        setLoading(false); // Set loading to false even if there's an error
        setBusinesses([]); // Set businesses to an empty array in case of error
      }
    };
    

      // Use useEffect to load data when the component mounts
    useEffect(() => {
      // Specify default search parameters
      const defaultTerm = 'Russian'; 
      const defaultLocation = 'Washington DC'; 
      const defaultSortBy = 'best_match'; 
    
      // Call searchYelp with default parameters
      searchYelp(defaultTerm, defaultLocation, defaultSortBy);
      
     }, []);

  return (
    <div className='homepage'>
      <div className='searchcontainer'>
        <SearchBar searchYelp={searchYelp}/>
      </div>
      <div className='defaultbusinesslist'>
      {loading ? (
          <p>Loading...</p>
        ) : (
          businesses && businesses.length > 0 ? (
            businesses.map((item) => (
              <Card key={item.id} item={item} />
            ))
          ) : (
            <p>No businesses found</p>
          )
        )}
      </div>

    </div>
  )
}

export default HomePage


