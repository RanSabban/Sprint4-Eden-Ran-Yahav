import { boardService } from '../../services/board.service.js'
import { userService } from '../../services/user.service.js'
import { store } from '../store.js'
import { showSuccessMsg, showErrorMsg } from '../../services/event-bus.service.js'
import { ADD_BOARD, REMOVE_BOARD, SET_BOARDS, UNDO_REMOVE_BOARD, UPDATE_BOARD, SET_CURRENT_BOARD, ADD_TASK, ADD_GROUP, REMOVE_GROUP, DROP_GROUP, DROP_TASK, REMOVE_TASK, SET_LABEL_MODAL, HIDE_LABEL_MODAL, UPDATE_CELL, UPDATE_GROUP, UPDATE_TASK_CONVERSATION, UPDATE_CLM_TITLES } from '../reducers/board.reducer.js'
import { SET_SCORE } from '../reducers/user.reducer.js'
import { setIsLoading } from './system.actions.js'
import { utilService } from '../../services/util.service.js'

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
    } finally {
        setIsLoading(false)
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

export async function addBoard() {
    try {
        const savedBoard = await boardService.addBoard()
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

export async function addGroup(boardId, isBottom) {
    try {
        // const board = await boardService.getById(boardId)
        // console.log('Boards from DB:', board)
        const group = await boardService.addGroup(boardId, isBottom)
        console.log(group)
        store.dispatch({
            type: ADD_GROUP,
            group: group,
            isBottom: isBottom
        })
        return group
    } catch (err) {

    }
}

export async function removeGroup(groupId, boardId) {
    try {
        boardService.removeGroup(groupId, boardId)
        store.dispatch({
            type: REMOVE_GROUP,
            groupId
        })

    } catch (err) {
        console.log('cannot remove group', err)
    }
}

// export async function updateGroup(groupId, updatedTitle, boardId) {
//     try {
//         const updatedBoard = await boardService.updateGroup(groupId, updatedTitle, boardId)

//         store.dispatch({
//             type: SET_CURRENT_BOARD,
//             board: updatedBoard
//         })

//     } catch (err) {
//         console.log('cannot update group', err)
//     }
// }
export async function updateGroup(groupId, updatedGroupData, boardId) {
    try {
        const updatedBoard = await boardService.updateGroup(groupId, updatedGroupData, boardId)

        store.dispatch({
            type: SET_CURRENT_BOARD,
            board: updatedBoard
        })

    } catch (err) {
        console.log('cannot update group', err)
    }
}


export async function addTask(groupId, boardId, taskTitle) {
    try {
        const task = await boardService.getEmptyTask(boardId)
        if (taskTitle) task.title = taskTitle
        const updatedBoard = await boardService.addTask(groupId, task, boardId)
        console.log('here')
        store.dispatch({
            type: SET_CURRENT_BOARD,
            board: updatedBoard
        })

    }
    catch (err) {
        console.log(err)
    }
}

export async function removeTask(taskId, groupId, boardId) {
    // console.log(taskId,groupId,boardId)
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
        console.log('Cannot remove task sorry', err)
    }
}

export async function updateCell(updatedCell, taskId, groupId, boardId) {
    try {
        console.log('updatedCell:', updatedCell, 'taskId', taskId, 'groupId', groupId, 'boardId', boardId)
        const board = await boardService.updateCell(updatedCell, taskId, groupId, boardId)
        console.log(board)

        store.dispatch({
            type: SET_CURRENT_BOARD,
            board
        })

        // store.dispatch({
        //     type: UPDATE_CELL,
        //     payload: {
        //         updatedCell,
        //         taskId,
        //         groupId,
        //         boardId
        //     }
        // })
    }
    catch (err) {
        console.log(err)
    }
}

export async function updateTask(task, groupId, boardId) {
    try {
        const board = boardService.updateTask(task, groupId, boardId)
        // store.dispatch
    } catch (err) {
        console.log('Error update task', err)
    }
}

export async function updateTaskConversation(taskToUpdate, groupId, boardId, update) {
    try {
        const board = await boardService.updateTaskConversation(taskToUpdate, groupId, boardId, update)
        store.dispatch({
            type: UPDATE_TASK_CONVERSATION,
            payload: {
                taskToUpdate, groupId, boardId, update
            }
        })


    } catch (err) {

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
        console.log(source, destination, boardId)
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

export async function onOpenModalLabel(target, clmType, cell, task, groupId, callBackFunc, specificGroup) {
    try {
        // console.log(target)
        store.dispatch({
            type: SET_LABEL_MODAL,
            payload: {
                target, clmType, cell, task, isOpen: true, groupId, callBackFunc, specificGroup
            }
        })
    } catch (err) {
        console.log('Error open moadl', err)
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
        console.log('Error open moadl', err)
    }
}

export async function updateFilterBy(filterBy, boardId) {
    try {
        console.log(filterBy, boardId)
        const board = await boardService.updateFilterBy(filterBy, boardId)
        store.dispatch({
            type: SET_CURRENT_BOARD,
            board
        })
    } catch (err) {

    }
}

export async function addColumn(type, boardId) {
    console.log(type, boardId)
    try {
        const board = await boardService.addColumn(type, boardId)
        store.dispatch({
            type: SET_CURRENT_BOARD,
            board
        })
    } catch (err) {
        console.log('cannot add column - action', err)
    }
}

export async function removeColumn(clmTypeId, boardId) {
    console.log(clmTypeId, boardId)
    try {
        const board = await boardService.removeColumn(clmTypeId, boardId)
        store.dispatch({
            type: SET_CURRENT_BOARD,
            board
        })
    } catch (err) {
        console.log('cannot remove column - action', err)
    }
}

export async function updateClmTitle(txt, clmId, boardId) {
    console.log(txt, clmId, boardId)
    try {
        const board = await boardService.updateClmTitle(txt, clmId, boardId)
        store.dispatch({
            type: SET_CURRENT_BOARD,
            board
        })

        // store.dispatch({
        //     type: UPDATE_CLM_TITLES, 
        //     boardId, 
        //     clmId, 
        //     newTitle: txt
        // })
    } catch (err) {
        console.log('cannot edit column title - action', err)
    }
}

export async function addLabel(clmId, boardId, label) {
    try {
        const board = await boardService.addLabel(clmId, boardId, label)
        store.dispatch({
            type: SET_CURRENT_BOARD,
            board
        })
        return board
    } catch (err) {
        console.log('cannot add label - action', err)
    }
}

export async function updateLabelColor(color, labelId, clmId, boardId) {
    try {
        const board = await boardService.onUpdateLabelColor(color, labelId, clmId, boardId)
        store.dispatch({
            type: SET_CURRENT_BOARD,
            board
        })
        return board

    } catch (err) {
        console.log('cannot change label color', err)
    }
}

export async function updateLabelTitle(clmId, labelId, newTitle, boardId) {
    try {
        const board = await boardService.onUpdateLabelTitle(clmId, labelId, newTitle, boardId)
        store.dispatch({
            type: SET_CURRENT_BOARD,
            board
        })
        return board

    } catch (err) {
        console.log('cannot change label title', err)
    }
}

export async function removeLabel(labelId, clmId, boardId) {
    try {
        const board = await boardService.onRemoveLabel(labelId, clmId, boardId)
        store.dispatch({
            type: SET_CURRENT_BOARD,
            board
        })
        return board

    } catch (err) {
        console.log('cannot remove label', err)
    }
}

export function handleAddToCalendar(task) {
    console.log('talk', task);

    const dateData = task.cells.find(cell => cell.type === 'date')
    console.log('dateData', dateData);

    if (!task) {
        console.error('Stay details are missing')
        return
    }

    if (!dateData) {
        console.error('Order dates are missing')
        return
    }

    const startDateFormatted = utilService.formatIsoDateToYMD(dateData.date)
    const endDateFormatted = utilService.formatIsoDateToYMD(dateData.date)
    console.log('Formatted Start Date:', startDateFormatted)
    console.log('Formatted End Date:', endDateFormatted)

    const startDate = startDateFormatted.replace(/\//g, '')
    const endDate = endDateFormatted.replace(/\//g, '')
    const startTime = 'T000000'
    const endTime = 'T235959'
    const details = encodeURIComponent(`Added from oneday.com`)
    const googleCalendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=Task: ${task.title}&dates=${startDate}${startTime}/${endDate}${endTime}&details=${details}&sf=true&output=xml`

    window.open(googleCalendarUrl, '_blank')
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
