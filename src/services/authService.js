import api from './api';

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

        const { accessToken, roles, username: currentUser } = response.data; 

        // 1. Guardar el token (Requisito 3 - Integración JWT)
        localStorage.setItem(TOKEN_KEY, accessToken); 
        
        // 2. Guardar los roles y el nombre de usuario (Requisito 6 - Restricción por Roles)
        localStorage.setItem(ROLES_KEY, JSON.stringify(roles)); 
        localStorage.setItem(USERNAME_KEY, currentUser); 
        
        return { 
            isAuthenticated: true, 
            roles: roles,
            username: currentUser 
        };

    } catch (error) {
        // Propaga el error para el manejo en el frontend
        throw error.response || error;
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