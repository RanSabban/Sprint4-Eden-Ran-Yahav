// export const SEND_SLACK_MESSAGE_REQUEST = 'SEND_SLACK_MESSAGE_REQUEST'
export const SEND_SLACK_MESSAGE_SUCCESS = 'SEND_SLACK_MESSAGE_SUCCESS'
export const SEND_SLACK_MESSAGE_FAILURE = 'SEND_SLACK_MESSAGE_FAILURE'

// const slackInitialState = {
//     loading: false,
//     data: null,
//     error: null
// }

// export function slackReducer(state = slackInitialState, action) {
//     switch (action.type) {
//         case SEND_SLACK_MESSAGE_REQUEST:
//             return { ...state, loading: true, error: null }
//         case SEND_SLACK_MESSAGE_SUCCESS:
//             return { ...state, loading: false, data: action.payload }
//         case SEND_SLACK_MESSAGE_FAILURE:
//             return { ...state, loading: false, error: action.error }
//         default:
//             return state
//     }
// }


const initialState = {
    data: null,
    error: null,
    loading: false
};

export function slackReducer(state = initialState, action) {
    switch (action.type) {
        case 'SEND_SLACK_MESSAGE_SUCCESS':
            return { ...state, data: action.payload, loading: false, error: null };
        case 'SEND_SLACK_MESSAGE_FAILURE':
            return { ...state, error: action.error, loading: false };
        default:
            return state;
    }
}
