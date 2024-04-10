import { boardService } from '../../services/board.service.local.js'
import { userService } from '../../services/user.service.js'
import { store } from '../store.js'
import { showSuccessMsg, showErrorMsg } from '../../services/event-bus.service.js'
import { ADD_BOARD, REMOVE_BOARD, SET_BOARDS, UNDO_REMOVE_BOARD, UPDATE_BOARD, SET_CURRENT_BOARD, ADD_TASK, ADD_GROUP, REMOVE_GROUP, DROP_GROUP, DROP_TASK, REMOVE_TASK, SET_LABEL_MODAL, HIDE_LABEL_MODAL, UPDATE_CELL, UPDATE_GROUP } from '../reducers/board.reducer.js'
import { SET_SCORE } from '../reducers/user.reducer.js'

// Action Creators:
export function getActionRemoveBoard(boardId) {
    return {
        type: REMOVE_BOARD,
        boardId
    }
}
export function getActionAddBoard(board) {
    return {
        type: ADD_BOARD,
        board
    }
}
export function getActionUpdateBoard(board) {
    return {
        type: UPDATE_BOARD,
        board
    }
}

export async function loadBoards() {
    try {
        const boards = await boardService.query()
        console.log('Boards from DB:', boards)
        store.dispatch({
            type: SET_BOARDS,
            boards
        })

    } catch (err) {
        console.log('Cannot load boards', err)
        throw err
    }

}

export async function removeBoard(boardId) {
    try {
        await boardService.remove(boardId)
        store.dispatch(getActionRemoveBoard(boardId))
    } catch (err) {
        console.log('Cannot remove board', err)
        throw err
    }
}

export async function addBoard(board) {
    try {
        const savedBoard = await boardService.save(board)
        console.log('Added Board', savedBoard)
        store.dispatch(getActionAddBoard(savedBoard))
        return savedBoard
    } catch (err) {
        console.log('Cannot add board', err)
        throw err
    }
}

export function updateBoard(board) {

    return boardService.save(board)
        .then(savedBoard => {
            console.log('Updated Board:', savedBoard)
            store.dispatch(
                {
                    type: UPDATE_BOARD,
                    board: savedBoard
                }
            )
            return savedBoard
        })
        .catch(err => {
            console.log('Cannot save board', err)
            throw err
        })
}

export async function loadBoard(boardId) {
    try {
        const board = await boardService.getById(boardId)
        console.log('Boards from DB:', board)
        store.dispatch({
            type: SET_CURRENT_BOARD,
            board
        })

    } catch (err) {
        console.log('Cannot load boards', err)
        throw err
    }
}

export async function addGroup(boardId) {
    try {
        // const board = await boardService.getById(boardId)
        // console.log('Boards from DB:', board)
        const group = await boardService.addGroup(boardId)
        console.log(group);
        store.dispatch({
            type: ADD_GROUP,
            group
        })
        return group
    } catch (err) {

    }
}

export async function removeGroup(groupId) {
    try {
        boardService.removeGroup(groupId)
        store.dispatch({
            type: REMOVE_GROUP,
            groupId
        })

    } catch (err) {
        console.log('cannot remove group', err);
    }
}

export async function updateGroup(groupId, updatedGroupData) {
    try {
        const updatedGroup = await boardService.updateGroup(groupId, updatedGroupData)
        store.dispatch({
            type: UPDATE_GROUP,
            payload: { groupId, updatedGroupData: updatedGroup }
        })
    } catch (err) {
        console.log('cannot update group', err);
    }
}

export async function addTask(groupId, boardId, taskTitle) {
    try {
        const task = await boardService.getEmptyTask(groupId, boardId)
        if (taskTitle) task.title = taskTitle
        await boardService.addTask(groupId, task)

        store.dispatch({
            type: ADD_TASK,
            payload: {
                groupId,
                task
            }
        })

    }
    catch (err) {
        console.log(err);
    }
}

export async function removeTask(taskId, groupId, boardId) {
    // console.log(taskId,groupId,boardId);
    try {
        await boardService.removeTask(taskId, groupId, boardId)
        store.dispatch({
            type: REMOVE_TASK,
            payload: {
                taskId,
                groupId,
                boardId
            }
        })

    } catch (err) {
        console.log('Cannot remove task sorry', err);
    }
}

export async function updateCell(cell, taskId, groupId) {
    try {
        console.log(cell, taskId, groupId);
        boardService.updateCell(cell, taskId, groupId)

        store.dispatch({
            type: UPDATE_CELL,
            cell, taskId, groupId
        })

    }
    catch (err) {
        console.log(err);
    }
}

export async function updateTask(task, groupId) {
    try {
        const board = boardService.updateTask(task, groupId)
        // store.dispatch
    } catch (err) {
        console.log('Error update task', err);
    }
}

export async function dragAndDropTask(source, destination, boardId) {
    try {

        store.dispatch({
            type: DROP_TASK,
            payload: {
                sourceGroupId: source.droppableId,
                sourceTaskIndex: source.index,
                destinationGroupId: destination.droppableId,
                destinationTaskIndex: destination.index
            }

        })
        const group = await boardService.dragAndDropTask(source, destination, boardId)
    } catch (err) {

    }
}

export async function dragAndDropGroup(source, destination, boardId) {
    try {
        console.log(source, destination, boardId);
        store.dispatch({
            type: DROP_GROUP,
            payload: {
                sourceIndex: source.index,
                destinationIndex: destination.index
            }
        })
        const board = await boardService.dragAndDropGroup(source, destination, boardId)
        //    store.dispatch({
        //     type: SET_CURRENT_BOARD,
        //         board
        //    })

    } catch (err) {

    }
}

export async function onOpenModalLabel(target, clmType, cell, task, callBackFunc) {
    try {
        console.log(target);
        store.dispatch({
            type: SET_LABEL_MODAL,
            payload: {
                target, clmType, cell, task, isOpen: true, callBackFunc
            }
        })
    } catch (err) {
        console.log('Error open moadl', err);
    }
}

export async function onHideModalLabel() {
    try {
        store.dispatch({
            type: HIDE_LABEL_MODAL,
            payload: {
                isOpen: false
            }
        })
    } catch (err) {
        console.log('Error open moadl', err);
    }
}

// Demo for Optimistic Mutation
// (IOW - Assuming the server call will work, so updating the UI first)
// export function onRemoveBoardOptimistic(boardId) {
//     store.dispatch({
//         type: REMOVE_BOARD,
//         boardId
//     })
//     showSuccessMsg('Board removed')

//     boardService.remove(boardId)
//         .then(() => {
//             console.log('Server Reported - Deleted Succesfully')
//         })
//         .catch(err => {
//             showErrorMsg('Cannot remove board')
//             console.log('Cannot load boards', err)
//             store.dispatch({
//                 type: UNDO_REMOVE_BOARD,
//             })
//         })
// }
