import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Loader from "../../components/Loader";

const DashboardUser = () => {
  const { user, checkingSession } = useContext(AuthContext);

  if (checkingSession) {
    return <Loader />;
  }

  return (
    <section>
      <div>
        HOLA {user?.username}
      </div>
    </section>
  );
};

export default DashboardUser;