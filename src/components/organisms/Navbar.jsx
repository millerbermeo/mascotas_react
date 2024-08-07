import React, { useState, useEffect } from 'react';
import NavMenu from '../molecules/NavMenu';
import logo from '../../assets/logo2.png';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ brand, menuItems }) => {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);



  const validar = ()=> {
   
      const token = localStorage.getItem('token');
      const user = JSON.parse(localStorage.getItem('user'));
  
      if (token && user?.rol === 'admin') {
        navigate('/dashboard');
      } else {
        navigate('/login');
      }
   
  }

  return (
    <nav className={`z-10 p-4 flex justify-between items-center fixed w-full transition-colors duration-300 ${scrolled ? 'bg-sky-200 shadow-black' : 'bg-transparent'}`}>
      <div className='w-72'>
        <img className={`duration-300 transition-all ${scrolled ? 'static w-16 rounded-full' : 'absolute w-40 top-2'}`} src={logo} alt="" />
      </div>
      <NavMenu items={menuItems} />
      <div className='w-72 flex justify-end'>
        {/* <Link to="/login"> */}
          <div onClick={validar} className="ml-4 w-12 z-50 p-1 rounded-full ">
            <img src="admin.png" className='z-50' alt="" />
          </div>
        {/* </Link> */}
      </div>
    </nav>
  );
};

export default Navbar;
