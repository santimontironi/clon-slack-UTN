import { useState } from "react"
import HeaderChannel from "./HeaderChannel"
import ChannelData from "./ChannelData"

const ChannelView = ({ channel }) => {
    const [message, setMessage] = useState("")

    const handleSendMessage = (e) => {
        e.preventDefault()
        if (!message.trim()) return
        console.log("Enviando mensaje:", message)
        setMessage("")
    }

    return (
        <div className="flex flex-col h-full">
            <HeaderChannel channelName={channel.name} />

            <div className="flex-1 overflow-y-auto p-6">
                <ChannelData 
                    channelName={channel.name} 
                    channelDescription={channel.description} 
                />
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
