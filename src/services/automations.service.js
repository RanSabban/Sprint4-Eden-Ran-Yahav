import { utilService } from './util.service.js'
import { socketService } from './socket.service.js'
import { boardService } from './board.service.js';

export const automationService = {
    registerAutomation,
    executeAutomation,
    runAutomation
}

async function registerAutomation(automationRule, boardId) {
    console.log('Registering automation:', automationRule);
    try {
        const board = await boardService.getById(boardId);
        if (!board.automations) {
            board.automations = [];
        }
        board.automations.push(automationRule);
        await boardService.save(board);
        return board;
    } catch (err) {
        console.error('Failed to register automation:', err);
        throw err; // Rethrow to handle higher up the call stack
    }
}


async function runAutomation(trigger,cell,taskId,groupId,boardId) {
    const boardAutomations = await boardService.getAllAutomations(boardId)
}



async function executeAutomation(automationId, boardId,) {

    try {
        console.log('executing automation', automationId);
        const automation = boardService.getAutomationById(automationId, boardId)
        if (!automation) {
            console.log('cannot find automation');
            return
        }
        const { action } = automation
        if (action === 'MOVE_TO_GROUP') {
            console.log('automation accurs - move item', automation)
            await boardService.moveTaskToTop(taskId, destinationGroupId, boardId)

        }
    } catch (err) {

    }
}

async function executeAllCellRelatedAutomations(boardId, updatedCell, taskId, groupId) {
    const boardAutomations = await boardService.getAllAutomations(boardId)
    try {
        // Assuming there's a function to get all automations for a board
        const automations = await boardService.getAllAutomations(boardId);
        for (const automation of automations) {
            if (automation.trigger === 'UPDATE_CELL' && evaluateCondition(automation.condition, updatedCell)) {
                await executeAutomation(automation.id, boardId, taskId, groupId, updatedCell);
            }
        }
    } catch (err) {
        console.error('Error executing cell-related automations:', err);
    }
}

// async function executeAllCellRelatedAutomations(boardId, updatedCell, taskId, groupId) {
//     try {
//         const automations = await boardService.getAllAutomations(boardId);
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




window.cs = automationService

// export async function 