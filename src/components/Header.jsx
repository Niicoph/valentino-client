import { useContext } from 'react';
import { ColorModeContext } from '../contexts/ColorMode';
import { Link } from 'react-router-dom';
import Logo from '../assets/Logo/Logo.png';
import DarkMode from '../assets/Switch/dark.png';
import LightMode from '../assets/Switch/light.png';
import { useLocation } from 'react-router-dom';


export default function Header() {
  const { handleMode , darkMode } = useContext(ColorModeContext);
  const location = useLocation();
  let isEnterMenu = false;

  if (location.pathname === '/') {
    isEnterMenu = true;
  }
  

  return (
    <header className='w-full h-1/5 bg-valentino-red flex justify-center items-center dark:bg-white shadow-custom'>
      <hr className='w-full  dark:border-valentino-red'/>
      <Link to={'/menu'} className='cursor-pointer z-10'>
        <img src={Logo} alt="valentino-logo" width={800} height={800}/>
      </Link>
      <hr className='w-full  dark:border-valentino-red'/>
      {isEnterMenu ? null : 
           <img 
           src={ darkMode ? LightMode : DarkMode } 
           alt="darkmode" 
           className='absolute top-3 right-4 z-20 w-10 h-10 cursor-pointer  p-2 ' 
           onClick={handleMode}
          />
      }
    </header>
  );
}
