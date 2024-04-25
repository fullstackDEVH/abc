import { Camera } from "@/models/camera"
import { useMutation } from "@tanstack/react-query"

export const useCreateCameraMutation = () => {
    const mutation = useMutation({
        mutationFn: async (data: Camera) => {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/cameras`, {
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
            const camera = await res.json();
            return camera;
        }
    })
    return mutation;
}