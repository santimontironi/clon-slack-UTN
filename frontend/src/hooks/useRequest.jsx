import { useState } from "react"

/* 
Este hook tiene la responsabilidad de manejar las consultas
Particularmente maneja el estado de consulta que siempre suele ser el mismo (error, response, loading)
*/
function useRequest() {
    const [loading, setLoading] = useState(false)
    const [response, setResponse] = useState(null)
    const [error, setError] = useState(null)
    async function sendRequest(requestCallback) {
        try {
            setLoading(true)
            setResponse(null)
            setError(null)
            const response = await requestCallback()
            setResponse(response.data.message)
            return response.data
        }
        catch (error) {
            if (error?.response?.data?.message) {
                setError(error.response.data.message)
            }
            else {
                setError(
                    {
                        message: 'Ha ocurrido una excepcion'
                    }
                )
            }
        }
        finally {
            setLoading(false)
        }
    }

    return {
        loading,
        response,
        error,
        sendRequest
    }
}

export default useRequest