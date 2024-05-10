import { UpdateTenantRequest } from "@/models/admin/tenant"
import { useMutation } from "@tanstack/react-query"

export const useUpdateTenantMutation = () => {
    const mutation = useMutation({
        mutationFn: async (data: UpdateTenantRequest) => {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/tenants/${data.id}`, {
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
            const tenant = await res.json();
            return tenant;
        }
    })
    return mutation;
}