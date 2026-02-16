import { useState } from "react"

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
            <div className="bg-[#3F0E40] border-b border-[#522653] px-6 py-3">
                <div className="flex items-center gap-2">
                    <span className="text-gray-400 text-xl">#</span>
                    <h2 className="text-white font-bold text-lg">{channel.name}</h2>
                </div>
                {channel.description && (
                    <p className="text-gray-400 text-sm mt-1">{channel.description}</p>
                )}
            </div>

            <div className="flex-1 overflow-y-auto p-6">
                <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                        <i className="bi bi-hash text-6xl text-[#6B3B6E] mb-4 block"></i>
                        <h3 className="text-white text-xl font-bold mb-2">
                            Bienvenido a #{channel.name}
                        </h3>
                        <p className="text-gray-400">
                            Este es el comienzo del canal #{channel.name}
                        </p>
                    </div>
                </div>
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
