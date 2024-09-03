// AppRoutes.js
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EnterMenu from '../pages/EnterMenu'; 
import Menu from '../pages/Menu'; 
import { FetchApiContext } from '../contexts/FetchApiContext';
import { useContext } from 'react';
import MenuDetails from '../pages/MenuDetails';
import Login from '../pages/Login';

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
        <Route path="/" element={<EnterMenu />} />
        <Route path="/login" element={<Login />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/categoria/agregar" element={<h1>agregar categoria</h1>} /> 
        <Route path="/categoria/eliminar" element={<h1>eliminar categoria</h1>} />
        <Route path="/categoria/actualizar" element={<h1>actualizar categoria</h1>} />
        <Route path="/plato/agregar" element={<h1>agregar plato</h1>} />
        <Route path="/plato/eliminar" element={<h1>eliminar plato</h1>} />
        <Route path="/plato/actualizar" element={<h1>actualizar plato</h1>} />
        <Route path="*" element={<h1>not found</h1>} />
      </Routes>
    </Router>
  );
}
