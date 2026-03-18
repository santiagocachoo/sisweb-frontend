import api from ".";

export const getAllEmpresaMiembros = async () => {
    const response = await api.get('/empresa-miembro')
    return response.data.payload
}