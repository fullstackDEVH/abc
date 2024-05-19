import { fetchWithAuth } from "@/utils/fetchAuth";
import { useMutation } from "@tanstack/react-query";

export const useDeleteTenantMutation = () => {
  const mutation = useMutation({
    mutationFn: async (ids: string[]) => {
      let params = "";
      ids.forEach((id) => (params += `tenant_ids=${id}&`));
      params = params.slice(0, -1);
      const res = await fetchWithAuth(
        `${import.meta.env.VITE_API_URL}/api/v1/tenants?${params}`,
        {
          method: "DELETE",
        }
      );
      if (!res.ok) {
        const errMsg = await res.json();
        if (errMsg.detail) {
          throw new Error(errMsg.detail);
        }
        throw new Error(errMsg);
      }
      const tenant = await res.json();
      return tenant;
    },
  });
  return mutation;
};
