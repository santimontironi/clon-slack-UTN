const ItemChannel = ({ channel, isSelected, onSelectChannel }) => {
    return (
        <button 
            onClick={() => onSelectChannel(channel)}
            className={`w-full px-2 py-1.5 rounded text-left text-sm hover:bg-[#350d36] transition flex items-center gap-2 ${isSelected ? 'bg-[#1164A3] hover:bg-[#1164A3]' : ''}`}
        >
            <span className="text-gray-400">#</span>
            <span className="truncate">{channel.name}</span>
        </button>
    )
}

export default ItemChannel