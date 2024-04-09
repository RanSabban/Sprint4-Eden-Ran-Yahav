import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { useSelector } from 'react-redux'

import { loadBoard } from "../../store/actions/board.actions"
import { BoardPreview } from "./BoardPreview"
import { BoardHeader } from "./BoardHeader"
import { LabelPicker } from "./reusableCmps/LabelPicker"
import { DragDropContext } from "react-beautiful-dnd"

export function BoardDetails({ onAddGroup, onRemoveGroup }) {


    const { boardId } = useParams()
    const board = useSelector(storeState => storeState.boardModule.board)
    const [isCollapsed, setIsCollapsed] = useState(false)
    

    useEffect(() => {
        if (boardId) loadBoard(boardId)
    }, [boardId])
   

    if (!board) return <div>LOADING BRO</div>
    if (!board) return <div>LOADING BRO</div>
    return (
        <>
                <section className="board-details">
                <BoardHeader isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} onAddGroup={onAddGroup} board={board} />
                    <BoardPreview
                        onAddGroup={onAddGroup}
                        onRemoveGroup={onRemoveGroup}
                        board={board}
                    />
                </section>
        </>
    )
}