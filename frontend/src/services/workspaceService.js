import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    withCredentials: true
})

export const getMyWorkspacesService = () => {
    return api.get('/api/workspaces/my-workspaces')
}
