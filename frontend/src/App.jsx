import { Routes, Route, BrowserRouter } from "react-router-dom";
import RegisterScreen from "./Screens/RegisterScreen/RegisterScreen";
import LoginScreen from "./Screens/LoginScreen/LoginScreen";
import { AuthContextProvider } from "./context/AuthContext";
import SecurityRoutes from "./components/SecurityRoutes";
import DashboardUser from "./Screens/DashboardUser/DashboardUser";
import { WorkspaceContextProvider } from "./context/WorkspaceContext";

const App = () => {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<LoginScreen />} />
          <Route path="/registro" element={<RegisterScreen />} />

          <Route path="/inicio" element={
              <SecurityRoutes>
                <WorkspaceContextProvider>
                  <DashboardUser />
                </WorkspaceContextProvider>
              </SecurityRoutes>
            }
          />
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  );
};

export default App;