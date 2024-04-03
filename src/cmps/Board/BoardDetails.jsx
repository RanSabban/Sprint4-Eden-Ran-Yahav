import { useEffect } from "react"
import { useParams } from "react-router"
import { useSelector } from 'react-redux'

import { loadBoard } from "../../store/board.actions"

import { BoardHeader } from "./BoardHeader";

export function BoardDetails() {


    const { boardId } = useParams()
    const board = useSelector(storeState => storeState.boardModule.board)

    useEffect(() => {
        if (boardId) loadBoard(boardId)
    }, [])

    console.log(board);

    if (!board) return <div>LOADING BRO</div>
    return (
        <section className="board-details">
            <BoardHeader/>
            <h2>Hello from board details</h2>
            <p>{board.title} {board._id} {board.isStarred}</p>
        </section>
    )
}