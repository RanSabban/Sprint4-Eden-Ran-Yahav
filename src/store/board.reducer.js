import { boardService } from "../services/board.service.local"

export const SET_BOARDS = 'SET_BOARDS'
export const REMOVE_BOARD = 'REMOVE_BOARD'
export const ADD_BOARD = 'ADD_BOARD'
export const UPDATE_BOARD = 'UPDATE_BOARD'
export const ADD_TO_BOARDT = 'ADD_TO_BOARDT'
export const CLEAR_BOARDT = 'CLEAR_BOARDT'
export const UNDO_REMOVE_BOARD = 'UNDO_REMOVE_BOARD'
export const REMOVE_FROM_BOARDT = 'REMOVE_FROM_BOARDT'
export const SET_CURRENT_BOARD = 'SET_CURRENT_BOARD'
export const ADD_GROUP = 'ADD_GROUP'
export const ADD_TASK = 'ADD_TASK'

const initialState = {
    boards: null,
    board: null,
    groups: null,
    clmTypes: null,
    lastRemovedBoard: null
}

export function boardReducer(state = initialState, action) {
    var newState = state
    switch (action.type) {
        case SET_BOARDS:
            newState = { ...state, boards: action.boards }
            break
        case REMOVE_BOARD:
            return { ...state, boards: state.boards.filter(board => board._id !== action.boardId) }
            break
        case ADD_BOARD:
            return { ...state, boards: [...state.boards, action.board] }
            break
        case UPDATE_BOARD:
            return { ...state, boards: state.boards.map(board => (board._id === action.board._id) ? action.board : board) }
            break
        case UNDO_REMOVE_BOARD:
            if (state.lastRemovedBoard) {
                newState = { ...state, boards: [...state.boards, state.lastRemovedBoard], lastRemovedBoard: null }
            }
            break

        case SET_CURRENT_BOARD:
            const { groups, clmTypes } = action.board
            newState = { ...state, board: action.board, groups: groups, clmTypes: clmTypes }
            break

        case ADD_TASK:
            const { groupId, task } = action.payload;

            return {
                ...state,
                board: {
                    ...state.board,
                    groups: state.board.groups.map(group =>
                        group._id === groupId
                            ? { ...group, tasks: [...group.tasks, task] }
                            : group
                    ),
                },
            };
        case ADD_GROUP:
            return {
                ...state, 
                board: {
                    ...state.board, 
                    groups: [...state.board.groups,action.group]
                }
            }




        // case SET_CURRENT_CLMTYPES:
        default:
    }
    return newState
}
