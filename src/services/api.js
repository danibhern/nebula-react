import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api'; 

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('userToken'); 

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