import { useContext, useState, useEffect } from 'react';
import { ColorModeContext } from '../contexts/ColorMode';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../assets/Logo/Logo.png';
import DarkMode from '../assets/Switch/dark.png';
import LightMode from '../assets/Switch/light.png';
import NavWhite from '../assets/Nav/Nav_white.png';
import NavDark from '../assets/Nav/Nav_dark.png';
import Nav from '../components/Nav';

export default function Header() {
  const { handleMode, darkMode } = useContext(ColorModeContext);
  const [navActive, setNavActive] = useState(false);
  const location = useLocation();
  let isEnterMenu = location.pathname === '/';

  const handleNav = () => {
    setNavActive(!navActive);
  };

  useEffect(() => {
    if (navActive) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [navActive]);

  return (
    <header className="w-full h-1/5 bg-valentino-red flex justify-center items-center dark:bg-white shadow-custom">
      {navActive ? <Nav  navActive={navActive} handleNav={handleNav}  /> :  null}
      <hr className="w-full dark:border-valentino-red" />
      <Link to={'/menu'} className="cursor-pointer z-10">
        <img src={Logo} alt="valentino-logo" width={800} height={800} />
      </Link>
      <hr className="w-full dark:border-valentino-red" />
      {isEnterMenu ? null : (
        <img
          src={darkMode ? LightMode : DarkMode}
          alt="darkmode"
          className={`top-3 right-4 z-10 w-10 h-10 cursor-pointer p-2 absolute `}
          onClick={handleMode}
        />
      )}
      <img
        src={darkMode ? NavDark : NavWhite}
        alt="nav icon"
        className={`w-8 h-8 left-4 top-4 absolute ${isEnterMenu ? 'opacity-0' : 'opacity-100 z-10'}  cursor-pointer`}
        onClick={handleNav}
      />
    </header>
  );
}