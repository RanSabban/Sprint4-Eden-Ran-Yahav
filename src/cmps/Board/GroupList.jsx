import { addGroup, addTask, dragAndDropGroup, dragAndDropTask, updateGroup } from "../../store/actions/board.actions"
import { showErrorMsg, showSuccessMsg } from "../../services/event-bus.service"
import { removeGroup } from "../../store/actions/board.actions"
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd"
import { GroupPreview } from "./GroupPreview"
import { useEffect, useRef, useState } from "react"
import { useParams } from "react-router"
import { useInView } from "react-intersection-observer"

export function GroupList({ clmTypes, onAddTask, boardType, groups, isCollapsedAll }) {

    const [localGroups, setLocalGroups] = useState(groups)
    const [localClmTypes, setLocalClmTypes] = useState(clmTypes)

    useEffect(() => {
        setLocalGroups(groups)
    },[groups])

    useEffect(() => {
        setLocalClmTypes(clmTypes)
    },[clmTypes])


    const groupListRef = useRef()
    const [placeholderProps, setPlaceholderProps] = useState("")
    const [isActive, setIsActive] = useState(false)
    const { ref, inView } = useInView({
        threshold: .1,
        rootMargin: '-10px',
        triggerOnce: false
    })


    useEffect(() => {
        setIsActive(inView)
    }, [inView])

    
    const { boardId } = useParams()


    async function onRemoveGroup(groupId) {
        try {
            console.log(boardId)
            await removeGroup(groupId, boardId)
            showSuccessMsg('Group removed')
        } catch (err) {
            console.log('cannot remove group', err)
            showErrorMsg('Error remove group')
        }
    }

    async function onAddGroup() {
        try {
            console.log('here')
            console.log(boardId)
            const group = await addGroup(boardId)
            console.log(group)
            showSuccessMsg('Group added')
        } catch (err) {
            console.log('Err add group', err)
            showErrorMsg('Nono')
        }
    }


    async function onUpdateGroup(groupId, updatedGroupData) {
        console.log(updatedGroupData)
        console.log(groupId, updatedGroupData, boardId)
        try {
            await updateGroup(groupId, updatedGroupData, boardId)
            console.log('Group updated successfully')
            // showSuccessMsg('Group updated successfully')
        } catch (err) {
            console.error('Error updating group:', err)
            showErrorMsg('Error updating group')
        }
    }

    if (!groups) return <div>Loading...</div>

    if (!localGroups) return <div>Loading</div>
    return (

        // <DragDropContext onDragEnd={handleOnDragEnd} onDragUpdate={onDragUpdate}>

        <Droppable
            droppableId={boardId}
            type="GROUP"
        >
            {(provided, snapshot) => (
                <ul className="group-list"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                >
                    <div  className={`mobile-border ${isActive ? 'active' : ''}`}></div>

                    {localGroups.map((group, index) => (

                        <Draggable key={group._id} draggableId={group._id} index={index}>

                            {(provided, snapshot) => (
                                <li
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    ref={provided.innerRef}
                                    className="group-card"
                                >
                                    <GroupPreview
                                        placeholderProps={placeholderProps}
                                        boardId={boardId}
                                        group={group}
                                        index={index}
                                        clmTypes={localClmTypes}
                                        boardType={boardType}
                                        onAddGroup={onAddGroup}
                                        onRemoveGroup={onRemoveGroup}
                                        onUpdateGroup={onUpdateGroup}
                                        onAddTask={onAddTask}
                                        isCollapsedAll={isCollapsedAll}
                                    />

                                </li>
                            )}
                        </Draggable>
                    ))}
                    {/* {snapshot.isDraggingOver && (
                        <div style={{
                            position: "absolute",
                            top: placeholderProps.clientY,
                            left: placeholderProps.clientX + `60px`,
                            height: placeholderProps.clientHeight,
                            border: "1px dashed #d0d4e4",
                            borderRadius: "2px",
                            width: placeholderProps.clientWidth - `10px`,
                        }} />
                    )} */}
                    {provided.placeholder}
                </ul>
            )}
        </Droppable>
        // </DragDropContext>



    )
}