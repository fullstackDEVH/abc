import useGetAccessToken from "@/hooks/useAuthenticate"

const useGetMeInfo = () => {
    const token = useGetAccessToken();
    return {'id': 1, 'name': 'John Doe', 'email': '', 'token': token};
}

export default useGetMeInfo