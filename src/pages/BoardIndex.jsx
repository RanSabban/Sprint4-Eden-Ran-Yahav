import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { loadBoards, addBoard, updateBoard, removeBoard, addToBoard } from '../store/board.actions.js'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { userService } from '../services/user.service.js'
import { boardService } from '../services/board.service.local.js'
import { BoardSideBar } from '../cmps/BoardSideBar.jsx'
import { BoardHome } from '../cmps/BoardHome.jsx'
import { BoardList } from '../cmps/BoardList.jsx'
import { BoardPreview } from '../cmps/BoardPreview.jsx'

export function BoardIndex() {

    const boards = useSelector(storeState => storeState.boardModule.boards)

    useEffect(() => {
        loadBoards()
    }, [])

    async function onRemoveBoard(boardId) {
        try {
            await removeBoard(boardId)
            showSuccessMsg('Board removed')
        } catch (err) {
            showErrorMsg('Cannot remove board')
        }
    }

    async function onAddBoard() {
        const board = boardService.getEmptyBoard()
        try {
            const savedBoard = await addBoard(board)
            showSuccessMsg(`Board added (id: ${savedBoard._id})`)
        } catch (err) {
            showErrorMsg('Cannot add board')
        }
    }

    async function onUpdateBoard(board) {
        try {
            const savedBoard = await updateBoard(board)
            showSuccessMsg(`Board updated`)
        } catch (err) {
            showErrorMsg('Cannot update board')
        }
    }

    return (<section className="board-index">
        <main>
            {/* 
            // ADD: 
            If there's not a selected board return board home */} 
            <BoardHome boards={boards}/>

            {/* OR  */}
            <BoardPreview />
            
            <BoardSideBar
                boards={boards}
                onRemoveBoard={onRemoveBoard}
                onUpdateBoard={onUpdateBoard}
                onAddBoard={onAddBoard} />

        </main>
    </section>
    )
}