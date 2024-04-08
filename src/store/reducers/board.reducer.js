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
export const REMOVE_GROUP = 'REMOVE_GROUP'
export const SET_IS_LOADING = 'SET_IS_LOADING'
export const DROP_TASK = 'DROP_TASK'
export const DROP_GROUP = 'DROP_GROUP'
export const REMOVE_TASK = 'REMOVE_TASK'
export const SET_LABEL_MODAL = 'SET_LABEL_MODAL'

const initialState = {
    boards: null,
    board: null,
    groups: null,
    clmTypes: null,
    lastRemovedBoard: null,
    isLoading: false,
    modalProps: { isModalLabelOpen: false }
}

export function boardReducer(state = initialState, action) {
    var newState = state
    switch (action.type) {
        case SET_BOARDS:
            return { ...state, boards: action.boards }

        case REMOVE_BOARD:
            return { ...state, boards: state.boards.filter(board => board._id !== action.boardId) }

        case ADD_BOARD:
            return { ...state, boards: [...state.boards, action.board] }

        case UPDATE_BOARD:
            return { ...state, boards: state.boards.map(board => (board._id === action.board._id) ? action.board : board) }

        case UNDO_REMOVE_BOARD:
            if (state.lastRemovedBoard) {
                newState = { ...state, boards: [...state.boards, state.lastRemovedBoard], lastRemovedBoard: null }
            }
            break

        case SET_CURRENT_BOARD:
            const { groups, clmTypes } = action.board
            newState = { ...state, board: action.board, groups: groups, clmTypes: clmTypes }
            break


        case SET_LABEL_MODAL: {
            const { ev, clmType, cell, task, isOpen } = action.payload
            newState = {
                ...state,
                modalProps: {ev,clmType,cell,task, isModalLabelOpen: isOpen}
            }
            break
        }
        case ADD_TASK:
            const { groupId, task } = action.payload;
            console.log(groupId);

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
            }
        case REMOVE_TASK: {
            const { taskId, groupId } = action.payload;

            return {
                ...state,
                board: {
                    ...state.board,
                    groups: state.board.groups.map(group =>
                        group._id === groupId
                            ? { ...group, tasks: group.tasks.filter(task => task._id !== taskId) }
                            : group
                    ),
                },
            };
        }


        case ADD_GROUP:
            return {
                ...state,
                board: {
                    ...state.board,
                    groups: [...state.board.groups, action.group]
                }
            }
        case REMOVE_GROUP:
            return {
                ...state,
                board: {
                    ...state.board,
                    groups: state.board.groups.filter(group => group._id !== action.groupId)
                }
            }

        case SET_IS_LOADING:
            return { ...state, isLoading: action.isLoading }

        case DROP_TASK: {
            const { sourceGroupId, sourceTaskIndex, destinationGroupId, destinationTaskIndex } = action.payload;
            const boardCopy = JSON.parse(JSON.stringify(state.board)); // Deep copy to avoid direct state mutation

            // Find source and destination groups
            const sourceGroup = boardCopy.groups.find(group => group._id === sourceGroupId);
            const destinationGroup = boardCopy.groups.find(group => group._id === destinationGroupId);

            if (!sourceGroup || !destinationGroup) {
                console.error('Source or destination group not found');
                return state; // Return current state if groups are not found
            }

            // Remove the task from the source group
            const [movedTask] = sourceGroup.tasks.splice(sourceTaskIndex, 1);

            // Insert the task into the destination group
            destinationGroup.tasks.splice(destinationTaskIndex, 0, movedTask);

            return {
                ...state,
                board: boardCopy
            };
        }

        case DROP_GROUP:
            const { sourceIndex, destinationIndex } = action.payload
            const newGroups = Array.from(state.board.groups)
            const [removedGroup] = newGroups.splice(sourceIndex, 1)
            newGroups.splice(destinationIndex, 0, removedGroup)

            return {
                ...state,
                board: {
                    ...state.board,
                    groups: newGroups
                }
            }
        default:
    }
    return newState
}
