import { useMutation } from "@tanstack/react-query";
import { CreateStaffManagementRequest } from "@/models/admin/staff-management";
import { fetchWithAuth } from "@/utils/fetchAuth";

export const useCreateStaffManagementMutation = () => {
  const mutation = useMutation({
    mutationFn: async (data: CreateStaffManagementRequest) => {
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
      const staff = await res.json();
      return staff;
    },
  });
  return mutation;
};
