import api from './api'; // Tu archivo ya configurado

export const reservaService = {
    // Crear nueva reserva
    crearReserva: async (reservaData) => {
        try {
            const response = await api.post('/reservas', reservaData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Obtener todas las reservas
    obtenerReservas: async () => {
        try {
            const response = await api.get('/reservas');
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Obtener reserva por ID
    obtenerReservaPorId: async (id) => {
        try {
            const response = await api.get(`/reservas/${id}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Obtener reservas por email
    obtenerReservasPorEmail: async (email) => {
        try {
            const response = await api.get(`/reservas/email/${email}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Actualizar reserva
    actualizarReserva: async (id, reservaData) => {
        try {
            const response = await api.put(`/reservas/${id}`, reservaData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Eliminar reserva
    eliminarReserva: async (id) => {
        try {
            const response = await api.delete(`/reservas/${id}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    }
};