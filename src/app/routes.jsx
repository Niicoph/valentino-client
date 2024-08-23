import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EnterMenu from '../pages/EnterMenu'; 
import Menu from '../pages/Menu'; 

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EnterMenu />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="*" element={<h1>not found</h1>} />
      </Routes>
    </Router>
  );
}
