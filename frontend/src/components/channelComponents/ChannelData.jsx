const ChannelData = ({ channelName, channelDescription }) => {
    return (
        <div className="flex items-center justify-center h-full">
            <div className="text-center">
                <i className="bi bi-hash text-6xl text-[#6B3B6E] mb-4 block"></i>
                <h3 className="text-white text-xl font-bold mb-2">
                    Bienvenido a #{channelName}
                </h3>
                <p className="text-gray-400">
                    Este es el comienzo del canal #{channelName}
                </p>
                {channelDescription && (
                    <p className="text-gray-400 text-sm mt-2">
                        {channelDescription}
                    </p>
                )}
            </div>
        </div>
    )
}

export default ChannelData