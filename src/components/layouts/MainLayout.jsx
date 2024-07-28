import React from 'react'
import Navbar from '../organisms/Navbar';

const MainLayout = ({children}) => {

    const menuItems = [
        { label: 'Home', to: '/' },
        { label: 'Mascotas', to: '/pets' },
      ];

  return (
   <>
    <div className='w-full max-w-full bg-[#AEC6CF] max-h-screen h-screen overflow-hidden'>
    <Navbar brand="AdopMe" menuItems={menuItems} />
        {children}
    </div>
   </>
  )
}

export default MainLayout