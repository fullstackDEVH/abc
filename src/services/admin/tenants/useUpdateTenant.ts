import { Tenant, UpdateTenantRequest } from "@/models/admin/tenant";
import { useMutation } from "@tanstack/react-query";

export const useUpdateTenantMutation = () => {
  const mutation = useMutation({
    mutationFn: async (data: UpdateTenantRequest) => {
      const formData = new URLSearchParams();

      for (const key in data.body) {
        const value = data.body[key as keyof Tenant] ?? "";
        formData.append(key, `${value}`);
      }

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/tenants/${data.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: formData.toString(),
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
