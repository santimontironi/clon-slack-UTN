import { Link } from "react-router"

const ItemChannel = ({ id, channel }) => {
    return (
        <Link to={`/canal/${id}`} className="w-full px-2 py-1.5 rounded text-left text-sm hover:bg-[#350d36] transition flex items-center gap-2">
            <span className="text-gray-400">#</span>
            <span className="truncate">{channel.name}</span>
        </Link>
    )
}

export default ItemChannel