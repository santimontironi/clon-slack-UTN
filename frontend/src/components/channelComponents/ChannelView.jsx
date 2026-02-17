import { useState, useContext } from "react"
import HeaderChannel from "./HeaderChannel"
import ChannelData from "./ChannelData"
import { MessageContext } from "../../context/MessageContext"

const ChannelView = ({ channel }) => {
    const [message, setMessage] = useState("")

    const { messages, createMessage } = useContext(MessageContext)

    const handleSendMessage = async (e) => {
        e.preventDefault()
        if (!message.trim()) return
        try {
            await createMessage({ message })
            setMessage("")
        } catch (err) {
            console.error('Error al enviar mensaje', err)
        }
    }

    return (
        <div className="flex flex-col h-full">
            <HeaderChannel channelName={channel.name} />

            <div className="flex-1 overflow-y-auto p-6">
                {messages && messages.length > 0 ? (
                    <div className="flex flex-col gap-4">
                        {messages.map((m) => (
                            <div key={m._id} className="bg-[#2f0b2f] p-3 rounded-md">
                                <div className="text-sm text-gray-400">
                                    <strong className="text-white mr-2">{m.fk_id_member?.fk_id_user?.username}</strong>
                                    <span className="text-xs">{m.created_at ? new Date(m.created_at).toLocaleString() : ''}</span>
                                </div>
                                <div className="text-white mt-1">{m.message}</div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <ChannelData 
                        channelName={channel.name} 
                        channelDescription={channel.description} 
                    />
                )}
            </div>

            <div className="bg-[#3F0E40] border-t border-[#522653] px-6 py-4">
                <form onSubmit={handleSendMessage} className="flex gap-2">
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder={`Mensaje en #${channel.name}`}
                        className="flex-1 bg-[#522653] text-white px-4 py-2 rounded-lg border border-[#6B3B6E] focus:outline-none focus:border-[#964597] placeholder-gray-400"
                    />
                    <button
                        type="submit"
                        className="bg-[#964597] text-white px-4 py-2 rounded-lg hover:bg-[#8f3491] transition-colors"
                    >
                        <i className="bi bi-send"></i>
                    </button>
                </form>
            </div>
        </div>
    )
}

export default ChannelView
