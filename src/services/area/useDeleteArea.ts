import { useMutation } from "@tanstack/react-query"

export const useDeleteAreaMutation = () => {
    const mutation = useMutation({
        mutationFn: async (ids: string[]) => {
            let params = ''
            ids.forEach(id => params += `area_ids=${id}&`)
            console.log(params)
            params = params.slice(0, -1); 
            const res = await fetch(`${import.meta.env.VITE_API_URL}/areas?${params}`, {
                method: 'DELETE',
                
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