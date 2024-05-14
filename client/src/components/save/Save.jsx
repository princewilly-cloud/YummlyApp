import React from 'react';
import './Save.css'; 

function Save() {
  return (
    <button className='save-button'>
      <img className='save-icon' src="/save.png" alt="Save" />
      <p className='save-text'>Save</p>
    </button>
  );
}

export default Save;
