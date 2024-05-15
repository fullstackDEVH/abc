import { useMutation } from "@tanstack/react-query";
import { UpdateAccountManagementRequest } from "@/models/admin/account-management";

export const useUpdateAccountManagementMutation = () => {
  const mutation = useMutation({
    mutationFn: async (data: UpdateAccountManagementRequest) => {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/users/${data.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data.body),
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
