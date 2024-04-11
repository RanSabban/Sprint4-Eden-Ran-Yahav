import { Outlet, useParams } from "react-router"
import { useEffect, useState } from "react"
import { useSelector } from 'react-redux'

import { addGroup, loadBoard, removeGroup } from "../../store/actions/board.actions"
import { BoardPreview } from "./BoardPreview"
import { BoardHeader } from "./BoardHeader"
import { LabelPicker } from "./reusableCmps/LabelPicker"
import { useInView } from "react-intersection-observer"
import { showErrorMsg, showSuccessMsg } from "../../services/event-bus.service"
import { Activity } from "../Acttivity"

export function BoardDetails() {

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


    async function onRemoveGroup(groupId) {
        try {
            await removeGroup(groupId)
            showSuccessMsg('Group removed')
        } catch (err) {
            console.log('cannot remove group', err); 
            showErrorMsg('Error remove group')
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

                <Outlet/> 
       
            </section>
        </>
    )
}