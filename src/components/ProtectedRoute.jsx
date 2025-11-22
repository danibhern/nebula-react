import React from 'react';
import { Navigate } from 'react-router-dom';

/**
 * Componente que verifica la autenticación y los roles antes de renderizar una página.
 * @param {React.Component} component: El componente de página a renderizar.
 * @param {object} auth: El objeto de autenticación global (isAuthenticated, hasRole).
 * @param {string} requiredRole: (Opcional) Rol único requerido (e.g., 'ROLE_ADMIN').
 * @param {Array<string>} requiredRoles: (Opcional) Array de roles requeridos (e.g., ['ROLE_ADMIN', 'ROLE_EMPLOYEE']).
 */
const ProtectedRoute = ({ component: Component, auth, requiredRole, requiredRoles }) => {
    
    // 1. Verificar autenticación
    if (!auth.isAuthenticated) {
        // Redirige al login si no está logueado
        return <Navigate to="/inicio_sesion" replace />; 
    }
    
    // 2. Verificar Rol(es)
    const rolesToCheck = requiredRole ? [requiredRole] : requiredRoles;

    if (rolesToCheck && rolesToCheck.length > 0) {
        // Comprueba si el usuario tiene AL MENOS UNO de los roles requeridos
        const hasRequiredRole = rolesToCheck.some(role => auth.hasRole(role));

        if (!hasRequiredRole) {
            // Si no tiene el rol, redirige a la página de inicio (403 visual)
            console.warn(`Acceso denegado. Roles requeridos: ${rolesToCheck.join(', ')}`);
            return <Navigate to="/" replace />; 
        }
    }

    // 3. Pasa las verificaciones: Renderiza el componente y pasa las props de auth
    return <Component auth={auth} />;
};

export default ProtectedRoute;