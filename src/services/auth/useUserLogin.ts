import { UserLoginRequest } from "@/models/user";
import { useMutation } from "@tanstack/react-query";

export const useUserLoginMutation = () => {
  const mutation = useMutation({
    mutationFn: async (data: UserLoginRequest) => {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/auth/login`,
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
      const user = await res.json();
      return user;
    },
  });
  
  return mutation;
};
