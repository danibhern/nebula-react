// src/services/resenaService.js
import api from './api';

export const resenaService = {  // ← Asegúrate de que se llame resenaService
    // Crear nueva reseña
    crearResena: async (resenaData) => {
        try {
            const response = await api.post('/resenas', resenaData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Obtener todas las reseñas
    obtenerResenas: async () => {
        try {
            const response = await api.get('/resenas');
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Obtener reseña por ID
    obtenerResenaPorId: async (id) => {
        try {
            const response = await api.get(`/resenas/${id}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Obtener reseñas por calificación
    obtenerResenasPorCalificacion: async (calificacion) => {
        try {
            const response = await api.get(`/resenas/calificacion/${calificacion}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Eliminar reseña
    eliminarResena: async (id) => {
        try {
            const response = await api.delete(`/resenas/${id}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    }
};