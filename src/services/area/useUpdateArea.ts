import { UpdateAreaRequest } from "@/models/area"
import { fetchWithAuth } from "@/utils/fetchAuth"
import { useMutation } from "@tanstack/react-query"

export const useUpdateAreaMutation = () => {
    const mutation = useMutation({
        mutationFn: async (data: UpdateAreaRequest) => {
            const res = await fetchWithAuth(`${import.meta.env.VITE_API_URL}/api/v1/areas/${data.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data.body)
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
