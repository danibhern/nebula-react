import api from './api';
import axios from 'axios';

// --- Claves para localStorage (Mantenemos la persistencia) ---
const TOKEN_KEY = 'userToken'; 
const ROLES_KEY = 'userRoles';
const USERNAME_KEY = 'username'; // Clave para el nombre de usuario

export const login = async (username, password) => {
    try {
        const response = await api.post('/auth/signin', { 
            username, 
            password 
        });

    // El backend puede devolver el token con distintos nombres (token, accessToken, jwt)
    const tokenFromBackend = response.data?.accessToken || response.data?.token || response.data?.jwt || null;
    const roles = response.data?.roles || response.data?.authorities || [];
    const currentUser = response.data?.username || response.data?.name || null;
    const currentEmail = response.data?.email || null;
    const currentId = response.data?.id || null;

    // DEBUG: registrar lo que devuelve el backend y lo que intentaremos guardar
    console.log('authService.login response.data =', response.data);
    console.log('authService will store:', { tokenFromBackend, roles, currentUser });

        if (!tokenFromBackend) {
            // Si no hay token, tratamos como error de autenticación
            throw { status: 401, message: 'No se recibió token del backend' };
        }

        // 1. Guardar el token (Requisito 3 - Integración JWT)
        localStorage.setItem(TOKEN_KEY, tokenFromBackend);

        // 2. Guardar los roles y el nombre de usuario (Requisito 6 - Restricción por Roles)
    localStorage.setItem(ROLES_KEY, JSON.stringify(roles));
    localStorage.setItem(USERNAME_KEY, currentUser);
    // Guardar objeto user completo para que componentes (Perfil) puedan mostrar datos
    const userObj = { id: currentId, username: currentUser, email: currentEmail, roles };
    localStorage.setItem('user', JSON.stringify(userObj));

        return {
            isAuthenticated: true,
            roles: roles,
            username: currentUser
        };

    } catch (error) {
        // Si no hay response, es un error de red/CORS (Network Error).
        // Intentamos un reintento directo al backend (evita proxy/dev-server issues).
        if (!error.response) {
            const BACKEND_FULL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8080/api';
            try {
                console.warn('authService: proxy failed, retrying direct request to', BACKEND_FULL);
                const direct = await axios.post(`${BACKEND_FULL}/auth/signin`, { username, password }, { headers: { 'Content-Type': 'application/json' }, timeout: 10000 });

                const tokenFromBackend = direct.data?.accessToken || direct.data?.token || direct.data?.jwt || null;
                const roles = direct.data?.roles || direct.data?.authorities || [];
                const currentUser = direct.data?.username || direct.data?.name || null;
                const currentEmail = direct.data?.email || null;
                const currentId = direct.data?.id || null;

                if (!tokenFromBackend) {
                    throw { status: 401, message: 'No se recibió token del backend (direct retry)' };
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
                // Lanzamos un error amigable para la UI
                throw { message: 'Error de conexión con el servidor. Asegúrate de que el backend esté corriendo en http://localhost:8080 y vuelve a intentarlo.' };
            }
        }

        // Propaga el error del servidor (4xx/5xx) al frontend
        throw error.response || { message: error.message || 'Error desconocido' };
    }
};

export const logout = () => {
    // Eliminar todas las claves de sesión
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(ROLES_KEY);
    localStorage.removeItem(USERNAME_KEY);
};

/**
 * Función que se ejecuta al cargar la aplicación para comprobar
 * si existe una sesión persistente en localStorage. (Requisito 5)
 */
export const getCurrentUser = () => {
    const token = localStorage.getItem(TOKEN_KEY);
    const rolesJSON = localStorage.getItem(ROLES_KEY);
    const username = localStorage.getItem(USERNAME_KEY);

    if (token && rolesJSON) {
        try {
            const roles = JSON.parse(rolesJSON);
            
            // Retorna el estado de la sesión si el token y roles existen
            return { 
                isAuthenticated: true, 
                roles: roles,
                username: username
            };
        } catch (e) {
            // Limpiar si los datos están corruptos
            logout();
            return { isAuthenticated: false, roles: [] };
        }
    }
    // Si no hay sesión, retorna el estado inicial
    return { isAuthenticated: false, roles: [], username: null };
};