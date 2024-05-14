import React from 'react'
import NavBar from '../../components/navbar/NavBar'
import { Outlet } from 'react-router-dom'

//Create a basic layout for all the rest of the pages
function Layout() {

  return (
    <div className='layout'>
        <div className = 'navcontainer'>
            <NavBar/>
        </div>
        <div className='content'>
            <Outlet/>
        </div>

    </div>
  )
}

export default Layout