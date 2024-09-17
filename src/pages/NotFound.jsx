import Header from '../components/Header';
import { Link } from 'react-router-dom';
export default function NotFound() {
  return (
    <main className="relative w-full h-screen flex flex-col overflow-hidden opacity-0 animate-showUp dark:bg-valentino-red short:h-3/4 short-wide:w-60 ">
    <div className="absolute top-0 left-0 w-full h-full grainy-background"></div>
    <Header />
    <div className='w-full h-full border border-blue-400 flex flex-col justify-center items-center gap-10'>
        <h1 className="text-7xl text-center dark:text-white font-semibold text-valentino-red">404</h1>
        <h2 className="text-2xl text-center dark:text-white font-bold">Página no encontrada</h2>
        <Link to="/menu" className="z-20 w-2/4 text-center p-3 dark:text-valentino-red dark:bg-white dark:shadow-custom-white font-bold text-lg rounded-md bg-valentino-red text-white shadow-custom">Volver al menú</Link>
    </div>
  </main>
  )
}
