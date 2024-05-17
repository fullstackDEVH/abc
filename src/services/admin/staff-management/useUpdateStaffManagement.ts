import { useMutation } from "@tanstack/react-query";
import { UpdateStaffManagementRequest } from "@/models/admin/staff-management";

export const useUpdateStaffManagementMutation = () => {
  const mutation = useMutation({
    mutationFn: async (data: UpdateStaffManagementRequest) => {
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
      const staff = await res.json();
      return staff;
    },
  });
  return mutation;
};
