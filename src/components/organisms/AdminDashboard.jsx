import React, { useState } from 'react';
import { 
  FaTachometerAlt, 
  FaClipboardList, 
  FaBoxes, 
  FaTags, 
  FaUsers, 
  FaChartBar,
  FaUser,
  FaStore,
  FaSignOutAlt,
  FaSyncAlt,
  FaDownload,
  FaShoppingCart,
  FaBox,
  FaUserFriends
} from 'react-icons/fa';
import '../../styles/AdminDashboard.css';

export default function AdminDashboard({ user, onLogout }) {
  const [activeMenu, setActiveMenu] = useState('dashboard');

  // Datos para las tarjetas de resumen
  const overviewData = [
    {
      id: 1,
      title: 'Compras',
      value: '1,234',
      footer: 'Probabilidad de aumento: 20%',
      icon: FaShoppingCart,
      trend: 'positive'
    },
    {
      id: 2,
      title: 'Productos',
      value: '400',
      footer: 'Inventario actual: 500',
      icon: FaBox,
      trend: 'neutral'
    },
    {
      id: 3,
      title: 'Usuarios',
      value: '890',
      footer: 'Nuevos usuarios este mes: 120',
      icon: FaUserFriends,
      trend: 'positive'
    }
  ];

  // Secciones del dashboard
  const dashboardSections = [
    {
      id: 1,
      title: 'Órdenes',
      description: 'Gestión y seguimiento de todas las órdenes de compra realizadas.',
      icon: FaClipboardList
    },
    {
      id: 2,
      title: 'Productos',
      description: 'Administrar inventario y detalles de los productos disponibles.',
      icon: FaBoxes
    },
    {
      id: 3,
      title: 'Categorías',
      description: 'Organizar productos en categorías para facilitar su navegación.',
      icon: FaTags
    },
    {
      id: 4,
      title: 'Usuarios',
      description: 'Gestión de cuentas de usuario y sus roles dentro del sistema.',
      icon: FaUsers
    },
    {
      id: 5,
      title: 'Reportes',
      description: 'Generación de informes detallados sobre las operaciones del sistema.',
      icon: FaChartBar
    },
    {
      id: 6,
      title: 'Perfil',
      description: 'Administración de la información personal y configuraciones de cuenta.',
      icon: FaUser
    },
    {
      id: 7,
      title: 'Tienda',
      description: 'Visualiza tu tienda en tiempo real, visualiza los reportes de los usuarios.',
      icon: FaStore
    }
  ];

  // Menú de navegación
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: FaTachometerAlt },
    { id: 'orders', label: 'Órdenes', icon: FaClipboardList },
    { id: 'products', label: 'Productos', icon: FaBoxes },
    { id: 'categories', label: 'Categorías', icon: FaTags },
    { id: 'users', label: 'Usuarios', icon: FaUsers },
    { id: 'emp', label: 'Empleados', icon: FaUsers },
    { id: 'reports', label: 'Reportes', icon: FaChartBar }
  ];

  return (
    <div className="app-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">
          <div className="logo-container">
            <img src="/img/nebula.png" alt="Nebula Café" className="sidebar-logo" />
            <h2>Nebula Café</h2> 
          /</div>
        </div>
        
        <div className="sidebar-menu">
          {menuItems.map(item => (
            <div 
              key={item.id}
              className={`menu-item ${activeMenu === item.id ? 'active' : ''}`}
              onClick={() => setActiveMenu(item.id)}
            >
              <item.icon className="menu-icon" />
              <span>{item.label}</span>
            </div>
          ))}
        </div>
        
        <div className="session-section">
          <h3>Sesión</h3>
          <div className="user-info">
            <div className="user-avatar">
              <FaUser />
            </div>
            <div className="user-details">
              <h4>{user?.name || 'Administrador'}</h4>
              <p>{user?.email || 'admin@nebula.com'}</p>
            </div>
          </div>
          <button className="logout-btn" onClick={onLogout}>
            <FaSignOutAlt /> Cerrar Sesión
          </button>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="main-content">
        <div className="header">
          <h1>Dashboard</h1>
          <div className="header-actions">
            <button className="btn btn-outline">
              <FaSyncAlt /> Actualizar
            </button>
            <button className="btn btn-primary">
              <FaDownload /> Exportar
            </button>
          </div>
        </div>
        
        {activeMenu === 'dashboard' && (
          <>
            <div className="dashboard-overview">
              <h2>Resumen de las actividades diarias</h2>
              <div className="overview-cards">
                {overviewData.map(item => (
                  <div key={item.id} className="card">
                    <div className="card-header">
                      <div className="card-title">{item.title}</div>
                      <div className="card-icon">
                        <item.icon />
                      </div>
                    </div>
                    <div className="card-value">{item.value}</div>
                    <div className="card-footer">
                      {item.trend === 'positive' ? 
                        <span className="positive">{item.footer}</span> : 
                        <span>{item.footer}</span>
                      }
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="dashboard-sections-container">
              <h2>Visión general de todas las métricas y estadísticas clave del sistema</h2>
              <div className="dashboard-sections">
                {dashboardSections.map(section => (
                  <div key={section.id} className="section-card">
                    <h3>
                      <section.icon />
                      {section.title}
                    </h3>
                    <p>{section.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
        
        {activeMenu !== 'dashboard' && (
          <div className="section-content">
            <h2>{menuItems.find(item => item.id === activeMenu)?.label}</h2>
            <p>Contenido de la sección {activeMenu} en desarrollo. Aquí se mostrarán todas las funcionalidades específicas de esta área del sistema.</p>
          </div>
        )}
      </div>
    </div>
  );
}