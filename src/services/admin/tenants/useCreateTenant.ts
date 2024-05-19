import { CreateTenantRequest } from "@/models/admin/tenant";
import { fetchWithAuth } from "@/utils/fetchAuth";
import { useMutation } from "@tanstack/react-query";

export const useCreateTenantMutation = () => {
  const mutation = useMutation({
    mutationFn: async (data: CreateTenantRequest) => {
      const formData = new FormData();

      for (const key in data) {
        const value = data[key as keyof CreateTenantRequest] ?? "";
        formData.append(key, value);
      }
      
      const res = await fetchWithAuth(
        `${import.meta.env.VITE_API_URL}/api/v1/tenants`,
        {
          method: "POST",
          body: formData,
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
