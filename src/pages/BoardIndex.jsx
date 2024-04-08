import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { loadBoards, addBoard, updateBoard, removeBoard, addGroup } from '../store/actions/board.actions.js'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { userService } from '../services/user.service.js'
import { boardService } from '../services/board.service.local.js'
import { useParams } from 'react-router'
import { BoardHome } from '../cmps/Board/BoardHome.jsx'
import { BoardDetails } from '../cmps/Board/BoardDetails.jsx'
import { BoardSideBar } from '../cmps/Board/BoardSideBar.jsx'
import { AppHeader } from '../cmps/AppHeader.jsx'


export function BoardIndex() {

    const boards = useSelector(storeState => storeState.boardModule.boards)

    const { boardId } = useParams()

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
            loadBoards()
            showSuccessMsg(`Board updated`)
        } catch (err) {
            showErrorMsg('Cannot update board')
        }
    }

    async function onAddGroup(boardId) {
        try {
            const group = await addGroup(boardId)
            console.log(group);
            showSuccessMsg('Group added')
        } catch (err) {
            console.log('Err add group', err);
            showErrorMsg('Nono')
        }
    }

    async function onRemoveGroup(groupId) {
        try {
            await removeGroup(groupId)
            showSuccessMsg('Group removed')
        } catch (err) {
            console.log('cannot remove group', err); 
            showErrorMsg('Error remove group')
        }
    }


    if (!boards) return <div>LOADING</div>
    return (<section className="board-index">

        <div className="app-wrapper">
            <aside className="sidebar">
                <BoardSideBar
                    boards={boards}
                    onRemoveBoard={onRemoveBoard}
                    onUpdateBoard={onUpdateBoard}
                    onAddBoard={onAddBoard} />

            </aside>
 
            <main className="board-details">
                {
                    boardId ? <BoardDetails  onAddGroup={onAddGroup} onRemoveGroup={onRemoveGroup} /> : <BoardHome boards={boards} />
                }
            </main>
        </div>


    </section>
    )
}