import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { useSelector } from 'react-redux'

import { loadBoard } from "../../store/actions/board.actions"
import { BoardPreview } from "./BoardPreview"
import { BoardHeader } from "./BoardHeader"
import { LabelPicker } from "./reusableCmps/LabelPicker"
import { useInView } from "react-intersection-observer"

export function BoardDetails({ onAddGroup, onRemoveGroup }) {

    const { boardId } = useParams()
    const board = useSelector(storeState => storeState.boardModule.board)
    const [isCollapsed, setIsCollapsed] = useState(false)
    const { ref, inView } = useInView({
        threshold: 0.1,
    })

    useEffect(() => {
        if (boardId) loadBoard(boardId)
    }, [boardId])

    useEffect(() => {
        setIsCollapsed(!inView)
    }, [inView])

    if (!board) return <div>LOADING BRO</div>
    return (
        <>
            <section className="board-details" >
                <div ref={ref} style={{ height: '1px', position: "absolute", width: '100%'}}></div>
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