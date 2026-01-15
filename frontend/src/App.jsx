import { Routes, Route, BrowserRouter } from "react-router-dom";
import RegisterScreen from "./Screens/RegisterScreen/RegisterScreen";
import LoginScreen from "./Screens/LoginScreen/LoginScreen";
import { AuthContextProvider } from "./context/AuthContext";
import SecurityRoutes from "./components/SecurityRoutes";
import DashboardUser from "./Screens/DashboardUser/DashboardUser";

const App = () => {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterScreen />} />

          <Route path="/home" element={
              <SecurityRoutes>
                <DashboardUser />
              </SecurityRoutes>
            }
          />
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  );
};

export default App;