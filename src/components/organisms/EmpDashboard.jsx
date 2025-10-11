import React, { useState } from 'react';
import { 
  FaUser,
  FaSignOutAlt,
  FaClock,
  FaCalendar,
  FaUserTie,
  FaMoneyBill,
  FaTasks,
  FaCheck,
  FaTimes,
  FaEdit,
  FaTrash,
  FaPlus,
  FaPaperPlane
} from 'react-icons/fa';
import '../../styles/EmpDashboard.css';

export default function EmployeeDashboard({ user, onLogout }) {
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [tasks, setTasks] = useState([
    { id: 1, task: 'Preparar café especial del día', completed: true },
    { id: 2, task: 'Limpiar máquina de espresso', completed: false },
    { id: 3, task: 'Revisar inventario leche', completed: false },
    { id: 4, task: 'Organizar área de trabajo', completed: false }
  ]);
  const [newTask, setNewTask] = useState('');
  const [showAddTask, setShowAddTask] = useState(false);

  // Datos específicos del empleado
  const employeeData = {
    schedule: [
      { day: 'Lunes', hours: '8:00 - 16:00', type: 'Turno Mañana' },
      { day: 'Martes', hours: '8:00 - 16:00', type: 'Turno Mañana' },
      { day: 'Miércoles', hours: '12:00 - 20:00', type: 'Turno Tarde' },
      { day: 'Jueves', hours: '12:00 - 20:00', type: 'Turno Tarde' },
      { day: 'Viernes', hours: '8:00 - 16:00', type: 'Turno Mañana' }
    ],
    payInfo: {
      nextPayment: '2024-12-30',
      hoursThisWeek: 32,
      totalEarned: '$8,500'
    }
  };

  // Menú del empleado
  const menuItems = [
    { id: 'dashboard', label: 'Mi Panel', icon: FaUser },
    { id: 'schedule', label: 'Mi Horario', icon: FaCalendar },
    { id: 'tasks', label: 'Mis Tareas', icon: FaTasks },
    { id: 'payroll', label: 'Mi Nómina', icon: FaMoneyBill }
  ];

  // Funciones para tareas
  const toggleTask = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const addTask = () => {
    if (newTask.trim()) {
      const newTaskObj = {
        id: Date.now(),
        task: newTask.trim(),
        completed: false
      };
      setTasks([...tasks, newTaskObj]);
      setNewTask('');
      setShowAddTask(false);
    }
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  // Función para solicitar cambio de horario
  const requestScheduleChange = () => {
    alert('Solicitud de cambio de horario enviada al administrador');
  };

  // Función para ver detalles de pago
  const viewPayDetails = () => {
    alert(`Detalles de nómina:\nPróximo pago: ${employeeData.payInfo.nextPayment}\nHoras esta semana: ${employeeData.payInfo.hoursThisWeek}\nTotal: ${employeeData.payInfo.totalEarned}`);
  };

  return (
    <div className="employee-container">
      {/* Sidebar del Empleado */}
      <div className="employee-sidebar">
        <div className="sidebar-header">
          <div className="logo-container">
            <img src="/img/nebula.png" alt="Nebula Café" className="sidebar-logo" />
            <h2>Nebula Café</h2>
          </div>
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
          <h3>Mi Cuenta</h3>
          <div className="user-info">
            <div className="user-avatar">
              <FaUserTie />
            </div>
            <div className="user-details">
              <h4>{user?.name || 'Empleado'}</h4>
              <p>{user?.position || 'Posición'}</p>
              <small>{user?.email || 'empleado@nebula.com'}</small>
            </div>
          </div>
          <button className="logout-btn" onClick={onLogout}>
            <FaSignOutAlt /> Cerrar Sesión
          </button>
        </div>
      </div>
      
      {/* Contenido Principal del Empleado */}
      <div className="employee-content">
        <div className="employee-header">
          <h1>
            {activeMenu === 'dashboard' && `Bienvenido, ${user?.name || 'Empleado'}`}
            {activeMenu === 'schedule' && 'Mi Horario'}
            {activeMenu === 'tasks' && 'Mis Tareas'}
            {activeMenu === 'payroll' && 'Mi Nómina'}
          </h1>
          <div className="employee-info">
            <span className="employee-badge">{user?.position}</span>
          </div>
        </div>
        
        {activeMenu === 'dashboard' && (
          <div className="employee-dashboard">
            {/* Resumen Rápido */}
            <div className="quick-stats">
              <div className="stat-card">
                <FaClock className="stat-icon" />
                <div className="stat-info">
                  <h3>{employeeData.payInfo.hoursThisWeek}h</h3>
                  <p>Horas esta semana</p>
                </div>
              </div>
              <div className="stat-card">
                <FaTasks className="stat-icon" />
                <div className="stat-info">
                  <h3>
                    {tasks.filter(t => t.completed).length}/
                    {tasks.length}
                  </h3>
                  <p>Tareas completadas</p>
                </div>
              </div>
              <div className="stat-card">
                <FaMoneyBill className="stat-icon" />
                <div className="stat-info">
                  <h3>{employeeData.payInfo.totalEarned}</h3>
                  <p>Total ganado</p>
                </div>
              </div>
            </div>

            {/* Horario de Hoy */}
            <div className="today-schedule">
              <div className="section-header">
                <h2>Mi Horario de Hoy</h2>
                <button 
                  className="btn btn-outline"
                  onClick={requestScheduleChange}
                >
                  <FaEdit /> Solicitar Cambio
                </button>
              </div>
              <div className="schedule-card">
                <FaCalendar className="schedule-icon" />
                <div className="schedule-info">
                  <h3>8:00 - 16:00</h3>
                  <p>Turno Mañana - {user?.position}</p>
                </div>
              </div>
            </div>

            {/* Tareas Pendientes */}
            <div className="pending-tasks">
              <div className="section-header">
                <h2>Tareas Pendientes</h2>
                <button 
                  className="btn btn-primary"
                  onClick={() => setShowAddTask(!showAddTask)}
                >
                  <FaPlus /> Nueva Tarea
                </button>
              </div>
              
              {showAddTask && (
                <div className="add-task-form">
                  <input
                    type="text"
                    placeholder="Escribe una nueva tarea..."
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    className="task-input"
                  />
                  <div className="task-actions">
                    <button className="btn btn-primary" onClick={addTask}>
                      <FaCheck /> Agregar
                    </button>
                    <button 
                      className="btn btn-outline" 
                      onClick={() => setShowAddTask(false)}
                    >
                      <FaTimes /> Cancelar
                    </button>
                  </div>
                </div>
              )}
              
              <div className="tasks-list">
                {tasks.filter(task => !task.completed).map(task => (
                  <div key={task.id} className="task-item">
                    <input 
                      type="checkbox" 
                      checked={task.completed}
                      onChange={() => toggleTask(task.id)}
                    />
                    <span>{task.task}</span>
                    <button 
                      className="btn-delete-task"
                      onClick={() => deleteTask(task.id)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                ))}
                {tasks.filter(task => !task.completed).length === 0 && (
                  <p className="no-tasks">¡No hay tareas pendientes! 🎉</p>
                )}
              </div>
            </div>
          </div>
        )}

        {activeMenu === 'schedule' && (
          <div className="schedule-section">
            <div className="section-header">
              <h2>Mi Horario Semanal</h2>
              <button 
                className="btn btn-primary"
                onClick={requestScheduleChange}
              >
                <FaPaperPlane /> Solicitar Cambio
              </button>
            </div>
            <div className="schedule-grid">
              {employeeData.schedule.map((day, index) => (
                <div key={index} className="schedule-day">
                  <h3>{day.day}</h3>
                  <p className="schedule-hours">{day.hours}</p>
                  <span className="schedule-type">{day.type}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeMenu === 'tasks' && (
          <div className="tasks-section">
            <div className="section-header">
              <h2>Mis Tareas</h2>
              <button 
                className="btn btn-primary"
                onClick={() => setShowAddTask(!showAddTask)}
              >
                <FaPlus /> Nueva Tarea
              </button>
            </div>

            {showAddTask && (
              <div className="add-task-form">
                <input
                  type="text"
                  placeholder="Escribe una nueva tarea..."
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  className="task-input"
                />
                <div className="task-actions">
                  <button className="btn btn-primary" onClick={addTask}>
                    <FaCheck /> Agregar
                  </button>
                  <button 
                    className="btn btn-outline" 
                    onClick={() => setShowAddTask(false)}
                  >
                    <FaTimes /> Cancelar
                  </button>
                </div>
              </div>
            )}

            <div className="tasks-container">
              {tasks.map(task => (
                <div key={task.id} className={`task-card ${task.completed ? 'completed' : ''}`}>
                  <div className="task-checkbox">
                    <input 
                      type="checkbox" 
                      checked={task.completed}
                      onChange={() => toggleTask(task.id)}
                    />
                  </div>
                  <div className="task-content">
                    <h3>{task.task}</h3>
                    <p>{task.completed ? 'Completada' : 'Pendiente'}</p>
                  </div>
                  <button 
                    className="btn-delete-task"
                    onClick={() => deleteTask(task.id)}
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeMenu === 'payroll' && (
          <div className="payroll-section">
            <div className="section-header">
              <h2>Información de Nómina</h2>
              <button 
                className="btn btn-primary"
                onClick={viewPayDetails}
              >
                <FaMoneyBill /> Ver Detalles
              </button>
            </div>
            <div className="payroll-info">
              <div className="payroll-card">
                <h3>Próximo Pago</h3>
                <p className="payroll-date">{employeeData.payInfo.nextPayment}</p>
                <small>Fecha estimada</small>
              </div>
              <div className="payroll-card">
                <h3>Horas Esta Semana</h3>
                <p className="payroll-hours">{employeeData.payInfo.hoursThisWeek} horas</p>
                <small>Registradas</small>
              </div>
              <div className="payroll-card">
                <h3>Total Ganado</h3>
                <p className="payroll-total">{employeeData.payInfo.totalEarned}</p>
                <small>Este mes</small>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}