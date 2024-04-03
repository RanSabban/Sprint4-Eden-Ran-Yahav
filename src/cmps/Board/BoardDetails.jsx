import { useEffect } from "react"
import { useParams } from "react-router"
import { useSelector } from 'react-redux'

import { loadBoard } from "../../store/board.actions"
import { BoardFilter } from "./BoardFilter"
import { BoardPreview } from "./BoardPreview"

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
<<<<<<< HEAD
            {/* <h2>Hello from board details</h2> */}
            <BoardFilter/>
            <BoardPreview />
=======
            <BoardHeader/>
            <h2>Hello from board details</h2>
            <p>{board.title} {board._id} {board.isStarred}</p>
>>>>>>> ed45636b9cd664d3d09db7ea93a42a2b0b735442
        </section>
    )
}