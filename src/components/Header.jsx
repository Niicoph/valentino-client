import { Link } from 'react-router-dom';
import Logo from '../assets/Logo/Logo.png';
import DarkMode from '../assets/Switch/dark.png';



export default function Header() {
  return (
    <header className='w-full h-1/5 bg-valentino-red flex justify-center items-center'>
        <hr className='w-full'/>
        <Link to={'/menu'} className='cursor-pointer z-10'>
            <img src={Logo} alt="valentino-logo" width={800} height={800}/>
        </Link>
        <hr className='w-full'/>
        <img src={DarkMode} alt="darkmode" className='absolute top-3 right-4 z-20 w-10 h-10 cursor-pointer hover:bg-red-800 hover:border hover:border-red-800 hover:rounded-md p-2' />
    </header>
  )
}


