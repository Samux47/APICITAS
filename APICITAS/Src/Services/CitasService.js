import api from "./Conexion";

export const listarCitas = async () => {
    try {
        const response = await api.get("/listarCitas");
        return { success: true, data: response.data };
    } catch (error) {
        console.log("Error en listas citas:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: error.response ? error.response.data : "Error de conexion",
        };
    }
}

export const eliminarCitas = async (id) => {
    try {
        await api.delete(`/eliminarCitas/${id}`);
        return { success: true };
    } catch (error) {
        console.log("Error en eliminarCitas:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: error.response ? error.response.data : "Error de conexion"
        };
    }
}

export const crearCitas = async (data) => {
    try {
        const response = await api.post("/crearCitas", data);
        return { success: true, data: response.data };
    } catch (error) {
        console.log("Error en crearCitas:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: error.response ? error.response.data : "Error de conexion"
        };
    }
};

export const editarCitas = async (id, data) => {
    try {
        const response = await api.put(`/actualizarCitas/${id}`, data);
        return { success: true, data: response.data };
    } catch (error) {
        console.log("Error en editarCitas:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: error.response ? error.response.data : "Error de conexion"
        };
    }
};