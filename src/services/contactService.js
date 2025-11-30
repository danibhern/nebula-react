import api from './api';

export const contactService = {
    // Crear nuevo contacto
    crearContacto: async (contactoData) => {
        try {
            console.log('📤 Enviando datos a la API:', contactoData);
            console.log('🔗 URL:', `${process.env.REACT_APP_API_URL || 'http://localhost:8080/api'}/contactos`);
            
            const response = await api.post('/contactos', contactoData);
            
            console.log('✅ Respuesta exitosa:', response.data);
            return response.data;
        } catch (error) {
            console.error('❌ Error en crearContacto:', {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status,
                config: error.config
            });
            throw error.response?.data || error.message;
        }
    },

    // Obtener todos los contactos
    obtenerContactos: async () => {
        try {
            const response = await api.get('/contactos');
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Obtener contacto por ID
    obtenerContactoPorId: async (id) => {
        try {
            const response = await api.get(`/contactos/${id}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Obtener contactos por email
    obtenerContactosPorEmail: async (email) => {
        try {
            const response = await api.get(`/contactos/email/${email}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Actualizar contacto
    actualizarContacto: async (id, contactoData) => {
        try {
            const response = await api.put(`/contactos/${id}`, contactoData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Eliminar contacto
    eliminarContacto: async (id) => {
        try {
            const response = await api.delete(`/contactos/${id}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    }
};