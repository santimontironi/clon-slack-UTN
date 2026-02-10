import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { WorkspaceContext } from "../context/WorkspaceContext";
import Loader from "../components/Loader";
import WorkspaceList from "../components/WorkspaceList";
import Header from "../components/Header";

const DashboardUser = () => {
  const { user, loading } = useContext(AuthContext);
  const { workspaces } = useContext(WorkspaceContext);

  return (
    <section className="min-h-screen bg-linear-to-br from-[#f8f8f8] to-white font-['Slack-Lato','Lato','Helvetica_Neue',Helvetica,Arial,sans-serif]">
      {loading.session ? <Loader /> : (
        <div className="max-w-full lg:max-w-300 xl:max-w-300 mx-auto">
          <Header />

          <main className="px-5 py-6 md:px-10 md:py-10 lg:px-15 lg:py-12 xl:px-20 xl:py-14">
            <div className="mb-8">
              <h1 className="text-[28px] md:text-4xl lg:text-[42px] xl:text-5xl font-bold text-[#1d1c1d] mb-2 tracking-tight">
                Bienvenido
              </h1>
              <p className="text-base md:text-lg text-[#616061] m-0">
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
                  className="bg-[#fafafa] border-2 border-dashed border-[#d1d1d1] rounded-xl p-6 min-h-45 flex flex-col items-center justify-center gap-3 no-underline text-[#616061] font-bold text-[15px] transition-all duration-200 ease-in-out cursor-pointer hover:bg-white hover:border-[#611f69] hover:text-[#611f69] hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] hover:-translate-y-0.5"
                >
                  <div className="w-14 h-14 rounded-xl bg-white border-2 border-[#e0e0e0] flex items-center justify-center transition-all duration-200 ease-in-out [a:hover_&]:border-[#611f69] [a:hover_&]:bg-[#f8f0fa]">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M12 5V19M5 12H19"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                  <span className="text-center">Crear nuevo workspace</span>
                </a>
              </div>
            ) : (
              <div className="text-center py-12 px-5 bg-white border-2 border-dashed border-[#e0e0e0] rounded-xl mb-10">
                <div className="mb-6 flex justify-center">
                  <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                    <circle cx="40" cy="40" r="38" stroke="#E0E0E0" strokeWidth="4" />
                    <path d="M40 26V54M26 40H54" stroke="#CCCCCC" strokeWidth="4" strokeLinecap="round" />
                  </svg>
                </div>
                <h2 className="text-[22px] font-bold text-[#1d1c1d] mb-3">
                  Crea tu primer espacio de trabajo
                </h2>
                <p className="text-[15px] text-[#616061] leading-normal mb-6 max-w-120 mx-auto">
                  Los espacios de trabajo son donde tu equipo se comunica. Son mejores cuando están organizados por un objetivo común, como un proyecto, tema o departamento.
                </p>
                <a
                  href="/crear-workspace"
                  className="inline-block px-6 py-3.5 bg-[#611f69] text-white border-none rounded font-bold text-[15px] cursor-pointer transition-all duration-200 ease-in-out font-inherit no-underline hover:bg-[#4a154b]"
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
