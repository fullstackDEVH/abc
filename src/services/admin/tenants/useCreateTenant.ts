import { CreataTenantRequest } from "@/models/admin/tenant"
import { useMutation } from "@tanstack/react-query"

export const useCreateTenantMutation = () => {
    const mutation = useMutation({
        mutationFn: async (data: CreataTenantRequest) => {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/tenants`, {
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
            const tenant = await res.json();
            return tenant;
        }
    })
    return mutation;
}