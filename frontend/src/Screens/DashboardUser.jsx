import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { WorkspaceContext } from "../context/WorkspaceContext";
import Loader from "../components/Loader";
import WorkspaceList from "../components/WorkspaceList";
import Header from "../components/Header";

const DashboardUser = () => {
    const { user, loading, logout } = useContext(AuthContext);
    const { workspaces } = useContext(WorkspaceContext);

    return (
        <section className="min-h-screen bg-linear-to-br bg-[#3F0E40]">
            {loading.session ? <Loader /> : (
                <div className="max-w-full lg:max-w-300 xl:max-w-350 mx-auto">
                    <Header user={user} logout={logout} />

                    <main className="px-5 py-6 md:px-10 md:py-10 lg:px-15 lg:py-12 xl:px-20 xl:py-14">
                        <div className="mb-8">
                            <h1 className="text-[28px] md:text-4xl lg:text-[42px] xl:text-5xl font-bold text-white mb-2 tracking-tight drop-shadow-lg">
                                Bienvenido
                            </h1>
                            <p className="text-base md:text-lg text-white/90 m-0">
                                {workspaces?.length > 0
                                    ? `Tienes ${workspaces.length} ${workspaces.length === 1 ? 'espacio de trabajo' : 'espacios de trabajo'}`
                                    : 'Aún no tienes espacios de trabajo'
                                }
                            </p>
                        </div>

                        {workspaces?.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 lg:gap-6 mb-10">
                                {workspaces.map((workspace) => (
                                    <WorkspaceList
                                        key={workspace._id}
                                        id={workspace._id}
                                        title={workspace.title}
                                        description={workspace.description}
                                        image={workspace.image}
                                        created_at={workspace.created_at}
                                    />
                                ))}

                                <a
                                    href="/crear-workspace"
                                    className="bg-white/10 backdrop-blur-sm border-2 border-dashed border-white/30 rounded-xl p-6 min-h-45 flex flex-col items-center justify-center gap-3 no-underline text-white font-bold text-[15px] transition-all duration-200 ease-in-out cursor-pointer hover:bg-white/20 hover:border-white/60 hover:shadow-[0_8px_24px_rgba(0,0,0,0.15)] hover:-translate-y-0.5"
                                >
                                    <div className="w-14 h-14 rounded-xl bg-white/20 border-2 border-white/40 flex items-center justify-center transition-all duration-200 ease-in-out hover:border-white hover:bg-white/30">
                                        <i className="bi bi-plus text-2xl"></i>
                                    </div>
                                    <span className="text-center">Crear nuevo workspace</span>
                                </a>
                            </div>
                        ) : (
                            <div className="text-center py-12 px-5 bg-white/10 backdrop-blur-md border-2 border-dashed border-white/30 rounded-xl mb-10">
                                <div className="mb-6 flex justify-center">
                                    <i className="bi bi-plus text-7xl text-white/50"></i>
                                </div>
                                <h2 className="text-[22px] font-bold text-white mb-3 drop-shadow-md">
                                    Crea tu primer espacio de trabajo
                                </h2>
                                <p className="text-[15px] text-white/90 leading-normal mb-6 max-w-120 mx-auto">
                                    Los espacios de trabajo son donde tu equipo se comunica. Son mejores cuando están organizados por un objetivo común, como un proyecto, tema o departamento.
                                </p>
                                <a
                                    href="/crear-workspace"
                                    className="inline-block px-6 py-3.5 bg-white text-purple-600 border-none rounded font-bold text-[15px] cursor-pointer transition-all duration-200 ease-in-out font-inherit no-underline hover:bg-white/90 hover:shadow-lg hover:scale-105"
                                >
                                    Crear un espacio de trabajo
                                </a>
                            </div>
                        )}
                    </main>
                </div>
            )}
        </section>
    );
};

export default DashboardUser;