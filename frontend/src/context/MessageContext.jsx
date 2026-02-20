import { createContext, useState } from "react";
import { createMessageService, getMessagesService } from "../services/messageService";
import { useContext } from "react";
import { WorkspaceContext } from "./WorkspaceContext";

export const MessageContext = createContext();

export const MessageProvider = ({children}) => {

    const [messages, setMessages] = useState([]);

    const { selectedChannel, workspaceById } = useContext(WorkspaceContext);

    const fetchMessages = async () => {
        try {
            const res = await getMessagesService(workspaceById._id, selectedChannel._id);
            setMessages(res.data.messages || []);
        } catch (err) {
            console.error('Error fetching messages', err)
        }
    }

    async function createMessage(messageData) {
        try {
            const res = await createMessageService(workspaceById._id, selectedChannel._id, messageData);
            const newMessage = res.data.newMessage
            setMessages(prev => [...prev, newMessage]);
            return res.data;
        } catch (err) {
            throw err;
        }
    }

    return (
        <MessageContext.Provider value={{ messages, createMessage, fetchMessages }}>
            {children}
        </MessageContext.Provider>
    )
}