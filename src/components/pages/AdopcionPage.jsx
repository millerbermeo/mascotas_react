import React from 'react';
import Sidebar from '../organisms/Sidebar';
import LogoutButton from '../organisms/LogoutButton';
import { FaUser } from 'react-icons/fa';
import AdopTable from '../organisms/AdopTable';


const user = JSON.parse(localStorage.getItem('user'));


const AdopcionPage = () => (
  <div className="flex min-h-screen">
    <Sidebar />
    <div className="flex-grow  bg-gray-100">
      <div className='w-full px-5 h-20 bg-white flex items-center justify-between'>
        <div>  <h1 className="text-4xl font-bold">Dashboard</h1></div>
        <div className='flex items-center gap-2 px-5'>
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