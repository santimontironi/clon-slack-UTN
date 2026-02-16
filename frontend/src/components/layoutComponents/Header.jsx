const Header = ({ user, logout }) => {
    return (
        <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-white/80 dark:bg-[#1a1d21]/80 border-b border-white/20 dark:border-[#2d3139]">
            <div className="flex justify-between items-center px-6 md:px-10 py-4 max-w-400 mx-auto">

                <div className="flex items-center gap-3">
                    <svg className="w-9 h-9 drop-shadow-sm" viewBox="0 0 124 124" fill="none">
                        <path d="M26.3996 78.3999C26.3996 84.8999 21.0996 90.1999 14.5996 90.1999C8.09961 90.1999 2.79961 84.8999 2.79961 78.3999C2.79961 71.8999 8.09961 66.5999 14.5996 66.5999H26.3996V78.3999Z" fill="#E01E5A" />
                        <path d="M32.2996 78.3999C32.2996 71.8999 37.5996 66.5999 44.0996 66.5999C50.5996 66.5999 55.8996 71.8999 55.8996 78.3999V109.6C55.8996 116.1 50.5996 121.4 44.0996 121.4C37.5996 121.4 32.2996 116.1 32.2996 109.6V78.3999Z" fill="#E01E5A" />
                        <path d="M44.0996 26.4001C37.5996 26.4001 32.2996 21.1001 32.2996 14.6001C32.2996 8.1001 37.5996 2.8001 44.0996 2.8001C50.5996 2.8001 55.8996 8.1001 55.8996 14.6001V26.4001H44.0996Z" fill="#36C5F0" />
                        <path d="M44.0996 32.2999C50.5996 32.2999 55.8996 37.5999 55.8996 44.0999C55.8996 50.5999 50.5996 55.8999 44.0996 55.8999H12.8996C6.39961 55.8999 1.09961 50.5999 1.09961 44.0999C1.09961 37.5999 6.39961 32.2999 12.8996 32.2999H44.0996Z" fill="#36C5F0" />
                        <path d="M97.5996 44.0999C97.5996 37.5999 102.9 32.2999 109.4 32.2999C115.9 32.2999 121.2 37.5999 121.2 44.0999C121.2 50.5999 115.9 55.8999 109.4 55.8999H97.5996V44.0999Z" fill="#2EB67D" />
                        <path d="M91.6996 44.0999C91.6996 50.5999 86.3996 55.8999 79.8996 55.8999C73.3996 55.8999 68.0996 50.5999 68.0996 44.0999V12.8999C68.0996 6.3999 73.3996 1.0999 79.8996 1.0999C86.3996 1.0999 91.6996 6.3999 91.6996 12.8999V44.0999Z" fill="#2EB67D" />
                        <path d="M79.8996 97.5999C86.3996 97.5999 91.6996 102.9 91.6996 109.4C91.6996 115.9 86.3996 121.2 79.8996 121.2C73.3996 121.2 68.0996 115.9 68.0996 109.4V97.5999H79.8996Z" fill="#ECB22E" />
                        <path d="M79.8996 91.7001C73.3996 91.7001 68.0996 86.4001 68.0996 79.9001C68.0996 73.4001 73.3996 68.1001 79.8996 68.1001H111.1C117.6 68.1001 122.9 73.4001 122.9 79.9001C122.9 86.4001 117.6 91.7001 111.1 91.7001H79.8996Z" fill="#ECB22E" />
                    </svg>

                    <span className="font-bold text-lg tracking-tight text-[#1d1c1d] dark:text-white">
                        Workspace
                    </span>
                </div>

                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-200 hover:bg-black/5 dark:hover:bg-white/10">
                        <div className="w-10 h-10 rounded-xl bg-linear-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white font-bold shadow-md">
                            {user?.username?.charAt(0).toUpperCase()}
                        </div>

                        <span className="text-sm font-semibold text-[#1d1c1d] dark:text-white">
                            {user?.username}
                        </span>
                    </button>

                    <button
                        onClick={logout}
                        className="group flex cursor-pointer items-center gap-2 px-3 py-2 rounded-xl border border-black/10 dark:border-white/10 text-sm font-semibold text-gray-600 dark:text-gray-300 transition-all duration-200 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 dark:hover:bg-rose-500/10"
                        title="Cerrar sesión"
                    >
                        <i className="bi bi-box-arrow-right transition-transform duration-200 group-hover:translate-x-0.5"></i>
                        Cerrar sesión
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
