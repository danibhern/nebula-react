import api from './api';

export const reservaService = {
    // Crear nueva reserva
    crearReserva: async (reservaData) => {
        try {
            console.log('📤 Enviando reserva a /reservas:', reservaData);
            const response = await api.post('/reservas', reservaData);  // ← SOLO /reservas
            console.log('✅ Reserva creada exitosamente:', response.data);
            return response.data;
        } catch (error) {
            console.error('❌ Error creando reserva:', error);
            if (error.response) {
                console.error('📡 Respuesta del servidor:', error.response.data);
                console.error('🔢 Status:', error.response.status);
                throw error.response.data;
            } else if (error.request) {
                throw new Error('No se pudo conectar al servidor');
            } else {
                throw new Error(error.message);
            }
        }
    },

    // Obtener todas las reservas
    obtenerReservas: async () => {
        try {
            const response = await api.get('/reservas');  // ← SOLO /reservas
            return response.data;
        } catch (error) {
            console.error('❌ Error obteniendo reservas:', error);
            throw error.response?.data || error.message;
        }
    },

    // Obtener reserva por ID
    obtenerReservaPorId: async (id) => {
        try {
            const response = await api.get(`/reservas/${id}`);  // ← SOLO /reservas/{id}
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Obtener reservas por email
    obtenerReservasPorEmail: async (email) => {
        try {
            const response = await api.get(`/reservas/email/${email}`);  // ← SOLO /reservas/email/{email}
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Actualizar reserva
    actualizarReserva: async (id, reservaData) => {
        try {
            const response = await api.put(`/reservas/${id}`, reservaData);  // ← SOLO /reservas/{id}
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Eliminar reserva
    eliminarReserva: async (id) => {
        try {
            const response = await api.delete(`/reservas/${id}`);  // ← SOLO /reservas/{id}
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    }
};

export default reservaService;