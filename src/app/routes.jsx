import { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EnterMenu from '../pages/EnterMenu'; 
import Menu from '../pages/Menu'; 
import MenuDetails from '../pages/MenuDetails';
import Login from '../pages/Login';
import ProtectedRoutes from './ProtectedRoutes';
import { UserAuthContext } from '../contexts/UserAuthContext';
import { FetchApiContext } from '../contexts/FetchApiContext';
import { FetchPlatesContext } from '../contexts/FetchPlatesContext';

import NotFound from '../pages/NotFound';
import AddCategory from '../pages/Categories/AddCategory';
import DeleteCategory from '../pages/Categories/DeleteCategory';
import UpdateCategory from '../pages/Categories/UpdateCategory';
import UpdateCategoryId from '../pages/Categories/UpdateCategoryId';
import AddPlate from '../pages/Plates/AddPlate';
import DeletePlate from '../pages/Plates/DeletePlate';
import UpdatePlate from '../pages/Plates/UpdatePlate';
import UpdatePlateId from '../pages/Plates/UpdatePlateId';
import Plates from '../pages/Plates/Plates';

export default function AppRoutes() {
  const { categories } = useContext(FetchApiContext); 
  const { plates } = useContext(FetchPlatesContext);
  const { userSession } = useContext(UserAuthContext);

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
        <Route path="/categoria/agregar" element={<ProtectedRoutes userSession={userSession}> <AddCategory/> </ProtectedRoutes>} />
        <Route path="/categoria/eliminar" element={<ProtectedRoutes userSession={userSession}> <DeleteCategory/> </ProtectedRoutes>} />
        <Route path="/categoria/actualizar" element={<ProtectedRoutes userSession={userSession}> <UpdateCategory/> </ProtectedRoutes>} />
        {categories.map(category => (
          <Route 
            key={category.id} 
            path={`/categoria/actualizar/${category.id}`} 
            element={<ProtectedRoutes userSession={userSession}> <UpdateCategoryId categoryId={category.id} categoryName={category.nombre}/> </ProtectedRoutes>} 
          />
        ))}
        <Route path="/platos" element={<ProtectedRoutes userSession={userSession}> <Plates categories={categories} plates={plates}/> </ProtectedRoutes>} />
        <Route path="/plato/agregar" element={<ProtectedRoutes userSession={userSession}>  <AddPlate categories={categories}/> </ProtectedRoutes>} />
        <Route path="/plato/eliminar" element={<ProtectedRoutes userSession={userSession}> <DeletePlate categories={categories}/> </ProtectedRoutes>} />
        <Route path="/plato/actualizar" element={<ProtectedRoutes userSession={userSession}> <UpdatePlate categories={categories}/> </ProtectedRoutes>} />
        {
          plates.map(plate => (
            <Route 
              key={plate.id} 
              path={`/plato/actualizar/${plate.id}`} 
              element={<ProtectedRoutes userSession={userSession}> <UpdatePlateId categories={categories} plate={plate}/> </ProtectedRoutes>} 
            />
          ))
        }
        {/* default route */}
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </Router>
  );
}


