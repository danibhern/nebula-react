import api from './api';
import axios from 'axios';

// --- Claves para localStorage ---
const TOKEN_KEY = 'userToken'; 
const ROLES_KEY = 'userRoles';
const USERNAME_KEY = 'username';

export const login = async (username, password) => {
    try {
        const response = await api.post('/auth/signin', { 
            username, 
            password 
        });

        // El backend puede devolver el token con distintos nombres
        const tokenFromBackend = response.data?.accessToken || response.data?.token || response.data?.jwt || null;
        const roles = response.data?.roles || response.data?.authorities || [];
        const currentUser = response.data?.username || response.data?.name || null;
        const currentEmail = response.data?.email || null;
        const currentId = response.data?.id || null;

        console.log('authService.login response.data =', response.data);
        console.log('authService will store:', { tokenFromBackend, roles, currentUser });

        if (!tokenFromBackend) {
            throw new Error('No se recibió token del backend');
        }

        // Guardar datos en localStorage
        localStorage.setItem(TOKEN_KEY, tokenFromBackend);
        localStorage.setItem(ROLES_KEY, JSON.stringify(roles));
        localStorage.setItem(USERNAME_KEY, currentUser);
        const userObj = { id: currentId, username: currentUser, email: currentEmail, roles };
        localStorage.setItem('user', JSON.stringify(userObj));

        return {
            isAuthenticated: true,
            roles: roles,
            username: currentUser
        };

    } catch (error) {
        if (!error.response) {
            const BACKEND_FULL = process.env.REACT_APP_BACKEND_URL || 'http://3.236.95.240:9080';
            try {
                console.warn('authService: proxy failed, retrying direct request to', BACKEND_FULL);
                const direct = await axios.post(`${BACKEND_FULL}/auth/signin`, { username, password }, { headers: { 'Content-Type': 'application/json' }, timeout: 10000 });

                const tokenFromBackend = direct.data?.accessToken || direct.data?.token || direct.data?.jwt || null;
                const roles = direct.data?.roles || direct.data?.authorities || [];
                const currentUser = direct.data?.username || direct.data?.name || null;
                const currentEmail = direct.data?.email || null;
                const currentId = direct.data?.id || null;

                if (!tokenFromBackend) {
                    throw new Error('No se recibió token del backend (direct retry)');
                }

                localStorage.setItem(TOKEN_KEY, tokenFromBackend);
                localStorage.setItem(ROLES_KEY, JSON.stringify(roles));
                localStorage.setItem(USERNAME_KEY, currentUser);
                const userObj = { id: currentId, username: currentUser, email: currentEmail, roles };
                localStorage.setItem('user', JSON.stringify(userObj));

                return {
                    isAuthenticated: true,
                    roles: roles,
                    username: currentUser
                };
            } catch (directErr) {
                console.error('authService direct retry failed:', directErr.message || directErr);
                throw new Error('Error de conexión con el servidor. Asegúrate de que el backend esté corriendo en http://3.236.95.240:9080 y vuelve a intentarlo.');
            }
        }

        throw error.response || new Error(error.message || 'Error desconocido');
    }
};

export const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(ROLES_KEY);
    localStorage.removeItem(USERNAME_KEY);
};

export const getCurrentUser = () => {
    const token = localStorage.getItem(TOKEN_KEY);
    const rolesJSON = localStorage.getItem(ROLES_KEY);
    const username = localStorage.getItem(USERNAME_KEY);

    if (token && rolesJSON) {
        try {
            const roles = JSON.parse(rolesJSON);
            return { 
                isAuthenticated: true, 
                roles: roles,
                username: username
            };
        } catch (e) {
            logout();
            return { isAuthenticated: false, roles: [] };
        }
    }
    return { isAuthenticated: false, roles: [], username: null };
};