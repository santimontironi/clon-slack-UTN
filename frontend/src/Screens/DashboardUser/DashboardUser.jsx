import { useContext } from "react"
import { AuthContext } from "../../../context/AuthContext"
import Loader from "../../../components/Loader"

const DashboardUser = () => {

  const {user,loading} = useContext(AuthContext)
  
  return (
    <section>
      {loading.dashboard ? <Loader/> : (
        <div>
          HOLA {user.username}
        </div>
      )}
    </section>
  )
}

export default DashboardUser