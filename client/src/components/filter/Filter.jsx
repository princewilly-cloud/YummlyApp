import React from 'react'
import './Filter.css'
import PriceFilter from '../pricefilter/PriceFilter'

//This is the Search Filter component
function Filter() {
  return (
    <div className='filter'>
      <h1>Search results for <b>London</b></h1>
      <div className='bottom'>
        <PriceFilter/>
      </div>

    </div>
  )
}

export default Filter