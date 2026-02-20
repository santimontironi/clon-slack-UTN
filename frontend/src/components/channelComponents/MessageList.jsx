const formatTimestamp = (isoString) => {
    if (!isoString) return ''
    const d = new Date(isoString)
    const date = d.toLocaleDateString()
    const time = d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    return `${date} ${time}`
}

const MessageList = ({ messages = [], user }) => {
    return (
        <div className="flex flex-col gap-4">
            {messages.map((m) => {
                const authorId = m.fk_id_member?.fk_id_user?._id
                const isMine = authorId === user?._id
                const memberExists = Boolean(m.fk_id_member && m.fk_id_member.fk_id_user)
                const displayName = memberExists ? m.fk_id_member.fk_id_user.username : 'Usuario eliminado'
                const nameClass = memberExists ? 'text-white mr-2' : 'text-red-300 mr-2 italic'

                return (
                    <div key={m._id} className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}>
                        <div className={`${isMine ? 'bg-[#6b21a8] rounded-tl-md rounded-br-md text-right' : 'bg-[#2f0b2f] rounded-tr-md rounded-bl-md text-left'} p-3 max-w-[70%]`}>
                            <div className="text-sm text-gray-400">
                                <strong className={nameClass}>{displayName}</strong>
                                <span className="text-xs">{m.created_at ? formatTimestamp(m.created_at) : ''}</span>
                            </div>
                            <div className="text-white mt-1">{m.message}</div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default MessageList
