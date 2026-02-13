const MemberItem = ({ role, username }) => {
    return (
        <div className="p-4 hover:bg-gray-50 transition-colors flex items-center justify-between border-b border-gray-200 last:border-b-0">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-linear-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold text-sm">
                    {username?.[0]?.toUpperCase()}
                </div>

                <div>
                    <p className="font-semibold text-gray-900">
                        {username}
                    </p>
                    <p className="text-sm text-gray-500">
                        {role === 'admin' ? 'Administrador' : role === 'owner' ? 'Propietario' : 'Miembro'}
                    </p>
                </div>
            </div>

            <div className="flex items-center gap-3">
                {role === 'admin' && (
                    <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full">
                        Admin
                    </span>
                )}

                <button
                    className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors cursor-pointer"
                    aria-label="Eliminar miembro"
                >
                    <i className="bi bi-trash text-lg"></i>
                </button>
            </div>
        </div>
    )
}

export default MemberItem