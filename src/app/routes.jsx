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
        <Route path="*" element={<h1>not found</h1>} />
      </Routes>
    </Router>
  );
}
