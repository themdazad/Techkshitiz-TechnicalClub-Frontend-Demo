import { useState } from "react"
import useConversation from "../Chart/Zustand/useConversation.tsx";
import { toast } from "react-toastify";
const baseUrl = process.env.REACT_APP_BACKEND_URL;
function useSendMessage() {
    const [loading, setLoading] = useState(false);
    const { messages, setMessages, selectedConversation } = useConversation();
    const sendMessage = async (message) => {
        try {
            const res = await fetch(`${baseUrl}/api/messages/send/${selectedConversation._id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message }),
                credentials: 'include',

            })
            const data = await res.json();
            if (data.error) {
                throw new Error(data.error);
            }
            setMessages([...messages, data]);

        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }
    return { sendMessage, loading };
}

export default useSendMessage
