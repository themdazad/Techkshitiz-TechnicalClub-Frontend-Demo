import { createContext, useContext, useEffect, useState } from "react"
import io from 'socket.io-client';
import { useAuthChartContext } from "./ChartAuthContext.tsx";
const SocketContext = createContext();
export const useSocketContext = () => {
    return useContext(SocketContext);
}
export const SocketContextProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const { ChartAuthUser } = useAuthChartContext();
    useEffect(() => {
        if (ChartAuthUser) {
            const socket = io({
                query: {
                    userId: Object(ChartAuthUser)._id
                }
            });
            setSocket(socket);


            socket.on('getOnlineUsers', (users) => {
                console.log(users);

                setOnlineUsers(users);
            })

            return () => socket.close();
        }
        else {
            if (socket) {
                socket.close();
                setSocket(null);
            }
        }
    }, [ChartAuthUser])
    return (
        <SocketContext.Provider value={{ socket, onlineUsers }}>
            {children}
        </SocketContext.Provider>
    )
}