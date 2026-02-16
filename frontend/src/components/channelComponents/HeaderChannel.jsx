const HeaderChannel = ({ channelName }) => {
    return (
        <header className="bg-[#3F0E40] border-b border-[#522653] px-6 py-3">
            <div className="flex items-center gap-2">
                <span className="text-gray-400 text-xl">#</span>
                <h2 className="text-white font-bold text-lg">{channelName}</h2>
            </div>
        </header>
    )
}

export default HeaderChannel