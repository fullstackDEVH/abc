import { useMutation } from "@tanstack/react-query";
import { CreataAccountManagementRequest } from "@/models/admin/account-management";
import { fetchWithAuth } from "@/utils/fetchAuth";

export const useCreateAccountManagementMutation = () => {
  const mutation = useMutation({
    mutationFn: async (data: CreataAccountManagementRequest) => {
      const res = await fetchWithAuth(
        `${import.meta.env.VITE_API_URL}/api/v1/users`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
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
