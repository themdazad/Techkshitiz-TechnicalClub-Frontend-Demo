import { useEffect } from "react";
import { useSocketContext } from "../../../../contexts/Socket.tsx"
import useConversation from "../Chart/Zustand/useConversation.tsx";

function UseListenMessages() {
    const { socket } = useSocketContext();
    const { messages, setMessages } = useConversation();
    useEffect(() => {
        socket?.on("newMessage", (newMessage) => {
            setMessages([...messages, newMessage]);
        })
        return () => socket.off("newMessage")
    }, [socket, setMessages, messages])
}

export default UseListenMessages
