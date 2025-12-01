import axios from 'axios';

// URL directa a tu backend en la nube
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://3.236.95.240:9080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // Aumenté a 30 segundos
});

// El resto de tu código SE MANTIENE IGUAL
api.defaults.withCredentials = false;

const PUBLIC_PATHS = [
    '/productos', '/productos/', 
    '/categorias', '/categorias/', 
    '/auth', '/auth/', '/auth/signin', '/auth/signup',
    '/contactos', '/contactos/',
    '/reservas', '/reservas/',
    '/resenas', '/resenas/'
];

function normalizeRequestPath(config) {
  let requestPath = config.url || '';
  try {
    if (/^https?:\/\//i.test(requestPath)) {
      requestPath = new URL(requestPath).pathname;
    } else {
      // If url is relative and baseURL is present, strip baseURL
      const base = config.baseURL || API_BASE_URL || '';
      if (requestPath.startsWith(base)) {
        requestPath = requestPath.slice(base.length) || '/';
      }
    }
  } catch (e) {
    // fallback to given url
    requestPath = config.url || requestPath;
  }
  if (!requestPath.startsWith('/')) requestPath = '/' + requestPath;
  return requestPath;
}
// Simple request interceptor: attach token if present
api.interceptors.request.use(
  (config) => {
    // Avoid sending Authorization for public catalog endpoints to prevent 401
    const path = normalizeRequestPath(config);
    const isPublic = PUBLIC_PATHS.some(p => path === p || path.startsWith(p));

    if (isPublic) {
      // ensure no Authorization header and no credentials are sent
      if (config.headers) delete config.headers['Authorization'];
      config.withCredentials = false;
      return config;
    }

    const token = localStorage.getItem('userToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Simple response handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      // clear stored auth on unauthorized
      localStorage.removeItem('userToken');
      localStorage.removeItem('userRoles');
    }
    return Promise.reject(error);
  }
);

export default api;