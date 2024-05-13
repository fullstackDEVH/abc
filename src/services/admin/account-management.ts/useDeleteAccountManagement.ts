import { useMutation } from "@tanstack/react-query";

export const useDeleteAccountManagementMutation = () => {
  const mutation = useMutation({
    mutationFn: async (ids: string[]) => {
      let params = "";
      ids.forEach((id) => (params += `account_ids=${id}&`));
      params = params.slice(0, -1);
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/accounts?${params}`,
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
      const account = await res.json();
      return account;
    },
  });
  return mutation;
};
