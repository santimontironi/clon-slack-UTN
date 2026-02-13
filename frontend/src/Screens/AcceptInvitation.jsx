import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Loader from "../components/Loader";
import { checkInvitationService } from "../services/workspaceService";

const AcceptInvitation = () => {
    const { token } = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [workspaceId, setWorkspaceId] = useState("");

    useEffect(() => {

        async function verifyInvitation() {
            try {
                setError("");
                setSuccess("");

                const res = await checkInvitationService(token);

                setSuccess(res.data.message || "Invitacion aceptada con exito");
                setWorkspaceId(res.data.workspaceId || "");
            } catch (err) {
                const message = err?.response?.data?.message || "Ocurrio un error al aceptar la invitacion";
                setError(message);
            }
        }

        if (token) {
            verifyInvitation();
        } else {
            setError("Token invalido");
            setLoading(false);
        }
        
    }, [token]);

    return (
        <section className="min-h-screen bg-[#3F0E40] flex items-center justify-center p-4">
            {loading ? (
                <Loader />
            ) : (
                <div className="w-full max-w-md">
                    <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-8 text-center">
                        {success && (
                            <>
                                <div className="w-14 h-14 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-4">
                                    <i className="bi bi-check-lg text-2xl"></i>
                                </div>
                                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                                    Invitacion aceptada
                                </h1>
                                <p className="text-gray-700 text-sm mb-6">
                                    {success}
                                </p>
                                <button
                                    onClick={() => navigate(workspaceId ? `/workspace/${workspaceId}` : "/inicio")}
                                    className="w-full px-4 py-3 cursor-pointer bg-[#4A154B] text-white font-semibold rounded-md hover:bg-[#3d1140] transition-colors shadow-sm"
                                >
                                    Ir al workspace
                                </button>
                            </>
                        )}

                        {error && !success && (
                            <>
                                <div className="w-14 h-14 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-4">
                                    <i className="bi bi-x-lg text-2xl"></i>
                                </div>
                                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                                    No se pudo aceptar
                                </h1>
                                <p className="text-gray-700 text-sm mb-6">
                                    {error}
                                </p>
                                <button
                                    onClick={() => navigate("/")}
                                    className="w-full px-4 py-3 cursor-pointer border border-gray-300 text-gray-700 font-semibold rounded-md hover:bg-gray-50 transition-colors"
                                >
                                    Ir al login
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </section>
    );
};

export default AcceptInvitation;
