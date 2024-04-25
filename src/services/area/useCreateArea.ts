import { CreataAreaRequest } from "@/models/area"
import { useMutation } from "@tanstack/react-query"

export const useCreateAreaMutation = () => {
    const mutation = useMutation({
        mutationFn: async (data: CreataAreaRequest) => {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/areas`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            if (!res.ok) {
                const errMsg = await res.json();
                if (errMsg.detail) {
                    throw new Error(errMsg.detail);
                }
                throw new Error(errMsg);
            }
            const area = await res.json();
            return area;
        }
    })
    return mutation;
}