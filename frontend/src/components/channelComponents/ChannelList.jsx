import { useContext } from "react"
import { Link } from "react-router"
import ItemChannel from "./ItemChannel"
import { WorkspaceContext } from "../../context/WorkspaceContext"

const ChannelList = ({ workspaceChannels, workspaceId, canManageWorkspace }) => {
    const { selectedChannel, setSelectedChannel } = useContext(WorkspaceContext)

    return (
        <div className="flex-1 overflow-y-auto">
            <div className="px-3 py-2">
                <div className="flex items-center justify-between px-2 py-1 mb-2">
                    <h3 className="text-sm font-semibold text-gray-300 flex items-center gap-1">
                        <i className="bi bi-grid-3x3-gap"></i>
                        Canales
                    </h3>
                    {canManageWorkspace && (
                        <Link to={`/workspace/${workspaceId}/nuevo-canal`} className="text-gray-300 hover:text-white text-xl leading-none">
                            +
                        </Link>
                    )}
                </div>

                {workspaceChannels && workspaceChannels.length > 0 ? (
                    <ul className="space-y-1">
                        {workspaceChannels.map((channel) => (
                            <li key={channel._id}>
                                <ItemChannel
                                    channel={channel}
                                    isSelected={selectedChannel?._id === channel._id}
                                    onSelectChannel={setSelectedChannel}
                                />
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="px-2 py-4 text-center text-gray-400 text-sm">
                        No hay canales aún
                    </div>
                )}
            </div>
        </div>
    )
}

export default ChannelList
