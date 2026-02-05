import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    withCredentials: true
})

export const getMyWorkspacesService = () => {
    return api.get('/api/workspaces/my-workspaces')
}

export const createWorkspaceService = (workspaceData) => {
    return api.post('/api/workspaces/create-workspace', workspaceData, { headers: { 'Content-Type': 'multipart/form-data' } })
}

export const deleteWorkspaceService = (idWorkspace) => {
    return api.delete(`/api/workspaces/${idWorkspace}/eliminar`)
}