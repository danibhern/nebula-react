import axios from 'axios';

// Leer URL del backend desde variable de entorno para facilitar entornos
// .env (REACT_APP_API_URL) debe contener por ejemplo: http://localhost:8080/api
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000, // 10s timeout to fail fast and reveal network issues
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('userToken'); 

        // DEBUG: log request URL and method to help investigar "Network Error"
        try {
            console.log(`API Request -> ${config.method?.toUpperCase() || 'GET'} ${config.baseURL || ''}${config.url}`);
        } catch (e) { /* ignore logging errors */ }

        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`; 
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

api.interceptors.response.use(
    (response) => {
        return response; 
    },
    (error) => {
        // Si no hay response significa que la petición no llegó al backend (Network / CORS)
        if (!error.response) {
            console.error('API Network or CORS error:', error.message || error);
            return Promise.reject(error);
        }

        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
            
            // Si el token expiró o no es válido, forzamos el cierre de sesión.
            console.log('Sesión expirada o no autorizada. Forzando logout...');
            
            // Llama a la lógica de cierre de sesión (eliminar token, redirigir al login)
            localStorage.removeItem('userToken');
            localStorage.removeItem('userRoles'); 
            // NOTA: Aquí deberías redirigir al usuario al formulario de login
            // window.location.href = '/login'; 
        }
        return Promise.reject(error);
    }
);

export default api;