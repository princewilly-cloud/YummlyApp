
import './SearchBar.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

//The Search Options
const sortByOptions = {
  "Best Match": "best_match",
  "Highest Rated": "rating",
  "Most Reviewed": "review_count",
};

 //Storing the search input from the home page
const SearchBar = ({ searchYelp }) => {
  const [term, setTerm] = useState("");
  const [location, setLocation] = useState("");
  const [sortBy, setSortBy] = useState("best_match");

  // Use useNavigate for navigation
  const navigate = useNavigate(); 

  const handleSortByChange = (sortByOption) => {
    setSortBy(sortByOption);
  };

  const handleTermChange = (event) => {
    setTerm(event.target.value);
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleSearch = (event) => {
    event.preventDefault();
  const businesses = searchYelp(term, location, sortBy);

    // Navigate to the ListPage with search information as query parameters
    navigate(`/list?term=${term}&location=${location}&sortBy=${sortBy}`);
  };

  const renderSortByOptions = () => {
    return Object.keys(sortByOptions).map((sortByOption) => {
      const sortByOptionValue = sortByOptions[sortByOption];
      return (
        <li
          className={sortBy === sortByOptionValue ? 'active' : ''}
          key={sortByOptionValue}
          onClick={() => handleSortByChange(sortByOptionValue)}
        >
          {sortByOption}
        </li>
      );
    });
  };

  return (
    <div className='SearchBar'>
      <div className="SearchBarSortOptions">
        <ul>{renderSortByOptions()}</ul>
      </div>
      <form onSubmit={handleSearch}>
        <div className="SearchBarFields">
          <input placeholder="Search Businesses" onChange={handleTermChange} />
          <input placeholder="Where?" onChange={handleLocationChange} />
        </div>
        <div className="SearchBarSubmit">
          <button type="submit">Let's Go</button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
