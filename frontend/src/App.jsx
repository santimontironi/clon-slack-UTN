import { Routes, Route, BrowserRouter } from "react-router-dom";
import RegisterScreen from "./Screens/RegisterScreen/RegisterScreen";
import LoginScreen from "./Screens/LoginScreen/LoginScreen";
import { AuthContextProvider } from "../context/AuthContext";
import SecurityRoutes from "../components/SecurityRoutes";
import DashboardUser from "./Screens/DashboardUser/DashboardUser";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthContextProvider>
          <LoginScreen />
        </AuthContextProvider>} />

        <Route path="/register" element={<AuthContextProvider>
          <RegisterScreen />
        </AuthContextProvider>} />

        <Route path="/home" element={<AuthContextProvider>
          <SecurityRoutes>
            <DashboardUser />
          </SecurityRoutes>
        </AuthContextProvider>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App