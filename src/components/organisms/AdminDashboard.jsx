import React, { useState } from 'react';
import { 
  FaTachometerAlt, 
  FaClipboardList, 
  FaBoxes, 
  FaTags, 
  FaUsers, 
  FaChartBar,
  FaUser,
  FaSignOutAlt,
  FaSyncAlt,
  FaDownload,
  FaBox,
  FaUserFriends,
  FaDollarSign,
  FaClock,
  FaStar,
  FaEdit,
  FaTrash,
  FaPlus,
  FaSearch,
  FaEye,
  FaHome,
  FaReceipt,
  FaExclamationTriangle,
  FaHistory,
  FaCog,
  FaIdCard,
  FaArrowLeft,
  FaFilePdf,
  FaPrint,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt
} from 'react-icons/fa';
import "../../styles/AdminDashboard.css";

// 🚨 CORRECCIÓN CRÍTICA: Cambiar { user, onLogout } a { auth }
export default function AdminDashboard({ auth }) {
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [viewMode, setViewMode] = useState('list'); 
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // 🛡️ GUARDRAIL DE SEGURIDAD:
  // Aunque ProtectedRoute ya chequeó el rol, es buena práctica hacer una verificación
  // si el componente fuera accedido de forma no estándar.
  if (!auth.isAuthenticated || !auth.hasRole('ROLE_ADMIN')) {
      // Normalmente ProtectedRoute se encarga de redirigir, pero esto evita renderizar
      return <div className="p-8"><h1 className="text-2xl text-red-500">Acceso Denegado.</h1></div>;
  }

  const overviewData = [
    { id: 1, title: 'Ventas Hoy', value: '$12,450', footer: 'Crecimiento: 15%', icon: FaDollarSign, trend: 'positive' },
    { id: 2, title: 'Órdenes Pendientes', value: '23', footer: 'Tiempo promedio: 15 min', icon: FaClock, trend: 'negative' },
    { id: 3, title: 'Productos Críticos', value: '8', footer: 'Stock bajo', icon: FaExclamationTriangle, trend: 'negative' },
    { id: 4, title: 'Usuarios Activos', value: '890', footer: 'Nuevos hoy: 12', icon: FaUserFriends, trend: 'positive' },
    { id: 5, title: 'Reseñas', value: '4.8/5', footer: '125 nuevas reseñas', icon: FaStar, trend: 'positive' },
    { id: 6, title: 'Inventario Total', value: '400', footer: 'Valor: $45,000', icon: FaBox, trend: 'neutral' }
  ];

  const ordersData = [
    { id: 1, customer: 'Juan Pérez', total: 45.50, status: 'Completado', date: '2024-01-15', items: 3, payment: 'Tarjeta' },
    { id: 2, customer: 'María García', total: 32.75, status: 'Pendiente', date: '2024-01-15', items: 2, payment: 'Efectivo' },
    { id: 3, customer: 'Carlos López', total: 28.90, status: 'En proceso', date: '2024-01-14', items: 4, payment: 'Tarjeta' },
    { id: 4, customer: 'Ana Martínez', total: 67.20, status: 'Completado', date: '2024-01-14', items: 5, payment: 'Transferencia' }
  ];

  const productsData = [
    { id: 1, name: 'Café Americano', category: 'Bebidas Calientes', price: 12.50, stock: 45, minStock: 10, status: 'Disponible', description: 'Café negro americano tradicional' },
    { id: 2, name: 'Croissant', category: 'Panadería', price: 8.75, stock: 23, minStock: 15, status: 'Disponible', description: 'Croissant de mantequilla fresco' },
    { id: 3, name: 'Té Verde', category: 'Bebidas Calientes', price: 10.00, stock: 0, minStock: 5, status: 'Agotado', description: 'Té verde orgánico' },
    { id: 4, name: 'Sandwich Club', category: 'Comida', price: 25.90, stock: 12, minStock: 10, status: 'Disponible', description: 'Sandwich con pollo y vegetales' },
    { id: 5, name: 'Café Latte', category: 'Bebidas Calientes', price: 15.00, stock: 8, minStock: 10, status: 'Crítico', description: 'Café con leche vaporizada' },
    { id: 6, name: 'Muffin de Arándanos', category: 'Panadería', price: 9.50, stock: 4, minStock: 8, status: 'Crítico', description: 'Muffin con arándanos frescos' }
  ];

  const categoriesData = [
    { id: 1, name: 'Bebidas Calientes', productCount: 15, status: 'Activa', description: 'Cafés, tés y bebidas calientes' },
    { id: 2, name: 'Bebidas Frías', productCount: 12, status: 'Activa', description: 'Refrescos, smoothies y bebidas frías' },
    { id: 3, name: 'Panadería', productCount: 8, status: 'Activa', description: 'Pasteles, panes y postres' },
    { id: 4, name: 'Comida', productCount: 10, status: 'Activa', description: 'Sandwiches, ensaladas y platos principales' }
  ];

  const usersData = [
    { id: 1, name: 'Juan Pérez', email: 'juan@email.com', role: 'Cliente', status: 'Activo', phone: '+1234567890', joinDate: '2023-05-15' },
    { id: 2, name: 'María García', email: 'maria@email.com', role: 'Cliente', status: 'Activo', phone: '+1234567891', joinDate: '2023-08-22' },
    { id: 3, name: 'Admin User', email: 'admin@nebula.com', role: 'Administrador', status: 'Activo', phone: '+1234567892', joinDate: '2023-01-10' },
    { id: 4, name: 'Carlos López', email: 'carlos@email.com', role: 'Cliente', status: 'Inactivo', phone: '+1234567893', joinDate: '2023-11-05' }
  ];

  const employeesData = [
    { id: 1, name: 'Roberto Silva', position: 'Barista', email: 'roberto@nebula.com', status: 'Activo', phone: '+1234567894', salary: '$1,200' },
    { id: 2, name: 'Laura Mendoza', position: 'Cajero', email: 'laura@nebula.com', status: 'Activo', phone: '+1234567895', salary: '$1,100' },
    { id: 3, name: 'Miguel Ángel', position: 'Gerente', email: 'miguel@nebula.com', status: 'Activo', phone: '+1234567896', salary: '$1,800' },
    { id: 4, name: 'Sofía Castro', position: 'Barista', email: 'sofia@nebula.com', status: 'Vacaciones', phone: '+1234567897', salary: '$1,200' }
  ];

  const reportsData = [
    { id: 1, name: 'Reporte de Ventas Mensual', type: 'Ventas', date: 'Enero 2024', status: 'Generado' },
    { id: 2, name: 'Análisis de Inventario', type: 'Inventario', date: 'Enero 2024', status: 'Pendiente' },
    { id: 3, name: 'Reporte de Clientes', type: 'Clientes', date: 'Diciembre 2023', status: 'Generado' },
    { id: 4, name: 'Estadísticas de Productos', type: 'Productos', date: 'Enero 2024', status: 'En proceso' }
  ];

  const purchaseHistoryData = [
    { id: 1, user: 'Juan Pérez', product: 'Café Americano', quantity: 2, total: 25.00, date: '2024-01-15' },
    { id: 2, user: 'María García', product: 'Croissant + Café', quantity: 1, total: 18.75, date: '2024-01-15' },
    { id: 3, user: 'Carlos López', product: 'Sandwich Club', quantity: 1, total: 25.90, date: '2024-01-14' }
  ];

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: FaTachometerAlt },
    { id: 'orders', label: 'Órdenes', icon: FaClipboardList },
    { id: 'products', label: 'Productos', icon: FaBoxes },
    { id: 'categories', label: 'Categorías', icon: FaTags },
    { id: 'users', label: 'Usuarios', icon: FaUsers },
    { id: 'employees', label: 'Empleados', icon: FaUserFriends },
    { id: 'reports', label: 'Reportes', icon: FaChartBar },
    { id: 'profile', label: 'Perfil', icon: FaUser }
  ];


  const handleMenuClick = (menuId) => {
    setActiveMenu(menuId);
    setViewMode('list');
    setSelectedItem(null);
    setSearchTerm('');
  };

  const handleNew = () => {
    setSelectedItem(null);
    setViewMode('new');
  };

  const handleEdit = (item) => {
    setSelectedItem(item);
    setViewMode('edit');
  };

  const handleView = (item) => {
    setSelectedItem(item);
    setViewMode('view');
  };

  const handleViewReceipt = (order) => {
    setSelectedItem(order);
    setViewMode('receipt');
  };

  const handleBackToList = () => {
    setViewMode('list');
    setSelectedItem(null);
  };

  const handleSave = (data, section) => {
    console.log(`Guardando ${section}:`, data);
    handleBackToList();
  };

  // 🐛 FIX: Eliminamos confirm() para evitar errores de restricción de globals.
  // En una aplicación real, se usaría un componente Modal.
  const handleDelete = (id, section) => {
    console.log(`[ACCIÓN] Solicitud de eliminación de ${section} con ID:`, id);
    // Para efectos de la demo, asumimos que la acción fue confirmada y ejecutada.
    // Aquí iría la lógica de eliminación real.
    console.log(`Eliminado simulado de ${section} con ID:`, id);
  };


  const DataTable = ({ data, columns, onEdit, onView, onDelete, searchPlaceholder }) => {
    const filteredData = data.filter(item =>
      Object.values(item).some(value =>
        value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );

    return (
      <div className="data-table-container">
        <div className="table-header">
          <div className="search-box">
            <FaSearch />
            <input
              type="text"
              placeholder={searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="table-info">
            Mostrando {filteredData.length} de {data.length} registros
          </div>
        </div>

        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                {columns.map(column => (
                  <th key={column.key} style={{ width: column.width }}>
                    {column.label}
                  </th>
                ))}
                <th width="120px">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map(item => (
                <tr key={item.id}>
                  {columns.map(column => (
                    <td key={column.key}>
                      {column.render ? column.render(item[column.key], item) : item[column.key]}
                    </td>
                  ))}
                  <td className="actions">
                    {onView && (
                      <button className="btn-icon" onClick={() => onView(item)} title="Ver detalles">
                        <FaEye />
                      </button>
                    )}
                    {onEdit && (
                      <button className="btn-icon" onClick={() => onEdit(item)} title="Editar">
                        <FaEdit />
                      </button>
                    )}
                    {onDelete && (
                      <button className="btn-icon danger" onClick={() => onDelete(item)} title="Eliminar">
                        <FaTrash />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredData.length === 0 && (
          <div className="empty-state">
            <FaSearch size={48} />
            <h3>No se encontraron resultados</h3>
            <p>Intenta ajustar los términos de búsqueda</p>
          </div>
        )}
      </div>
    );
  };

  const ProductForm = ({ product, mode, onSave, onCancel }) => (
    <div className="form-container">
      <div className="form-header">
        <h2>{mode === 'new' ? 'Nuevo Producto' : 'Editar Producto'}</h2>
        <p>{mode === 'new' ? 'Agregar nuevo producto al inventario' : 'Modificar información del producto'}</p>
      </div>
      
      <form onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);
        onSave(data);
      }} className="form">
        <div className="form-group">
          <label>Nombre del Producto *</label>
          <input 
            type="text" 
            name="name" 
            defaultValue={product?.name} 
            required 
            placeholder="Ej: Café Americano"
          />
        </div>

        <div className="form-group">
          <label>Descripción</label>
          <textarea 
            name="description" 
            defaultValue={product?.description}
            rows="3"
            placeholder="Descripción del producto..."
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Categoría *</label>
            <select name="category" defaultValue={product?.category} required>
              <option value="">Seleccionar categoría</option>
              {categoriesData.map(cat => (
                <option key={cat.id} value={cat.name}>{cat.name}</option>
              ))}
            </select>
          </div>
          
          <div className="form-group">
            <label>Precio ($) *</label>
            <input 
              type="number" 
              name="price" 
              step="0.01" 
              defaultValue={product?.price} 
              required 
              min="0"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Stock Actual *</label>
            <input 
              type="number" 
              name="stock" 
              defaultValue={product?.stock} 
              required 
              min="0"
            />
          </div>
          
          <div className="form-group">
            <label>Stock Mínimo *</label>
            <input 
              type="number" 
              name="minStock" 
              defaultValue={product?.minStock || 5} 
              required 
              min="0"
            />
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            {mode === 'new' ? 'Crear Producto' : 'Actualizar Producto'}
          </button>
          <button type="button" className="btn btn-outline" onClick={onCancel}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );

  const ProductView = ({ product, onEdit, onBack }) => (
    <div className="detail-view">
      <div className="detail-header">
        <h2>Detalles del Producto</h2>
        <p>Información completa del producto seleccionado</p>
      </div>
      
      <div className="detail-grid">
        <div className="detail-item">
          <label>Nombre:</label>
          <span>{product.name}</span>
        </div>
        <div className="detail-item">
          <label>Descripción:</label>
          <span>{product.description}</span>
        </div>
        <div className="detail-item">
          <label>Categoría:</label>
          <span>{product.category}</span>
        </div>
        <div className="detail-item">
          <label>Precio:</label>
          <span className="price">${product.price}</span>
        </div>
        <div className="detail-item">
          <label>Stock Actual:</label>
          <span className={product.stock <= product.minStock ? 'stock-critical' : 'stock-ok'}>
            {product.stock} unidades
          </span>
        </div>
        <div className="detail-item">
          <label>Stock Mínimo:</label>
          <span>{product.minStock} unidades</span>
        </div>
        <div className="detail-item">
          <label>Estado:</label>
          <span className={`status-badge status-${product.status.toLowerCase()}`}>
            {product.status}
          </span>
        </div>
      </div>
      
      <div className="detail-actions">
        <button className="btn btn-primary" onClick={onEdit}>
          <FaEdit /> Editar Producto
        </button>
        <button className="btn btn-outline" onClick={onBack}>
          <FaArrowLeft /> Volver a la lista
        </button>
      </div>
    </div>
  );

  const ReceiptView = ({ order, onBack }) => (
    <div className="receipt-container">
      <div className="receipt">
        <div className="receipt-header">
          <div className="receipt-logo">
            <FaHome />
            <h3>Nebula Café</h3>
          </div>
          <div className="receipt-info">
            <p>Boleta Electrónica</p>
            <p className="receipt-number">N° {order.id}</p>
          </div>
        </div>
        
        <div className="receipt-body">
          <div className="receipt-details">
            <p><strong>Cliente:</strong> {order.customer}</p>
            <p><strong>Fecha:</strong> {order.date}</p>
            <p><strong>Método de Pago:</strong> {order.payment}</p>
          </div>
          
          <div className="receipt-items">
            <h4>Productos:</h4>
            <div className="receipt-item">
              <span>Café Americano</span>
              <span>$12.50</span>
            </div>
            <div className="receipt-item">
              <span>Croissant</span>
              <span>$8.75</span>
            </div>
            {order.items > 2 && (
              <div className="receipt-item">
                <span>Otros productos...</span>
                <span>${(order.total - 21.25).toFixed(2)}</span>
              </div>
            )}
            <div className="receipt-total">
              <strong>TOTAL: ${order.total}</strong>
            </div>
          </div>
        </div>
        
        <div className="receipt-footer">
          <p>¡Gracias por su compra! Vuelva pronto</p>
          <p>Nebula Café - El mejor café de la ciudad</p>
        </div>
      </div>
      
      <div className="receipt-actions">
        <button className="btn btn-primary">
          <FaFilePdf /> Descargar PDF
        </button>
        <button className="btn btn-outline">
          <FaPrint /> Imprimir
        </button>
        <button className="btn btn-outline" onClick={onBack}>
          <FaArrowLeft /> Volver
        </button>
      </div>
    </div>
  );

  // ========== RENDERIZADO PRINCIPAL ==========
  const renderContent = () => {
    // Vistas especiales primero
    if (viewMode === 'receipt' && selectedItem) {
      return <ReceiptView order={selectedItem} onBack={handleBackToList} />;
    }

    if ((viewMode === 'new' || viewMode === 'edit') && activeMenu === 'products') {
      return (
        <ProductForm
          product={selectedItem}
          mode={viewMode}
          onSave={(data) => handleSave(data, 'producto')}
          onCancel={handleBackToList}
        />
      );
    }

    if (viewMode === 'view' && selectedItem && activeMenu === 'products') {
      return (
        <ProductView
          product={selectedItem}
          onEdit={() => handleEdit(selectedItem)}
          onBack={handleBackToList}
        />
      );
    }

    // Vistas principales por menú
    switch (activeMenu) {
      case 'dashboard':
        return (
          <>
            <div className="dashboard-overview">
              <h2>Resumen General</h2>
              <div className="overview-cardss">
                {overviewData.map(item => {
                  const Icon = item.icon;
                  return (
                    <div key={item.id} className="card">
                      <div className="card-header">
                        <div className="card-title">{item.title}</div>
                        <div className="card-iconn">
                          <Icon />
                        </div>
                      </div>
                      <div className="card-value">{item.value}</div>
                      <div className="card-footer">
                        {item.trend === 'positive' ? 
                          <span className="positive">{item.footer}</span> : 
                          item.trend === 'negative' ?
                          <span className="negative">{item.footer}</span> :
                          <span>{item.footer}</span>
                        }
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="dashboard-grid">
              <div className="critical-alerts">
                <h3>📊 Productos con Stock Crítico</h3>
                <div className="critical-list">
                  {productsData
                    .filter(p => p.status === 'Crítico')
                    .map(product => (
                      <div key={product.id} className="critical-item">
                        <FaExclamationTriangle className="warning-icon" />
                        <span>{product.name}</span>
                        <span className="stock-count">{product.stock} unidades</span>
                      </div>
                    ))
                  }
                </div>
              </div>

              <div className="recent-orders">
                <h3>🔄 Órdenes Recientes</h3>
                <div className="orders-list">
                  {ordersData.slice(0, 4).map(order => (
                    <div key={order.id} className="order-item">
                      <span className="order-customer">{order.customer}</span>
                      <span className="order-total">${order.total}</span>
                      <span className={`status-badge status-${order.status.toLowerCase().replace(' ', '-')}`}>
                        {order.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        );

      case 'orders':
        const orderColumns = [
          { key: 'id', label: 'Orden #', width: '100px' },
          { key: 'customer', label: 'Cliente' },
          { key: 'items', label: 'Items', width: '80px' },
          { key: 'total', label: 'Total', render: (value) => `$${value}` },
          { key: 'payment', label: 'Pago', width: '120px' },
          { key: 'status', label: 'Estado', render: (value) => (
            <span className={`status-badge status-${value.toLowerCase().replace(' ', '-')}`}>
              {value}
            </span>
          )},
          { key: 'date', label: 'Fecha', width: '120px' }
        ];

        return (
          <div className="section-content">
            <div className="section-header">
              <div className="section-title">
                <h2>Gestión de Órdenes</h2>
                <p>Administra y realiza seguimiento de todas las órdenes del sistema</p>
              </div>
              <div className="section-actions">
                <button className="btn btn-primary">
                  <FaPlus /> Nueva Orden
                </button>
              </div>
            </div>

            <DataTable
              data={ordersData}
              columns={orderColumns}
              onView={handleViewReceipt}
              onEdit={handleEdit}
              onDelete={(item) => handleDelete(item.id, 'orden')}
              searchPlaceholder="Buscar órdenes por cliente..."
            />
          </div>
        );

      case 'products':
        const productColumns = [
          { key: 'id', label: 'ID', width: '80px' },
          { key: 'name', label: 'Nombre' },
          { key: 'category', label: 'Categoría' },
          { key: 'price', label: 'Precio', render: (value) => `$${value}` },
          { key: 'stock', label: 'Stock', render: (value, item) => (
            <span className={value <= item.minStock ? 'stock-warning' : ''}>
              {value}
            </span>
          )},
          { key: 'status', label: 'Estado', render: (value) => (
            <span className={`status-badge status-${value.toLowerCase()}`}>
              {value}
            </span>
          )}
        ];

        return (
          <div className="section-content">
            <div className="section-header">
              <div className="section-title">
                <h2>Gestión de Productos</h2>
                <p>Administra el inventario y detalles de todos los productos</p>
              </div>
              <div className="section-actions">
                <button className="btn btn-primary" onClick={handleNew}>
                  <FaPlus /> Nuevo Producto
                </button>
              </div>
            </div>

            <div className="content-grid">
              <div className="main-content">
                <DataTable
                  data={productsData}
                  columns={productColumns}
                  onView={handleView}
                  onEdit={handleEdit}
                  onDelete={(item) => handleDelete(item.id, 'producto')}
                  searchPlaceholder="Buscar productos..."
                />
              </div>
              
              <div className="sidebar-content">
                <div className="info-card">
                  <h3>📦 Productos Críticos</h3>
                  <div className="critical-list">
                    {productsData
                      .filter(p => p.status === 'Crítico')
                      .map(product => (
                        <div key={product.id} className="critical-item">
                          <FaExclamationTriangle className="warning-icon" />
                          <span>{product.name}</span>
                          <span className="stock-count">{product.stock} unidades</span>
                        </div>
                      ))
                    }
                  </div>
                </div>

                <div className="info-card">
                  <h3>📊 Resumen Inventario</h3>
                  <div className="summary-stats">
                    <div className="stat">
                      <span>Total Productos:</span>
                      <span>{productsData.length}</span>
                    </div>
                    <div className="stat">
                      <span>Disponibles:</span>
                      <span>{productsData.filter(p => p.status === 'Disponible').length}</span>
                    </div>
                    <div className="stat">
                      <span>Críticos:</span>
                      <span className="negative">{productsData.filter(p => p.status === 'Crítico').length}</span>
                    </div>
                    <div className="stat">
                      <span>Agotados:</span>
                      <span>{productsData.filter(p => p.status === 'Agotado').length}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'categories':
        const categoryColumns = [
          { key: 'id', label: 'ID', width: '80px' },
          { key: 'name', label: 'Nombre' },
          { key: 'productCount', label: 'Productos', width: '100px' },
          { key: 'description', label: 'Descripción' },
          { key: 'status', label: 'Estado', render: (value) => (
            <span className={`status-badge status-${value.toLowerCase()}`}>
              {value}
            </span>
          )}
        ];

        return (
          <div className="section-content">
            <div className="section-header">
              <div className="section-title">
                <h2>Gestión de Categorías</h2>
                <p>Organiza los productos en categorías para mejor navegación</p>
              </div>
              <div className="section-actions">
                <button className="btn btn-primary">
                  <FaPlus /> Nueva Categoría
                </button>
              </div>
            </div>

            <DataTable
              data={categoriesData}
              columns={categoryColumns}
              onEdit={handleEdit}
              onDelete={(item) => handleDelete(item.id, 'categoría')}
              searchPlaceholder="Buscar categorías..."
            />
          </div>
        );

      case 'users':
        const userColumns = [
          { key: 'id', label: 'ID', width: '80px' },
          { key: 'name', label: 'Nombre' },
          { key: 'email', label: 'Email' },
          { key: 'phone', label: 'Teléfono', width: '140px' },
          { key: 'role', label: 'Rol', width: '120px' },
          { key: 'joinDate', label: 'Fecha Registro', width: '140px' },
          { key: 'status', label: 'Estado', render: (value) => (
            <span className={`status-badge status-${value.toLowerCase()}`}>
              {value}
            </span>
          )}
        ];

        return (
          <div className="section-content">
            <div className="section-header">
              <div className="section-title">
                <h2>Gestión de Usuarios</h2>
                <p>Administra las cuentas de usuario y sus permisos</p>
              </div>
              <div className="section-actions">
                <button className="btn btn-primary">
                  <FaPlus /> Nuevo Usuario
                </button>
              </div>
            </div>

            <DataTable
              data={usersData}
              columns={userColumns}
              onEdit={handleEdit}
              onView={handleView}
              onDelete={(item) => handleDelete(item.id, 'usuario')}
              searchPlaceholder="Buscar usuarios..."
            />

            <div className="additional-section">
              <h3>Historial de Compras</h3>
              <DataTable
                data={purchaseHistoryData}
                columns={[
                  { key: 'id', label: 'ID', width: '80px' },
                  { key: 'user', label: 'Usuario' },
                  { key: 'product', label: 'Producto' },
                  { key: 'quantity', label: 'Cantidad', width: '100px' },
                  { key: 'total', label: 'Total', render: (value) => `$${value}` },
                  { key: 'date', label: 'Fecha', width: '120px' }
                ]}
                searchPlaceholder="Buscar en historial..."
              />
            </div>
          </div>
        );

      case 'employees':
        const employeeColumns = [
          { key: 'id', label: 'ID', width: '80px' },
          { key: 'name', label: 'Nombre' },
          { key: 'position', label: 'Puesto' },
          { key: 'email', label: 'Email' },
          { key: 'phone', label: 'Teléfono', width: '140px' },
          { key: 'salary', label: 'Salario', width: '120px' },
          { key: 'status', label: 'Estado', render: (value) => (
            <span className={`status-badge status-${value.toLowerCase()}`}>
              {value}
            </span>
          )}
        ];

        return (
          <div className="section-content">
            <div className="section-header">
              <div className="section-title">
                <h2>Gestión de Empleados</h2>
                <p>Administra la información del personal de la cafetería</p>
              </div>
              <div className="section-actions">
                <button className="btn btn-primary">
                  <FaPlus /> Nuevo Empleado
                </button>
              </div>
            </div>

            <DataTable
              data={employeesData}
              columns={employeeColumns}
              onEdit={handleEdit}
              onView={handleView}
              onDelete={(item) => handleDelete(item.id, 'empleado')}
              searchPlaceholder="Buscar empleados..."
            />
          </div>
        );

      case 'reports':
        const reportColumns = [
          { key: 'id', label: 'ID', width: '80px' },
          { key: 'name', label: 'Nombre del Reporte' },
          { key: 'type', label: 'Tipo', width: '120px' },
          { key: 'date', label: 'Periodo', width: '120px' },
          { key: 'status', label: 'Estado', render: (value) => (
            <span className={`status-badge status-${value.toLowerCase().replace(' ', '-')}`}>
              {value}
            </span>
          )}
        ];

        return (
          <div className="section-content">
            <div className="section-header">
              <div className="section-title">
                <h2>Reportes y Análisis</h2>
                <p>Genera y visualiza reportes detallados del negocio</p>
              </div>
            </div>

            <DataTable
              data={reportsData}
              columns={reportColumns}
              onView={handleView}
              searchPlaceholder="Buscar reportes..."
            />

            <div className="reports-actions">
              <h3>📈 Generar Nuevo Reporte</h3>
              <div className="report-types">
                <button className="btn btn-primary">
                  <FaChartBar /> Reporte de Ventas
                </button>
                <button className="btn btn-primary">
                  <FaBox /> Reporte de Inventario
                </button>
                <button className="btn btn-primary">
                  <FaUsers /> Reporte de Clientes
                </button>
                <button className="btn btn-primary">
                  <FaDollarSign /> Reporte Financiero
                </button>
              </div>
            </div>
          </div>
        );

      case 'profile':
        // 🚨 CORRECCIÓN: Usar auth.username y auth.roles
        return (
          <div className="section-content">
            <div className="profile-container">
              <div className="profile-header">
                <div className="profile-avatar">
                  <FaUser size={60} />
                </div>
                <div className="profile-info">
                  <h2>{auth.username}</h2> 
                  <p>Rol: {auth.roles.join(', ')}</p>
                  <p>Estado: Activo</p>
                </div>
              </div>

              <div className="profile-details">
                 <h3><FaIdCard /> Información de Cuenta</h3>
                 <div className="detail-item">
                   <label><FaPhone /> Teléfono de Contacto:</label>
                   <span>+123 456 7890 (Simulado)</span>
                 </div>
                 <div className="detail-item">
                   <label><FaEnvelope /> Email:</label>
                   <span>{auth.username}@nebula.com (Simulado)</span>
                 </div>
              </div>

              <div className="profile-actions">
                <button className="btn btn-secondary">
                  <FaCog /> Editar Perfil
                </button>
                <button className="btn btn-danger" onClick={auth.logout}>
                  <FaSignOutAlt /> Cerrar Sesión
                </button>
              </div>
            </div>
          </div>
        );

      default:
        return <h1>Selecciona una opción del menú.</h1>;
    }
  };

  return (
    <div className="admin-dashboard-layout">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">
          <FaTachometerAlt size={30} className="logo-icon" />
          <h1>Admin Nebula</h1>
          <p className="admin-user">Bienvenido, {auth.username}</p> {/* 🚨 CORRECCIÓN */}
        </div>
        
        <nav className="menu-nav">
          {menuItems.map(item => (
            <button
              key={item.id}
              className={`menu-item ${activeMenu === item.id ? 'active' : ''}`}
              onClick={() => handleMenuClick(item.id)}
            >
              <item.icon className="menu-icon" />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button className="btn-logout" onClick={auth.logout}> {/* 🚨 CORRECCIÓN */}
            <FaSignOutAlt /> Cerrar Sesión
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <header className="main-header">
          <h2>{menuItems.find(item => item.id === activeMenu)?.label}</h2>
          <div className="user-info">
            <FaUser />
            <span>{auth.username}</span> {/* 🚨 CORRECCIÓN */}
          </div>
        </header>

        <div className="content-area">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}