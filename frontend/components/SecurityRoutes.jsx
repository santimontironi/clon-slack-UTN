import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router";
import Loader from "./Loader";

const SecurityRoutes = ({children}) => {

    const { user, loading } = useContext(AuthContext)

    const navigate = useNavigate()

    if(loading.dashboard){
        return <Loader />
    }

    if(!user){
        return navigate('/')
    }

    return (
        children
    )
}

export default SecurityRoutes