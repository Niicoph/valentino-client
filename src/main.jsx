import FetchApiProvider from './contexts/FetchApiContext';
import ColorModeProvider from '../src/contexts/ColorMode';
import UserAuthProvider from './contexts/UserAuthContext';
import FetchPlatesProvider from './contexts/FetchPlatesContext';
import { createRoot } from 'react-dom/client';
import AppRoutes from './app/routes'; 
import './index.css';


createRoot(document.getElementById('root')).render(
<UserAuthProvider>
    <ColorModeProvider>
        <FetchApiProvider>
            <FetchPlatesProvider>
                <AppRoutes />
            </FetchPlatesProvider>
        </FetchApiProvider>
    </ColorModeProvider>
</UserAuthProvider>
);
