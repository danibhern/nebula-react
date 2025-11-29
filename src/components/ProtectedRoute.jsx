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
    // Si el estado en memoria aún no está actualizado inmediatamente después del login,
    // usamos un fallback a localStorage para una experiencia más fluida en el dev server.
    const tokenFromStorage = typeof window !== 'undefined' ? localStorage.getItem('userToken') : null;
    const isAuthenticatedEffective = auth.isAuthenticated || !!tokenFromStorage;

    if (!isAuthenticatedEffective) {
        // Redirige al login si no está logueado
        return <Navigate to="/inicio_sesion" replace />;
    }

    // 2. Verificar Rol(es)
    const rolesToCheck = requiredRole ? [requiredRole] : requiredRoles;

    if (rolesToCheck && rolesToCheck.length > 0) {
        // Obtener roles desde auth (estado) o desde localStorage como fallback
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
            // Normalizar y verificar coincidencias (ROLE_ADMIN vs ADMIN)
            return allRoles.some(r => {
                if (!r) return false;
                const normalizedR = r.toString().toUpperCase();
                const normalizedRole = role.toString().toUpperCase();
                return normalizedR === normalizedRole || normalizedR === normalizedRole.replace('ROLE_', '') || normalizedR.replace('ROLE_', '') === normalizedRole;
            });
        });

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