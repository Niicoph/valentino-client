import FetchApiProvider from './contexts/FetchApiContext';
import ColorModeProvider from '../src/contexts/ColorMode';
import UserAuthProvider from './contexts/UserAuthContext';
import { createRoot } from 'react-dom/client';
import AppRoutes from './app/routes'; 
import './index.css';


createRoot(document.getElementById('root')).render(
<UserAuthProvider>
    <ColorModeProvider>
        <FetchApiProvider>
                <AppRoutes />
        </FetchApiProvider>
    </ColorModeProvider>
</UserAuthProvider>
);
