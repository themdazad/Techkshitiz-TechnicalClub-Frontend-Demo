import { useEffect, useState } from "react"
import { toast } from 'react-toastify';
const baseUrl = process.env.REACT_APP_BACKEND_URL;
function useGetConversation() {
    const [loading, SetLoading] = useState(false);
    const [conversations, SetConversations] = useState([]);
    useEffect(() => {
        const getConversationList = async () => {
            try {
                SetLoading(true)
                let response = await fetch(baseUrl + "/api/users", {
                    method: 'GET',
                    credentials: 'include',
                });
                let data = await response.json();
                if (data.error) {
                    throw new Error(data.error);
                }
                SetConversations(data);
            } catch (error) {
                toast.error(error.message);
            } finally {
                SetLoading(false);
            }

        };

        getConversationList();
    }, [])
    return { loading, conversations };
}

export default useGetConversation
