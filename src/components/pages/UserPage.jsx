import React from 'react';
import Sidebar from '../organisms/Sidebar';
import UserTable from '../organisms/UserTable';
import LogoutButton from '../organisms/LogoutButton';
import { FaUser } from 'react-icons/fa';

const user = JSON.parse(localStorage.getItem('user'));

const UserPage = () => (
  <div className="flex min-h-screen">
    <Sidebar />
    <div className="flex-grow bg-gray-100">
    <div className='w-full px-5 h-20 bg-white flex items-center justify-between'>
    <div>  <h1 className="text-4xl font-bold">Usuarios</h1></div>
    <div className='flex items-center gap-2 px-5'>
          <button className='w-12 h-12 rounded-full text-2xl bg-slate-200 flex justify-center items-center'>
            <FaUser className='text-darkBlue' />
          </button>
          <span className='text-lg font-medium text-darkBlue'>{user && user.nombre ? user.nombre : ''}</span>
          <LogoutButton />
        </div>
   </div>

      <div className='p-8'>
      <UserTable/>
      </div>
    </div>
  </div>
);



export default UserPage