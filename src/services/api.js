import axios from 'axios';

<<<<<<< HEAD
// URL directa a tu backend en la nube
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://3.236.95.240:9080/api';

=======
const API_BASE_URL = process.env.REACT_APP_API_URL || '/api';
>>>>>>> 97158095cd68981a4d26a1f84c740ea6dd69126b
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // Aumenté a 30 segundos
});

<<<<<<< HEAD
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
=======
api.defaults.withCredentials = false;

const PUBLIC_PATHS = ['/productos', '/productos/', '/categorias', '/categorias/', '/auth', '/auth/', '/auth/signin', '/auth/signup'];
>>>>>>> 97158095cd68981a4d26a1f84c740ea6dd69126b

function normalizeRequestPath(config) {
  let requestPath = config.url || '';
  try {
    if (/^https?:\/\//i.test(requestPath)) {
      requestPath = new URL(requestPath).pathname;
    } else {
      const base = config.baseURL || API_BASE_URL || '';
      if (requestPath.startsWith(base)) {
        requestPath = requestPath.slice(base.length) || '/';
      }
    }
  } catch (e) {
    requestPath = config.url || requestPath;
  }
  if (!requestPath.startsWith('/')) requestPath = '/' + requestPath;
  return requestPath;
}

api.interceptors.request.use(
  (config) => {
    const path = normalizeRequestPath(config);
    const isPublic = PUBLIC_PATHS.some(p => path === p || path.startsWith(p));

    if (isPublic) {
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

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      localStorage.removeItem('userToken');
      localStorage.removeItem('userRoles');
    }
    return Promise.reject(error);
  }
);

export default api;