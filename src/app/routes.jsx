import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EnterMenu from '../pages/EnterMenu'; 
import Menu from '../pages/Menu'; 
import { FetchApiContext } from '../contexts/FetchApiContext';
import { useContext } from 'react';
import MenuDetails from '../pages/MenuDetails';
import Login from '../pages/Login';
import AddCategory from '../pages/Categories/AddCategory';
import ProtectedRoutes from './ProtectedRoutes';

export default function AppRoutes() {
  const { categories } = useContext(FetchApiContext); 

  return (
    <Router>
      <Routes>
        {categories.map(category => (
          <Route 
            key={category.id} 
            path={`/menu/${category.nombre}`} 
            element={<MenuDetails categoryId={category.id} />} 
          />
        ))}
        {/* Open routes */}
        <Route path="/" element={<EnterMenu />} />
        <Route path="/login" element={<Login />} />
        <Route path="/menu" element={<Menu />} />
        {/* Protected routes */}
        <Route path="/categoria/agregar" element={<ProtectedRoutes><AddCategory/></ProtectedRoutes>} />
        <Route path="/categoria/eliminar" element={<ProtectedRoutes><h1>eliminar categoria</h1></ProtectedRoutes>} />
        <Route path="/categoria/actualizar" element={<ProtectedRoutes><h1>actualizar categoria</h1></ProtectedRoutes>} />
        <Route path="/plato/agregar" element={<ProtectedRoutes><h1>agregar plato</h1></ProtectedRoutes>} />
        <Route path="/plato/eliminar" element={<ProtectedRoutes><h1>eliminar plato</h1></ProtectedRoutes>} />
        <Route path="/plato/actualizar" element={<ProtectedRoutes><h1>actualizar plato</h1></ProtectedRoutes>} />
        {/* default route */}
        <Route path="*" element={<h1>not found</h1>} />
      </Routes>
    </Router>
  );
}


