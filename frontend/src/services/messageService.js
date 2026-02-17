import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    withCredentials: true
})

export const createMessageService = (idWorkspace, idChannel, messageData) => {
    return api.post(`/api/workspaces/${idWorkspace}/canales/${idChannel}/mensaje`, messageData)
}

export const getMessagesService = (idWorkspace, idChannel) => {
    return api.get(`/api/workspaces/${idWorkspace}/canales/${idChannel}/mensajes`)
}