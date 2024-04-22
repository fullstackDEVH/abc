import { UpdateCameraRequest } from "@/models/camera"
import { useMutation } from "@tanstack/react-query"

export const useUpdateCameraMutation = () => {
    const mutation = useMutation({
        mutationFn: async (data: UpdateCameraRequest) => {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/cameras/${data.id}`, {
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
            const camera = await res.json();
            return camera;
        }
    })
    return mutation;
}