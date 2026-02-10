const WorkspaceInfo = ({workspaceTitle, workspaceDescription}) => {
    return (
        <div className="flex items-start gap-4 mb-6 bg-[#4A154B] p-6 rounded-lg border border-[#522653] shadow-md">
            <div className="w-12 h-12 rounded bg-linear-to-br from-[#611F69] to-[#4A154B] flex items-center justify-center text-white font-bold text-xl">
                {workspaceTitle?.[0]?.toUpperCase()}
            </div>

            <div>
                <h2 className="text-xl font-bold text-white mb-1">
                    Bienvenido a #{workspaceTitle}
                </h2>
                <p className="text-[#D1C7D3] text-sm">
                    Este es el comienzo del canal{" "}
                    <strong className="text-white">
                        #{workspaceTitle}
                    </strong>
                </p>

                {workspaceDescription && (
                    <p className="text-[#D1C7D3] text-sm mt-2">
                        {workspaceDescription}
                    </p>
                )}
            </div>
        </div>
    )
}

export default WorkspaceInfo