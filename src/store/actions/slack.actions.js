import { httpService } from '../../services/http.service'
import { SEND_SLACK_MESSAGE_FAILURE, SEND_SLACK_MESSAGE_SUCCESS } from '../reducers/slack.reducer'

// export const sendSlackMessage = (message, channel) => async (dispatch) => {
//     dispatch({ type: SEND_SLACK_MESSAGE_REQUEST })
//     try {
//         const data = await httpService.post('slack', { message, channel })
//         dispatch({ type: SEND_SLACK_MESSAGE_SUCCESS, payload: data })
//     } catch (error) {
//         dispatch({ type: SEND_SLACK_MESSAGE_FAILURE, error: error.message })
//     }
// }

// Action types
export const sendSlackMessageSuccess = payload => ({
    type: SEND_SLACK_MESSAGE_SUCCESS,
    payload
});

export const sendSlackMessageFailure = error => ({
    type: SEND_SLACK_MESSAGE_FAILURE,
    error
});
