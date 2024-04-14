import { StorageKey } from "@/constants";

const useGetAccessToken = () => {
    const token = localStorage.getItem(StorageKey.accessToken);
    return token;
}

export default useGetAccessToken;