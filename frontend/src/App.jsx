import { Routes, Route, BrowserRouter } from "react-router-dom";
import RegisterScreen from "./Screens/RegisterScreen";
import LoginScreen from "./Screens/LoginScreen";
import { AuthContextProvider } from "./context/AuthContext";
import SecurityRoutes from "./components/SecurityRoutes";
import DashboardUser from "./Screens/DashboardUser";
import { WorkspaceContextProvider } from "./context/WorkspaceContext";
import CreateWorkspace from "./Screens/CreateWorkspace";
import Workspace from "./Screens/Workspace";
import NewChannel from "./Screens/NewChannel";
import SendInvitation from "./Screens/SendInvitation";
import AcceptInvitation from "./Screens/AcceptInvitation";
import VerifyEmail from "./Screens/VerifyEmail";
import WorkspaceMembers from "./Screens/WorkspaceMembers";

const App = () => {
  return (
    <BrowserRouter>
        <AuthContextProvider>
          <Routes>

            <Route path="/" element={<LoginScreen />} />
            <Route path="/registro" element={<RegisterScreen />} />
            <Route path="/verificar-email/:token" element={<VerifyEmail />} />
            <Route path="/aceptar-invitacion/:token" element={<AcceptInvitation />} />

            <Route path="/inicio" element={
              <SecurityRoutes>
                <WorkspaceContextProvider>
                  <DashboardUser />
                </WorkspaceContextProvider>
              </SecurityRoutes>
            } />

            <Route path="/crear-workspace" element={
              <SecurityRoutes>
                <WorkspaceContextProvider>
                  <CreateWorkspace />
                </WorkspaceContextProvider>
              </SecurityRoutes>
            } />

            <Route path="/workspace/:id" element={
              <SecurityRoutes>
                <WorkspaceContextProvider>
                  <Workspace />
                </WorkspaceContextProvider>
              </SecurityRoutes>
            } />

            <Route path="/workspace/:id/nuevo-canal" element={
              <SecurityRoutes>
                <WorkspaceContextProvider>
                  <NewChannel />
                </WorkspaceContextProvider>
              </SecurityRoutes>
            } />

            <Route path="/workspace/:id/invitar" element={
              <SecurityRoutes>
                <WorkspaceContextProvider>
                  <SendInvitation />
                </WorkspaceContextProvider>
              </SecurityRoutes>
            } />

            <Route path="/workspace/:id/miembros" element={
              <SecurityRoutes>
                <WorkspaceContextProvider>
                  <WorkspaceMembers />
                </WorkspaceContextProvider>
              </SecurityRoutes>
            } />

          </Routes>
        </AuthContextProvider>
    </BrowserRouter >
  );
};

export default App;