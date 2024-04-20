// import { useSelector } from "react-redux"
// import { useDispatch } from "react-redux"
// import { sendSlackMessage } from "../store/actions/slack.actions"
// import { Button } from "monday-ui-react-core"

// export function SlackMessageComponent() {
//     const dispatch = useDispatch()
//     const slackState = useSelector(state => state.slackModule)

//     const handleSendMessage = () => {
//         dispatch(sendSlackMessage("Hello from Redux to Slack!", "test"))
//     }

//     return (
//         <div>
//             <Button onClick={handleSendMessage}>Send Message to Slack</Button>
//             {slackState.loading && <p>Sending message...</p>}
//             {slackState.error && <p>Error: {slackState.error}</p>}
//             {slackState.data && <p>Message Sent Successfully</p>}
//         </div>
//     )
// }

import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { httpService } from '../services/http.service';  // Assuming httpService is correctly set up to make HTTP requests

export function SlackMessageCmp({ message }) {
    const dispatch = useDispatch();

    const sendMessageToSlack = async () => {
        try {
            const result = await httpService.post('slack/message', { message });
            dispatch({
                type: 'SEND_SLACK_MESSAGE_SUCCESS',
                payload: result
            });
        } catch (error) {
            dispatch({
                type: 'SEND_SLACK_MESSAGE_FAILURE',
                error: error.message
            });
        }
    };

    return (
        <button style={{background: 'black'}} onClick={sendMessageToSlack}>
            Send Message to Slack
        </button>
    );
}