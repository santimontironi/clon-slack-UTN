import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { WorkspaceContext } from "../../context/WorkspaceContext";
import Loader from "../../components/Loader";
import "./DashboardUser.css";

const DashboardUser = () => {
  const { user, loading: authLoading } = useContext(AuthContext);
  const { workspaces, loading: workspaceLoading } = useContext(WorkspaceContext);

  if (authLoading.session || workspaceLoading.workspaces) {
    return <Loader />;
  }

  return (
    <section className="dashboard-container">
      <div className="dashboard-content">
        <header className="dashboard-header">
          <div className="header-logo">
            <svg className="slack-logo" viewBox="0 0 124 124" fill="none">
              <path d="M26.3996 78.3999C26.3996 84.8999 21.0996 90.1999 14.5996 90.1999C8.09961 90.1999 2.79961 84.8999 2.79961 78.3999C2.79961 71.8999 8.09961 66.5999 14.5996 66.5999H26.3996V78.3999Z" fill="#E01E5A" />
              <path d="M32.2996 78.3999C32.2996 71.8999 37.5996 66.5999 44.0996 66.5999C50.5996 66.5999 55.8996 71.8999 55.8996 78.3999V109.6C55.8996 116.1 50.5996 121.4 44.0996 121.4C37.5996 121.4 32.2996 116.1 32.2996 109.6V78.3999Z" fill="#E01E5A" />
              <path d="M44.0996 26.4001C37.5996 26.4001 32.2996 21.1001 32.2996 14.6001C32.2996 8.1001 37.5996 2.8001 44.0996 2.8001C50.5996 2.8001 55.8996 8.1001 55.8996 14.6001V26.4001H44.0996Z" fill="#36C5F0" />
              <path d="M44.0996 32.2999C50.5996 32.2999 55.8996 37.5999 55.8996 44.0999C55.8996 50.5999 50.5996 55.8999 44.0996 55.8999H12.8996C6.39961 55.8999 1.09961 50.5999 1.09961 44.0999C1.09961 37.5999 6.39961 32.2999 12.8996 32.2999H44.0996Z" fill="#36C5F0" />
              <path d="M97.5996 44.0999C97.5996 37.5999 102.9 32.2999 109.4 32.2999C115.9 32.2999 121.2 37.5999 121.2 44.0999C121.2 50.5999 115.9 55.8999 109.4 55.8999H97.5996V44.0999Z" fill="#2EB67D" />
              <path d="M91.6996 44.0999C91.6996 50.5999 86.3996 55.8999 79.8996 55.8999C73.3996 55.8999 68.0996 50.5999 68.0996 44.0999V12.8999C68.0996 6.3999 73.3996 1.0999 79.8996 1.0999C86.3996 1.0999 91.6996 6.3999 91.6996 12.8999V44.0999Z" fill="#2EB67D" />
              <path d="M79.8996 97.5999C86.3996 97.5999 91.6996 102.9 91.6996 109.4C91.6996 115.9 86.3996 121.2 79.8996 121.2C73.3996 121.2 68.0996 115.9 68.0996 109.4V97.5999H79.8996Z" fill="#ECB22E" />
              <path d="M79.8996 91.7001C73.3996 91.7001 68.0996 86.4001 68.0996 79.9001C68.0996 73.4001 73.3996 68.1001 79.8996 68.1001H111.1C117.6 68.1001 122.9 73.4001 122.9 79.9001C122.9 86.4001 117.6 91.7001 111.1 91.7001H79.8996Z" fill="#ECB22E" />
            </svg>
          </div>

          <div className="user-menu">
            <button className="user-button">
              <div className="user-avatar">
                {user?.username?.charAt(0).toUpperCase()}
              </div>
              <span className="user-name">{user?.username}</span>
            </button>
          </div>
        </header>

        <main className="dashboard-main">
          <div className="welcome-section">
            <h1>Bienvenido</h1>
            <p className="welcome-subtitle">
              {workspaces?.length > 0
                ? `Tienes ${workspaces.length} ${workspaces.length === 1 ? 'espacio de trabajo' : 'espacios de trabajo'}`
                : 'Aún no tienes espacios de trabajo'
              }
            </p>
          </div>

          {workspaces?.length > 0 ? (
            <div className="workspaces-grid">
              {workspaces.map((workspace) => (
                <div key={workspace.id} className="workspace-card">
                  <div className="workspace-icon">
                    <div className="workspace-avatar">
                      {workspace.name?.charAt(0).toUpperCase()}
                    </div>
                  </div>
                  <div className="workspace-info">
                    <h3 className="workspace-name">{workspace.name}</h3>
                    <p className="workspace-members">
                      {workspace.members?.length || 0} {workspace.members?.length === 1 ? 'miembro' : 'miembros'}
                    </p>
                  </div>
                  <button className="workspace-launch">
                    Abrir
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                      <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-icon">
                <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                  <circle cx="40" cy="40" r="38" stroke="#E0E0E0" strokeWidth="4" />
                  <path d="M40 26V54M26 40H54" stroke="#CCCCCC" strokeWidth="4" strokeLinecap="round" />
                </svg>
              </div>
              <h2>Crea tu primer espacio de trabajo</h2>
              <p>Los espacios de trabajo son donde tu equipo se comunica. Son mejores cuando están organizados por un objetivo común, como un proyecto, tema o departamento.</p>
              <a href="/crear-workspace" className="create-workspace-button">
                Crear un espacio de trabajo
              </a>
            </div>
          )}
        </main>
      </div>
    </section>
  );
};

export default DashboardUser;