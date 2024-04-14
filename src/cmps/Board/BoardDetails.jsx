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
import loader from '../../assets/img/loader.gif'

export function BoardDetails() {

    const { boardId } = useParams()
    const board = useSelector(storeState => storeState.boardModule.board)
    const [isCollapsed, setIsCollapsed] = useState(false)
    const { ref, inView } = useInView({
        threshold: .1,
    })

    useEffect(() => {
        if (boardId) loadBoard(boardId)
    }, [boardId])

    useEffect(() => {
        setIsCollapsed(!inView);
    }, [inView]);
    
    useEffect(() => {
        if (isCollapsed) {
            window.scrollTo({ top: 1500, behavior: 'smooth' });
        }
    }, [isCollapsed]);


    async function onRemoveGroup(groupId) {
        try {
            await removeGroup(groupId)
            showSuccessMsg('Group removed')
        } catch (err) {
            console.log('cannot remove group', err); 
            showErrorMsg('Error remove group')
        }
    }

    
    async function onAddGroup(boardId,isBottom) {
        try {
            console.log('here');
            const group = await addGroup(boardId,isBottom)
            console.log(group);
            showSuccessMsg('Group added')
        } catch (err) {
            console.log('Err add group', err);
            showErrorMsg('Nono')
        }
    }

    if (!board) return <div></div>
    return (
        <>
            <section className="board-details" >
                <div ref={ref} style={{ height: '1px', position: "absolute", width: '100vw'}}></div>
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