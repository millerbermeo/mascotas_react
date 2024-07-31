import React from 'react'
import Navbar from '../organisms/Navbar';

const MainLayout2 = ({children}) => {

    const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');

    const menuItems = [
        { label: 'Home', to: '/' },
        { label: 'Mascotas', to: '/pets' },
        { label: 'login', to: '/login' },
      ];


    
      const authMenuItems = [
        { label: 'Home', to: '/' },
        { label: 'Mascotas', to: '/pets' },
        { label: 'Adopciones', to: '/adop' },   
      ];

      const finalMenuItems = token && user ? authMenuItems : menuItems;


  return (
   <>
    <div className='w-full max-w-full min-h-screen bg-[#AEC6CF]'>
    <Navbar brand="AdopMe" menuItems={finalMenuItems} />
        {children}
    </div>
   </>
  )
}

export default MainLayout2