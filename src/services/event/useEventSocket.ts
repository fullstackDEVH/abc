import io from "socket.io-client";

const useEventSocket = () => {
    // const socket = io(window.VMS_XMAS_API_BASE_URL, { path: '/ws/socket.io', transports: ["websocket", "polling"], query: {token: access_token} });
    const socket = io(import.meta.env.VITE_API_URL, { path: '/ws/socket.io', transports: ["websocket", "polling"], autoConnect: false})
    socket.on("emagic-event", () => {
        console.log('Connected to server');
    });
    
    return socket;
}

export default useEventSocket;