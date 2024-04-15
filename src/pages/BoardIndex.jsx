import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { loadBoards } from '../store/actions/board.actions.js'

import { Outlet, useParams } from 'react-router'
import { BoardSideBar } from '../cmps/Board/BoardSideBar.jsx'


export function BoardIndex() {

    const boards = useSelector(storeState => storeState.boardModule.boards)

    // const { boardId } = useParams()

    useEffect(() => {
        loadBoards()
    }, [])

    
    return (<section className="board-index">
        <BoardSideBar />

        <Outlet />


    </section>
    )
}