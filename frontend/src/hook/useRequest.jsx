import { useState } from "react";

function useRequest() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [response, setResponse] = useState(null);

    async function sendRequest(requestCallback) {
        try {
            setLoading(true);
            setError(null);
            const res = await requestCallback();
            setResponse(res.data.message);
            return res.data
        } catch (err) {
            const message = err?.response?.data?.message || "Error";
            setError(message);
            throw err;
        } finally {
            setLoading(false);
        }
    }

    return { loading, error, sendRequest, response };
}

export default useRequest;