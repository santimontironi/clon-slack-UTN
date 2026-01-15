import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import Loader from "./Loader";

const SecurityRoutes = ({ children }) => {
    const { user, checkingSession } = useContext(AuthContext);

    if (checkingSession) {
        return <Loader />;
    }
   
    if (!user) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default SecurityRoutes;