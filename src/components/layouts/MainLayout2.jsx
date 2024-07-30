import React from 'react'
import Navbar from '../organisms/Navbar';

const MainLayout2 = ({children}) => {

    const menuItems = [
        { label: 'Home', to: '/' },
        { label: 'Mascotas', to: '/pets' },
        { label: 'login', to: '/login' },
        { label: 'Adopciones', to: '/adop' },   
      ];

  return (
   <>
    <div className='w-full max-w-full bg-[#AEC6CF]'>
    <Navbar brand="AdopMe" menuItems={menuItems} />
        {children}
    </div>
   </>
  )
}

export default MainLayout2