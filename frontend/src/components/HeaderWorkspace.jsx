const HeaderWorkspace = ({ workspaceTitle }) => {
    return (
        <header className="h-14 flex items-center px-6 bg-[#4A154B] border-b border-[#522653] shadow-sm">
            <h1 className="text-lg font-bold hidden md:block text-white">
                # {workspaceTitle || "General"}
            </h1>
        </header>
    )
}

export default HeaderWorkspace