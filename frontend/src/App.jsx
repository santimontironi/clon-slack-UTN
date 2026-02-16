import { Routes, Route, BrowserRouter } from "react-router-dom";
import RegisterScreen from "./Screens/authScreens/RegisterScreen";
import LoginScreen from "./Screens/authScreens/LoginScreen";
import { AuthContextProvider } from "./context/AuthContext";
import SecurityRoutes from "./components/authComponents/SecurityRoutes";
import DashboardUser from "./Screens/DashboardUser";
import { WorkspaceContextProvider } from "./context/WorkspaceContext";
import CreateWorkspace from "./Screens/workspaceScreens/CreateWorkspace";
import Workspace from "./Screens/workspaceScreens/Workspace";
import NewChannel from "./Screens/channelScreens/NewChannel";
import SendInvitation from "./Screens/workspaceScreens/SendInvitation";
import AcceptInvitation from "./Screens/workspaceScreens/AcceptInvitation";
import VerifyEmail from "./Screens/authScreens/VerifyEmail";
import WorkspaceMembers from "./Screens/workspaceScreens/WorkspaceMembers";
import ChangePassword from "./Screens/authScreens/ChangePassword";

const App = () => {
  return (
    <BrowserRouter>
        <AuthContextProvider>
          <Routes>

            <Route path="/" element={<LoginScreen />} />
            <Route path="/registro" element={<RegisterScreen />} />
            <Route path="/verificar-email/:token" element={<VerifyEmail />} />
            <Route path="/aceptar-invitacion/:token" element={<AcceptInvitation />} />
            <Route path="/cambiar-clave/:token" element={<ChangePassword />} />

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