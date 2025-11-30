import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000,
});

api.interceptors.request.use(
    (config) => {
        // Lista de endpoints públicos que NO requieren token
        const publicEndpoints = [
            '/reservas',
            '/reservas/create', 
            '/reservas/public',
            '/auth/register',
            '/contactos',
            '/resenas'
        ];
        
        // Verificar si la URL actual coincide con algún endpoint público
        const isPublicEndpoint = publicEndpoints.some(endpoint => 
            config.url?.includes(endpoint)
        );

        console.log(`API Request -> ${config.method?.toUpperCase() || 'GET'} ${config.url}`);
        console.log(`🔐 Endpoint público: ${isPublicEndpoint ? 'SÍ' : 'NO'}`);

        // Si es un endpoint público, NO agregar token
        if (isPublicEndpoint) {
            console.log('✅ Solicitud sin token - Endpoint público');
            return config;
        }

        // Para endpoints protegidos, buscar y agregar token
        const token = localStorage.getItem('userToken');

        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
            console.log('🔑 Authorization header agregado');
        } else {
            console.warn('⚠️ No se encontró token de autenticación para endpoint protegido');
        }
        
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => {
        return response; 
    },
    (error) => {
        if (!error.response) {
            console.error('API Network or CORS error:', error.message || error);
            return Promise.reject(error);
        }

        // Solo manejar errores 401/403 para endpoints protegidos
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
            console.log('Sesión expirada o no autorizada. Forzando logout...');
            
            localStorage.removeItem('userToken');
            localStorage.removeItem('userRoles'); 
            // window.location.href = '/login'; 
        }
        return Promise.reject(error);
    }
);

export default api;