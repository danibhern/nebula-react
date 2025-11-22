import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { getCurrentUser, login as authLogin, logout as authLogout } from '../src/services/authServices';
import './App.css'; 

// Importa tus Componentes de Página
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Resenas from "./components/pages/Resenas";
import LoginPage from "./components/pages/Login"; 
import Carrito from "./components/pages/Carrito"; 
import Catalogo from "./components/pages/Catalogo";
import AdminDashboard from "./components/organisms/AdminDashboard";
import PortalPagos from "./components/pages/PortalPagos";
import Perfil from "./components/pages/Perfil";
import EmployeeDashboard from "./components/organisms/EmpDashboard";
import Registro from "./components/organisms/Registro";
import Contacto from "./components/pages/Contacto";
import ProtectedRoute from "./components/ProtectedRoute"; 


function App() {
    const [authState, setAuthState] = useState({ 
        isAuthenticated: false, 
        roles: [], 
        username: null,
        loading: true 
    }); 

    useEffect(() => {
        const user = getCurrentUser();
        setAuthState({ ...user, loading: false });
    }, []);

    const handleLogin = async (username, password) => {
        const userData = await authLogin(username, password);
        setAuthState({ ...userData, loading: false });
        return userData;
    };

    const handleLogout = () => {
        authLogout();
        setAuthState({ isAuthenticated: false, roles: [], username: null, loading: false });
    };

    const hasRole = (requiredRole) => {
        if (!authState.isAuthenticated || !authState.roles) return false;
        return authState.roles.includes(requiredRole); 
    };

    const authProps = {
        ...authState,
        login: handleLogin,
        logout: handleLogout,
        hasRole: hasRole
    };
    
    if (authState.loading) {
        return <div className="flex justify-center items-center h-screen text-xl">Cargando sesión...</div>;
    }

    return (
        <Router>
            <Routes>
                {/* ----------------- RUTAS PÚBLICAS ----------------- */}
                <Route path="/" element={<Home auth={authProps} />} />
                <Route path="/about" element={<About />} /> 
                <Route path="/resenas" element={<Resenas />} />
                <Route path="/catalogo" element={<Catalogo />} />
                <Route path="/contacto" element={<Contacto />} />
                <Route path="/registro" element={<Registro/>} />
                
                {/* Ruta de Login: Si el usuario ya está autenticado, redirigir a Home */}
                <Route 
                    path="/inicio_sesion" 
                    element={authState.isAuthenticated ? <Navigate to="/" replace /> : <LoginPage auth={authProps} />} 
                />

                {/* ----------------- RUTAS PROTEGIDAS ----------------- */}
                
                {/* 3. Dashboard de ADMINISTRADOR (Requiere: ROLE_ADMIN) */}
                <Route 
                    path="/admin" 
                    element={<ProtectedRoute 
                                component={AdminDashboard} 
                                auth={authProps} 
                                requiredRole="ROLE_ADMIN" 
                             />} 
                />

                {/* 4. Dashboard de EMPLEADO (Requiere: ROLE_EMPLOYEE o ROLE_ADMIN) */}
                <Route 
                    path="/emp1" 
                    element={<ProtectedRoute 
                                component={EmployeeDashboard} 
                                auth={authProps} 
                                requiredRoles={['ROLE_ADMIN', 'ROLE_EMPLOYEE']} // Asume que el backend usa ROLE_EMPLOYEE
                             />} 
                />

                {/* 5. Rutas protegidas solo por autenticación (Cualquier usuario logueado) */}
                <Route 
                    path="/perfil" 
                    element={<ProtectedRoute 
                                component={Perfil} 
                                auth={authProps} 
                             />} 
                />
                <Route 
                    path="/carrito" 
                    element={<ProtectedRoute 
                                component={Carrito} 
                                auth={authProps} 
                             />} 
                />
                <Route 
                    path="/pagos" 
                    element={<ProtectedRoute 
                                component={PortalPagos} 
                                auth={authProps} 
                             />} 
                />
                
                {/* 404 - Ruta no encontrada */}
                <Route path="*" element={<h1>404 | Página No Encontrada</h1>} />
            </Routes>
        </Router>
    );
}

export default App;