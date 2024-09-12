import Close from "../assets/Nav/Close.png";
import { useContext } from "react";
import { UserAuthContext } from "../contexts/UserAuthContext";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function Nav({ handleNav , navActive}) {
    const { user } = useContext(UserAuthContext);
    const currentLocation = useLocation().pathname;


    const handleClose = async () => {
        const nav = document.getElementById('nav');
        nav.classList.remove('animate-slide-in');
        nav.classList.add('animate-slide-out');
        await new Promise((resolve) => setTimeout(resolve, 500));
        handleNav();
    };
    
    function handleCategoryReload() {
        if (currentLocation === '/menu') {
            window.location.reload();
        }
    }


    return (
      <section
        id = "nav"
        className={`w-full h-full bg-white absolute z-30 left-0 top-0 transition-transform duration-500 ${
          navActive ? 'animate-slide-in' : ''
        }`}
      >
        <div className="w-full h-20 flex justify-end p-4">
            <img
                src={Close}
                alt="close"
                className="w-10 h-10 cursor-pointer"
                onClick={handleClose}
            />
        </div> 
        { !user ?  
        <div className="w-full h-full">
            <ul className="w-full h-full flex flex-col p-4 gap-14">
                <li className="text-2xl font-semibold flex justify-between mt-10"> 
                    <a href="" className="w-full flex justify-between"> Instagram  <span className="mr-3"> {'>'}</span> </a>
                </li>
                <hr className="w-full border border-gray-200"/>
                <li className="text-2xl font-semibold flex justify-between">
                    <a href="" className="w-full flex justify-between"> Facebook  <span className="mr-3"> {'>'}</span> </a>
                </li>
                <hr className="w-full border border-gray-200"/>
                <li className="text-2xl font-semibold flex justify-between">
                    <a href="" className="w-full flex justify-between"> Nosotros  <span className="mr-3"> {'>'}</span> </a>
                </li>
                <hr className="w-full border border-gray-200"/>
                <li className="text-2xl font-semibold flex justify-between">
                    <a href="" className="w-full flex justify-between"> Contacto  <span className="mr-3"> {'>'}</span> </a>
                </li>
            </ul>
        </div>
        : 
          <div className="w-full h-full">
            <ul className="w-full h-full flex flex-col p-4 gap-4 md:gap-8">
                <li className="text-2xl font-semibold flex justify-between mt-10"> 
                    <Link to={"/menu"} className="w-full flex justify-between" onClick={ handleCategoryReload }> Ver Categorias  <span className="mr-3"> {'>'}</span> </Link>
                </li>
                <hr className="w-full border border-gray-200"/>
                <li className="text-2xl font-semibold flex justify-between">
                    <Link to={'/categoria/agregar'} className="w-full flex justify-between"> Agregar Categoria  <span className="mr-3"> {'>'}</span> </Link>
                </li>
                <hr className="w-full border border-gray-200"/>
                <li className="text-2xl font-semibold flex justify-between">
                    <Link to={'/categoria/eliminar'} className="w-full flex justify-between"> Eliminar Categoria  <span className="mr-3"> {'>'}</span> </Link>
                </li>
                <hr className="w-full border border-gray-200"/>
                <li className="text-2xl font-semibold flex justify-between">
                    <Link to={'/categoria/actualizar'} className="w-full flex justify-between"> Actualizar Categoria  <span className="mr-3"> {'>'}</span> </Link>
                </li>
                <hr className="w-full border border-black"/>
                <li className="text-2xl font-semibold flex justify-between">
                    <Link to={'/platos'} className="w-full flex justify-between"> Ver platos  <span className="mr-3"> {'>'}</span> </Link>
                </li>
                <hr className="w-full border border-gray-200"/>
                <li className="text-2xl font-semibold flex justify-between">
                    <Link to={'/plato/agregar'} className="w-full flex justify-between"> Agregar Plato  <span className="mr-3"> {'>'}</span> </Link>
                </li>
                <hr className="w-full border border-gray-200"/>
                <li className="text-2xl font-semibold flex justify-between">
                    <Link to={'/plato/eliminar'} className="w-full flex justify-between"> Eliminar Plato  <span className="mr-3"> {'>'}</span> </Link>
                </li>
                <hr className="w-full border border-gray-200"/>
                <li className="text-2xl font-semibold flex justify-between">
                    <Link to={'/plato/actualizar'} className="w-full flex justify-between"> Actualizar Plato  <span className="mr-3"> {'>'}</span> </Link>
                </li>
            </ul>
        </div>   
        }
      </section>
    );
}
