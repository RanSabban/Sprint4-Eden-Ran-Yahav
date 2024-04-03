import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { loadBoards, addBoard, updateBoard, removeBoard } from '../store/board.actions.js'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { userService } from '../services/user.service.js'
import { boardService } from '../services/board.service.local.js'
import { BoardSideBar } from '../cmps/BoardSideBar.jsx'
import { BoardHome } from '../cmps/BoardHome.jsx'
import { BoardList } from '../cmps/BoardList.jsx'
import { BoardDetails } from '../cmps/BoardDetails.jsx'
import { useParams } from 'react-router'

export function BoardIndex() {

    const boards = useSelector(storeState => storeState.boardModule.boards)

    const {boardId} = useParams()

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
    console.log(boardId);
    return (<section className="board-index">
        <main>
        <BoardSideBar
                boards={boards}
                onRemoveBoard={onRemoveBoard}
                onUpdateBoard={onUpdateBoard}
                onAddBoard={onAddBoard} />
            {/* 
            // ADD: 
            If there's not a selected board return board home */} 
            {
                boardId ? <BoardDetails /> : <BoardHome boards={boards}/>
            }
        </main>
    </section>
    )
}