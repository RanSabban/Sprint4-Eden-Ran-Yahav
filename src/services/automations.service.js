import { utilService } from './util.service.js'
import { socketService } from './socket.service.js'
import { boardService } from './board.service.js'
import { store } from '../store/store.js'
import { SET_CURRENT_BOARD } from '../store/reducers/board.reducer.js'
export const automationService = {
    registerAutomation,
    runAutomation,
    removeAutomation,
    toggleAutomationActive
}

async function registerAutomation(automationRule, boardId) {
    console.log('Registering automation:', automationRule)
    try {
        const board = await boardService.getById(boardId)
        if (!board.automations) {
            board.automations = []
        }
        board.automations.push(automationRule)
        await boardService.save(board)
        store.dispatch({
            type: SET_CURRENT_BOARD,
            board
        })
        return board
    } catch (err) {
        console.error('Failed to register automation:', err)
        throw err
    }
}

async function runAutomation(trigger, data) {
    console.log(trigger, data);
    try {
        const { boardId } = data
        const boardAutomations = await boardService.getAllAutomations(boardId)
        console.log(boardAutomations);
        const relatedAutomations = boardAutomations.filter(automation => automation.trigger === trigger)
        console.log(relatedAutomations)
        if (!relatedAutomations.length) return
        const validatedAutomations = validateAutomation(trigger, relatedAutomations, data)
        console.log(validatedAutomations)
        if (!validatedAutomations.length) return
        for (const automation of validatedAutomations) {
            if (automation.action === 'MOVE_TO_GROUP') {
                const { taskId, boardId } = data
                const board = await boardService.moveTaskToTop(taskId, automation.target, boardId)
                console.log('activating automation', automation);
                store.dispatch({
                    type: SET_CURRENT_BOARD,
                    board
                })
            }
        }
    } catch (err) {
        console.log('cannot run automations', err)
    }
}

function validateAutomation(trigger, relatedAutomations, data) {
    const validatedAutomations = relatedAutomations.filter(automation => {
        if (trigger === 'STATUS_CHANGE' || 'PRIORITY_CHANGE') {
            const { condition } = automation
            const { cell } = data
            const { _id, dataId } = cell
            if (condition[_id] === dataId && automation.active) {
                return automation
            }
        }
    })
    console.log(validatedAutomations);
    return validatedAutomations
}

async function removeAutomation(automationId, boardId) {
    console.log('automation Id', automationId);
    try {
        const board = await boardService.getById(boardId)
        if (!board) {
            throw new Error('Board not found')
        }
        const filteredAutomations = board.automations.filter(automation => automation.id !== automationId)
        board.automations = filteredAutomations

        await boardService.save(board)
        store.dispatch({
            type: SET_CURRENT_BOARD,
            board
        })
        socketService.emit('board-updated', board)


    } catch (err) {
        console.error('Error removing automation:', err)
        throw err
    }
}

async function toggleAutomationActive(automationId, boardId) {
    console.log('automation ID', automationId);
    try {
        const board = await boardService.getById(boardId)
        if (!board) {
            throw new Error('Board not found')
        }
        const automationsToReturn = board.automations.map(automation =>
            automation.id === automationId
                ? { ...automation, active: !automation.active }
                : automation
        )
        board.automations = automationsToReturn
        await boardService.save(board)
        store.dispatch({
            type: SET_CURRENT_BOARD,
            board
        })
        socketService.emit('board-updated', board)
    } catch (err) {

    }
}

// async function executeAutomation(automationId, boardId,) {
//     try {
//         console.log('executing automation', automationId)
//         const automation = boardService.getAutomationById(automationId, boardId)
//         if (!automation) {
//             console.log('cannot find automation')
//             return
//         }
//         const { action } = automation
//         if (action === 'MOVE_TO_GROUP') {
//             console.log('automation accurs - move item', automation)
//             await boardService.moveTaskToTop(taskId, destinationGroupId, boardId)
//         }
//     } catch (err) {
//     }
// }
// async function executeAllCellRelatedAutomations(boardId, updatedCell, taskId, groupId) {
//     const boardAutomations = await boardService.getAllAutomations(boardId)
//     try {
//         // Assuming there's a function to get all automations for a board
//         const automations = await boardService.getAllAutomations(boardId)
//         for (const automation of automations) {
//             if (automation.trigger === 'UPDATE_CELL' && evaluateCondition(automation.condition, updatedCell)) {
//                 await executeAutomation(automation.id, boardId, taskId, groupId, updatedCell)
//             }
//         }
//     } catch (err) {
//         console.error('Error executing cell-related automations:', err)
//     }
// }
// async function executeAllCellRelatedAutomations(boardId, updatedCell, taskId, groupId) {
//     try {
//         const automations = await boardService.getAllAutomations(boardId)
//         const relevantAutomations = automations.filter(automation =>
//             automation.trigger === 'UPDATE_CELL' && evaluateCondition(automation.condition, updatedCell)
//         )
//         for (const automation of relevantAutomations) {
//             await executeAutomation(automation.id, boardId, taskId, groupId, updatedCell)
//         }
//     } catch (err) {
//         console.error('Error executing cell-related automations:', err)
//     }
// }
window.as = automationService
// export async function