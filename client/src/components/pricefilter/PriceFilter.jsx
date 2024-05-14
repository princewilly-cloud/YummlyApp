import React, { useState } from 'react';
import './PriceFilter.css'

const PriceFilter = () => {
  const [filter, setFilter] = useState('all');

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div className="price-filter">
      <label htmlFor="price-filter">Price:</label>
      <select id="price-filter" value={filter} onChange={handleFilterChange}>
        <option value="all">All Prices</option>
        <option value="$">$</option>
        <option value="$$">$$</option>
        <option value="$$$">$$$</option>
        <option value="$$$$">$$$$</option>
      </select>
    </div>
  );
};

export default PriceFilter;
