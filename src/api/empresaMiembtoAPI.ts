import api from ".";
import type { EmpresaMiembro } from "../types/types";

export const getAllEmpresaMiembros = async () => {
    const response = await api.get('/empresa-miembro')
    return response.data.payload
}

export const createEmpresaMiembro = async (
    data: Omit<EmpresaMiembro, 'id_empresa' | 'tier'>
): Promise<EmpresaMiembro> => {
    const response = await api.post('/empresa-miembro', data)
    return response.data.payload
}

export const updateEmpresaMiembro = async (
    id: number,
    data: Partial<Omit<EmpresaMiembro, 'id_empresa' | 'tier' >>
): Promise<EmpresaMiembro> => {
    const response = await api.patch(`/empresa-miembro/${id}`, data)
    return response.data.payload
}

export const deleteEmpresaMiembro = async (id: number): Promise<void> => {
    await api.delete(`/empresa-miembro/${id}`)
}