import React from 'react';
import Sidebar from '../organisms/Sidebar';
import LogoutButton from '../organisms/LogoutButton';
import { FaUser } from 'react-icons/fa';
import AdopTable from '../organisms/AdopTable';
import NavButton from '../molecules/NavButton';


const user = JSON.parse(localStorage.getItem('user'));


const AdopcionPage = () => (
  <div className="flex min-h-screen">
  <div className='w-64 h-screen flex bg-red-300'>
    <Sidebar />
    </div>
    <div className="flex-grow  bg-gray-100">
      <div className='w-full px-5 h-20 bg-white flex items-center justify-between'>
        <div>  <h1 className="text-4xl font-bold">Adopciones</h1></div>
        <div className='flex items-center gap-2 px-5'>
          <NavButton/>
          <button className='w-12 h-12 rounded-full text-2xl bg-slate-200 flex justify-center items-center'>
            <FaUser className='text-darkBlue' />
          </button>
          <span className='text-lg font-medium text-darkBlue'>{user && user.nombre ? user.nombre : ''}</span>
          <LogoutButton />
        </div>

      </div>
      <div className='p-8'>
        <AdopTable />
      </div>
    </div>
  </div>
);


export default AdopcionPage