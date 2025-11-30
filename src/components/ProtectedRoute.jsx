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
    

    const tokenFromStorage = typeof window !== 'undefined' ? localStorage.getItem('userToken') : null;
    const isAuthenticatedEffective = auth.isAuthenticated || !!tokenFromStorage;

    if (!isAuthenticatedEffective) {
        return <Navigate to="/inicio_sesion" replace />;
    }
    const rolesToCheck = requiredRole ? [requiredRole] : requiredRoles;

    if (rolesToCheck && rolesToCheck.length > 0) {
        let rolesFromState = [];
        try { rolesFromState = auth.roles || []; } catch (e) { rolesFromState = []; }

        let rolesFromStorage = [];
        try {
            const raw = localStorage.getItem('userRoles');
            rolesFromStorage = raw ? JSON.parse(raw) : [];
        } catch (e) {
            rolesFromStorage = [];
        }

        const allRoles = Array.from(new Set([...(rolesFromState || []), ...(rolesFromStorage || [])]));

        const hasRequiredRole = rolesToCheck.some(role => {
            return allRoles.some(r => {
                if (!r) return false;
                const normalizedR = r.toString().toUpperCase();
                const normalizedRole = role.toString().toUpperCase();
                return normalizedR === normalizedRole || normalizedR === normalizedRole.replace('ROLE_', '') || normalizedR.replace('ROLE_', '') === normalizedRole;
            });
        });

        if (!hasRequiredRole) {
            console.warn(`Acceso denegado. Roles requeridos: ${rolesToCheck.join(', ')}`);
            return <Navigate to="/" replace />;
        }
    }
    return <Component auth={auth} />;
};

export default ProtectedRoute;