import { CreataAreaRequest } from "@/models/area"
import { useMutation } from "@tanstack/react-query"

export const useCreateAreaMutation = () => {
    const mutation = useMutation({
        mutationFn: async (data: CreataAreaRequest) => {
            console.log("data", data)
        }
    })
    return mutation;
}