import { useMutation } from "@tanstack/react-query"

export const useDeleteCameraMutation = () => {
    const mutation = useMutation({
        mutationFn: async (ids: string[]) => {
            let params = ''
            ids.forEach(id => params += `camera_ids=${id}&`)
            console.log(params)
            params = params.slice(0, -1); 
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/cameras?${params}`, {
                method: 'DELETE',
                
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