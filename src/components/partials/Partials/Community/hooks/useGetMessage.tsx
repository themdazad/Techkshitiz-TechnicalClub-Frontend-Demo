import { useEffect, useState } from "react";
import useConversation from "../Chart/Zustand/useConversation.tsx";
import { toast } from "react-toastify";
const baseUrl = process.env.REACT_APP_BACKEND_URL;
const useGetMessage = () => {
    const [loading, setLoading] = useState(false);
    const { messages, setMessages, selectedConversation } = useConversation();

    useEffect(() => {
        const GetMessage = async () => {
            setLoading(true)
            try {
                const res = await fetch(`${baseUrl}/api/messages/${selectedConversation._id}`, {
                    method: 'GET',
                    credentials: 'include',
                });
                let data = await res.json();
                if (data.error) { throw new Error(data.error) }
                setMessages(data);
            } catch (error) { toast.error(error.message) }
            finally { setLoading(false) };
        };
        if (selectedConversation?._id) GetMessage();
    }, [selectedConversation?._id, setMessages])
    return { loading, messages };
};
export default useGetMessage;
