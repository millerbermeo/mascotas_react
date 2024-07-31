import React from 'react';
import { MdOutlinePets } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

const NavButton = () => {
  const navigate = useNavigate();

  const pets = () => {
    navigate('/pets');
  };

  return (
    <button onClick={pets} className='w-[50px] z-50 h-[50px] rounded-full text-2xl bg-slate-200 flex justify-center items-center'>
      <MdOutlinePets className='text-darkBlue text-3xl'/>
    </button>
  );
};

export default NavButton;
