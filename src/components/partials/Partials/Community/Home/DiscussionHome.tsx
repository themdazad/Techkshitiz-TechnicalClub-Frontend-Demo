import React from 'react'
import { useLocation } from 'react-router-dom'
import PopularDiscussion from './PopularDiscussion.tsx';
function DiscussionHome() {
    const location = useLocation().search;
    const search = new URLSearchParams(location);
    if (search.get('discussions_type') === null) {
        return (
            <>
                <h1>Discussion</h1>
            </>
        )
    } else {
        if (search.get('discussions_type') === "popular") {

            return <PopularDiscussion />
        }
        else if (search.get('discussions_type') === "new") {

            return <h1>New</h1>
        } else {
            return (
                <>
                    <h1>Discussion</h1>
                </>
            )
        }
    }
}

export default DiscussionHome
