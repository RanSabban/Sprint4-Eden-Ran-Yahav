import { boardService } from '../services/board.service.local.js'
import { userService } from '../services/user.service.js'
import { store } from '../store/store.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { ADD_BOARD, REMOVE_BOARD, SET_BOARDS, UNDO_REMOVE_BOARD, UPDATE_BOARD, SET_CURRENT_BOARD, ADD_TASK, ADD_GROUP,REMOVE_GROUP } from './board.reducer.js'
import { SET_SCORE } from './user.reducer.js'

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
        const group = boardService.addGroup(boardId)
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

export async function addTask(groupId,boardId,taskTitle) {
    try {
        const task = await boardService.getEmptyTask(groupId,boardId)
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

export async function updateCell(cell,taskId,groupId) {
    try {
        console.log(cell,taskId,groupId);
        boardService.updateCell(cell,taskId,groupId)

        // store.dispatch({
        //     type: ADD_TASK,
        //     groupId,
        //     task
        // })

    }
    catch (err) {
        console.log(err);
    }
}

export async function updateTask(task,groupId) {
    try {
        boardService.updateTask(task,groupId)
    } catch (err) {
        console.log('Error update task', err);
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
