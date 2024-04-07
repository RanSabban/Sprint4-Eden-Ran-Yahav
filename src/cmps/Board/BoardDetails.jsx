import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { useSelector } from 'react-redux'

import { loadBoard } from "../../store/board.actions"
import { BoardPreview } from "./BoardPreview"
import { BoardHeader } from "./BoardHeader"


export function BoardDetails({ onAddGroup,onRemoveGroup }) {


    const { boardId } = useParams()
    const board = useSelector(storeState => storeState.boardModule.board)
    const [isCollapsed, setIsCollapsed] = useState(false)

    useEffect(() => {
        if (boardId) loadBoard(boardId)
    }, [])

    if (!board) return <div>LOADING BRO</div>
    return (
        <>
        <div className="main-wrapper">
            <BoardHeader isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} onAddGroup={onAddGroup} boardId={boardId}/>

        <section className="board-details">
            <BoardPreview  onAddGroup={onAddGroup} onRemoveGroup={onRemoveGroup} board={board} />
        </section>
        </div>
        </>
    )
}