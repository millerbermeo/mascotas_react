import React, { useState, useEffect } from 'react';
import NavMenu from '../molecules/NavMenu';
import Button from '../atoms/Button';
import logo from '../../assets/logo2.png';

const Navbar = ({ brand, menuItems, onButtonClick }) => {
  const [scrolled, setScrolled] = useState(false);

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

  return (
    <nav className={`z-50 p-4 flex justify-between items-center fixed w-full transition-colors duration-300 ${scrolled ? 'bg-sky-200 shadow-black' : 'bg-transparent'}`}>
      <div><img className={`duration-300 transition-all ${scrolled ? 'static w-16 rounded-full' : 'absolute w-40 top-2'}`} src={logo} alt="" /></div>
      <NavMenu items={menuItems} />
      <Button onClick={onButtonClick} className="ml-4">
        Menu
      </Button>
    </nav>
  );
};

export default Navbar;
