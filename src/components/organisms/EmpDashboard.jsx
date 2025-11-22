import React, { useState } from 'react';
// 🚨 CORRECCIÓN: Reemplazamos react-icons/fa con lucide-react para evitar el error de compilación.
import { 
  User,
  LogOut, 
  Clock, 
  Calendar, 
  UserCheck, 
  DollarSign, 
  ListChecks, 
  Check, 
  X, 
  Edit, 
  Trash2, 
  Plus, 
  Send, 
  Building, 
  BarChart3 
} from 'lucide-react';


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

  const menuItems = [
    { id: 'dashboard', label: 'Mi Panel', icon: BarChart3 }, 
    { id: 'schedule', label: 'Mi Horario', icon: Calendar },
    { id: 'tasks', label: 'Mis Tareas', icon: ListChecks },
    { id: 'payroll', label: 'Mi Nómina', icon: DollarSign }
  ];

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
    console.log(`[ACCIÓN SIMULADA] Tarea eliminada: ${taskId}`);
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const requestScheduleChange = () => {
    console.log('Solicitud de cambio de horario enviada al administrador (Simulado).');
  };

  const viewPayDetails = () => {
    console.log(`Detalles de nómina solicitados:\nPróximo pago: ${employeeData.payInfo.nextPayment}\nHoras esta semana: ${employeeData.payInfo.hoursThisWeek}\nTotal: ${employeeData.payInfo.totalEarned}`);
  };

  return (
    <>
      <style>{`
        .employee-container {
          display: flex;
          min-height: 100vh;
          font-family: 'Inter', sans-serif;
        }

        .employee-sidebar {
          width: 280px;
          background-color: #2c3e50; /* Azul Oscuro */
          color: white;
          display: flex;
          flex-direction: column;
          padding: 1.5rem 0;
          box-shadow: 4px 0 10px rgba(0, 0, 0, 0.2);
        }

        .sidebar-header {
          padding: 0 1.5rem 2rem;
        }

        .logo-container {
          display: flex;
          align-items: center;
          margin-bottom: 1rem;
        }
        
        /* Modificado para usar ícono en lugar de imagen */
        .sidebar-logo-icon {
          width: 40px;
          height: 40px;
          margin-right: 10px;
          color: #3498db;
        }
        
        .sidebar-header h2 {
          font-size: 1.5rem;
          font-weight: 700;
          color: #ecf0f1;
        }

        .sidebar-menu {
          flex-grow: 1;
        }

        .menu-item {
          display: flex;
          align-items: center;
          padding: 1rem 1.5rem;
          cursor: pointer;
          transition: background-color 0.2s, color 0.2s;
          margin: 0.5rem 0;
        }

        .menu-item:hover {
          background-color: #34495e; /* Oscuro al pasar el mouse */
        }

        .menu-item.active {
          background-color: #3498db; /* Azul Brilante para activo */
          font-weight: 600;
          color: white;
          border-left: 5px solid #ecf0f1;
        }

        .menu-icon {
          margin-right: 15px;
          font-size: 1.2rem;
        }

        .session-section {
          padding: 1.5rem;
          border-top: 1px solid #34495e;
        }

        .session-section h3 {
          font-size: 1rem;
          color: #bdc3c7;
          margin-bottom: 1rem;
          text-transform: uppercase;
        }

        .user-info {
          display: flex;
          align-items: center;
          margin-bottom: 1rem;
          padding: 0.5rem;
          background: #34495e;
          border-radius: 8px;
        }

        .user-avatar {
          font-size: 2rem;
          background: #ecf0f1;
          color: #2c3e50;
          border-radius: 50%;
          padding: 5px;
          margin-right: 10px;
        }

        .user-details h4 {
          font-size: 1rem;
          margin: 0;
        }

        .user-details p {
          font-size: 0.85rem;
          margin: 0;
          color: #bdc3c7;
        }
        
        .user-details small {
          font-size: 0.75rem;
          color: #bdc3c7;
        }

        .logout-btn {
          width: 100%;
          background-color: #e74c3c; /* Rojo para salir */
          color: white;
          padding: 0.75rem;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: background-color 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1rem;
        }

        .logout-btn:hover {
          background-color: #c0392b;
        }

        .logout-btn svg {
          margin-right: 8px;
        }

        /* Main Content */
        .employee-content {
          flex-grow: 1;
          padding: 2rem;
          background-color: #f4f7f9;
        }

        .employee-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
          padding-bottom: 1rem;
          border-bottom: 2px solid #ddd;
        }

        .employee-header h1 {
          font-size: 2rem;
          color: #2c3e50;
        }

        .employee-info .employee-badge {
          background: #3498db;
          color: white;
          padding: 0.4rem 0.8rem;
          border-radius: 20px;
          font-weight: 500;
          font-size: 0.9rem;
        }

        /* Dashboard Styles */
        .employee-dashboard {
          display: grid;
          gap: 2rem;
        }

        .quick-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
        }

        .stat-card {
          background: white;
          padding: 1.5rem;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
          display: flex;
          align-items: center;
        }

        .stat-icon {
          font-size: 2.5rem;
          color: #3498db;
          margin-right: 1rem;
        }

        .stat-info h3 {
          margin: 0;
          font-size: 1.5rem;
          color: #2c3e50;
        }

        .stat-info p {
          margin: 0;
          color: #7f8c8d;
        }

        .today-schedule, .pending-tasks {
          background: white;
          padding: 1.5rem;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }
        
        .schedule-section, .tasks-section, .payroll-section {
          background: white;
          padding: 2rem;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
          padding-bottom: 10px;
          border-bottom: 1px solid #ecf0f1;
        }
        
        .section-header h2 {
          font-size: 1.25rem;
          color: #2c3e50;
        }

        .btn {
          padding: 0.5rem 1rem;
          border-radius: 6px;
          cursor: pointer;
          transition: background-color 0.2s;
          display: inline-flex;
          align-items: center;
          font-weight: 500;
          font-size: 0.9rem;
        }

        .btn svg {
          margin-right: 8px;
        }

        .btn-primary {
          background-color: #3498db;
          color: white;
          border: 1px solid #3498db;
        }

        .btn-primary:hover {
          background-color: #2980b9;
        }

        .btn-outline {
          background-color: white;
          color: #3498db;
          border: 1px solid #3498db;
        }
        
        .btn-outline:hover {
          background-color: #ecf0f1;
        }

        /* Schedule Card */
        .schedule-card {
          display: flex;
          align-items: center;
          padding: 1rem;
          background: #ecf0f1;
          border-radius: 8px;
        }

        .schedule-icon-container {
          font-size: 2rem;
          color: #2c3e50;
          margin-right: 15px;
        }

        .schedule-info h3 {
          margin: 0;
          color: #2c3e50;
        }

        .schedule-info p {
          margin: 0;
          color: #7f8c8d;
        }
        
        /* Tasks List */
        .tasks-list {
          margin-top: 1rem;
        }

        .task-item {
          display: flex;
          align-items: center;
          padding: 0.75rem 0;
          border-bottom: 1px solid #ecf0f1;
        }
        
        .task-item:last-child {
          border-bottom: none;
        }

        .task-item input[type="checkbox"] {
          margin-right: 10px;
          min-width: 18px;
          min-height: 18px;
          cursor: pointer;
        }

        .task-item span {
          flex-grow: 1;
          color: #2c3e50;
        }
        
        .task-item .btn-delete-task {
          background: none;
          border: none;
          color: #e74c3c;
          cursor: pointer;
          opacity: 0.6;
          transition: opacity 0.2s;
        }
        
        .task-item .btn-delete-task:hover {
          opacity: 1;
        }
        
        .no-tasks {
          text-align: center;
          color: #7f8c8d;
          padding: 1rem;
        }

        .add-task-form {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 1rem;
          padding: 1rem;
          border: 1px dashed #bdc3c7;
          border-radius: 8px;
        }
        
        .task-input {
          padding: 0.5rem;
          border: 1px solid #bdc3c7;
          border-radius: 6px;
        }

        .task-actions {
          display: flex;
          gap: 10px;
          justify-content: flex-end;
        }
        
        /* Schedule Section */
        .schedule-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 1.5rem;
          margin-top: 1rem;
        }
        
        .schedule-day {
          background: #ecf0f1;
          padding: 1rem;
          border-radius: 8px;
          text-align: center;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        }
        
        .schedule-day h3 {
          margin-top: 0;
          color: #2c3e50;
        }
        
        .schedule-hours {
          font-weight: 600;
          color: #3498db;
          font-size: 1.1rem;
        }
        
        .schedule-type {
          display: block;
          margin-top: 5px;
          font-size: 0.85rem;
          color: #7f8c8d;
        }

        /* Tasks Section */
        .tasks-container {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-top: 1.5rem;
        }

        .task-card {
          display: flex;
          align-items: center;
          padding: 1rem;
          background: #fcfcfc;
          border-radius: 8px;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
          transition: border-left 0.3s;
        }
        
        .task-card.completed {
          border-left: 5px solid #2ecc71; /* Verde para completado */
          opacity: 0.8;
        }
        
        .task-card:not(.completed) {
          border-left: 5px solid #f39c12; /* Naranja para pendiente */
        }

        .task-content {
          flex-grow: 1;
          margin-left: 10px;
        }
        
        .task-content h3 {
          margin: 0;
          font-size: 1rem;
          color: #2c3e50;
          text-decoration: none;
        }

        .task-card.completed .task-content h3 {
          text-decoration: line-through;
          color: #7f8c8d;
        }

        .task-content p {
          margin: 0;
          font-size: 0.8rem;
          color: #95a5a6;
        }
        
        /* Payroll Section */
        .payroll-info {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.5rem;
          margin-top: 1.5rem;
        }
        
        .payroll-card {
          background: #ecf0f1;
          padding: 1.5rem;
          border-radius: 12px;
          text-align: center;
        }
        
        .payroll-card h3 {
          margin-top: 0;
          color: #34495e;
          font-size: 1.1rem;
        }
        
        .payroll-date, .payroll-hours, .payroll-total {
          font-size: 1.8rem;
          font-weight: 700;
          color: #2c3e50;
          margin: 10px 0;
        }
        
        .payroll-date { color: #2980b9; }
        .payroll-hours { color: #f39c12; }
        .payroll-total { color: #2ecc71; }
        
        .payroll-card small {
          color: #7f8c8d;
        }

        /* Responsive adjustments */
        @media (max-width: 900px) {
          .employee-sidebar {
            width: 80px;
            align-items: center;
            padding: 1rem 0;
          }
          
          .sidebar-header h2, .menu-item span, .session-section h3, .user-details {
            display: none;
          }
          
          .sidebar-header, .session-section {
            padding: 0.5rem;
          }

          .user-info {
            background: none;
            padding: 0;
          }

          .user-avatar {
            margin-right: 0;
          }

          .menu-item {
            justify-content: center;
            padding: 0.75rem;
          }

          .menu-icon {
            margin-right: 0;
          }
          
          .logout-btn span {
            display: none;
          }
        }

        @media (max-width: 600px) {
          .employee-container {
            flex-direction: column;
          }
          
          .employee-sidebar {
            width: 100%;
            height: auto;
            flex-direction: row;
            justify-content: space-around;
            padding: 0.5rem 0;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
            order: 2; /* Mueve el sidebar al final para mobile */
          }

          .sidebar-header, .session-section {
            display: none;
          }
          
          .sidebar-menu {
            flex-direction: row;
            display: flex;
            width: 100%;
          }

          .menu-item {
            flex: 1;
            justify-content: center;
            padding: 0.75rem 0.5rem;
            border-radius: 0;
            margin: 0;
          }
          
          .menu-item.active {
            border-left: none;
            border-top: 3px solid #ecf0f1;
          }

          .employee-content {
            padding: 1rem;
            order: 1;
          }
          
          .employee-header {
            margin-bottom: 1rem;
            flex-direction: column;
            align-items: flex-start;
          }
          
          .employee-header h1 {
            font-size: 1.5rem;
          }
        }
      `}</style>
      <div className="employee-container">
        <div className="employee-sidebar">
          <div className="sidebar-header">
            <div className="logo-container">
              {/* 🚨 CORRECCIÓN: Reemplazo de imagen externa por un ícono de Lucide */}
              <Building className="sidebar-logo-icon" size={30} />
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
                <UserCheck size={32} /> {/* FaUserTie */}
              </div>
              <div className="user-details">
                <h4>{user?.name || 'Empleado'}</h4>
                <p>{user?.position || 'Posición'}</p>
                <small>{user?.email || 'empleado@nebula.com'}</small>
              </div>
            </div>
            {/* FaSignOutAlt */}
            <button className="logout-btn" onClick={onLogout}>
              <LogOut /> Cerrar Sesión
            </button>
          </div>
        </div>

        <div className="employee-content">
          <div className="employee-header">
            <h1>
              {activeMenu === 'dashboard' && `Bienvenido, ${user?.name || 'Empleado'}`}
              {activeMenu === 'schedule' && 'Mi Horario'}
              {activeMenu === 'tasks' && 'Mis Tareas'}
              {activeMenu === 'payroll' && 'Mi Nómina'}
            </h1>
            <div className="employee-info">
              <span className="employee-badge">{user?.position || 'Sin Asignar'}</span>
            </div>
          </div>
          
          {activeMenu === 'dashboard' && (
            <div className="employee-dashboard">
              <div className="quick-stats">
                <div className="stat-card">
                  <Clock size={40} className="stat-icon" /> {/* FaClock */}
                  <div className="stat-info">
                    <h3>{employeeData.payInfo.hoursThisWeek}h</h3>
                    <p>Horas esta semana</p>
                  </div>
                </div>
                <div className="stat-card">
                  <ListChecks size={40} className="stat-icon" /> {/* FaTasks */}
                  <div className="stat-info">
                    <h3>
                      {tasks.filter(t => t.completed).length}/
                      {tasks.length}
                    </h3>
                    <p>Tareas completadas</p>
                  </div>
                </div>
                <div className="stat-card">
                  <DollarSign size={40} className="stat-icon" /> {/* FaMoneyBill */}
                  <div className="stat-info">
                    <h3>{employeeData.payInfo.totalEarned}</h3>
                    <p>Total ganado</p>
                  </div>
                </div>
              </div>

              <div className="today-schedule">
                <div className="section-header">
                  <h2>Mi Horario de Hoy</h2>
                  <button 
                    className="btn btn-outline"
                    onClick={requestScheduleChange}
                  >
                    <Edit /> Solicitar Cambio {/* FaEdit */}
                  </button>
                </div>
                <div className="schedule-card">
                  <div className="schedule-icon-container">
                    <Calendar size={32} /> {/* FaCalendar */}
                  </div>
                  <div className="schedule-info">
                    {/* Nota: Usamos datos simulados aquí, ya que no tenemos la lógica para determinar el horario "de hoy" */}
                    <h3>8:00 - 16:00</h3> 
                    <p>Turno Mañana - {user?.position}</p>
                  </div>
                </div>
              </div>

              <div className="pending-tasks">
                <div className="section-header">
                  <h2>Tareas Pendientes</h2>
                  <button 
                    className="btn btn-primary"
                    onClick={() => setShowAddTask(!showAddTask)}
                  >
                    <Plus /> Nueva Tarea {/* FaPlus */}
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
                        <Check /> Agregar {/* FaCheck */}
                      </button>
                      <button 
                        className="btn btn-outline" 
                        onClick={() => setShowAddTask(false)}
                      >
                        <X /> Cancelar {/* FaTimes */}
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
                        <Trash2 /> {/* FaTrash */}
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
                  <Send /> Solicitar Cambio {/* FaPaperPlane */}
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
                  <Plus /> Nueva Tarea {/* FaPlus */}
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
                      <Check /> Agregar {/* FaCheck */}
                    </button>
                    <button 
                      className="btn btn-outline" 
                      onClick={() => setShowAddTask(false)}
                    >
                      <X /> Cancelar {/* FaTimes */}
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
                      <Trash2 /> {/* FaTrash */}
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
                  <DollarSign /> Ver Detalles {/* FaMoneyBill */}
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
    </>
  );
}