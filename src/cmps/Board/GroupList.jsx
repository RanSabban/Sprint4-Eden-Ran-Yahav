import { RenderHeaders } from "./RenderHeaders"
import { TaskList } from "./TaskList"
import { Menu, MenuButton, MenuItem } from "monday-ui-react-core"
import { Button } from "monday-ui-react-core"
import { addGroup, addTask, dragAndDropGroup, dragAndDropTask, updateGroup } from "../../store/actions/board.actions"
import { showErrorMsg, showSuccessMsg } from "../../services/event-bus.service"
import { removeGroup } from "../../store/actions/board.actions"
import { AddSmall, Delete, Edit, Favorite, Moon } from "monday-ui-react-core/icons"
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd"
import { GroupPreview } from "./GroupPreview"
import { useSelector } from "react-redux"
import { LabelPicker } from "./reusableCmps/LabelPicker"
import { useEffect, useRef, useState } from "react"
import { useParams } from "react-router"



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


    // useEffect(() => {
    //     if (groupListRef.current) {
    //         const scrollWidth = groupListRef.current.scrollWidth
    //         console.log("Scrollable Width:", scrollWidth)
    //     } console.log("isCollapsedAll", isCollapsedAll)
    // }, [groups])

    const { boardId } = useParams()


    async function onRemoveGroup(groupId) {
        try {
            console.log(boardId);
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

    async function onUpdateGroup(groupId, updatedTitle) {
        try {

            // const updatedGroupData = { title: updatedTitle }
            await updateGroup(groupId, updatedTitle, boardId)

            console.log('Group updated successfully')
            // showSuccessMsg('Group updated successfully')
        } catch (err) {
            console.error('Error updating group:', err)
            showErrorMsg('Error updating group')
        }
    }

    // console.log(groups);


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
                    <div className='mobile-border'></div>


                    {localGroups.map((group, index) => (

                        <Draggable key={index} draggableId={group._id} index={index}>

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
                    {snapshot.isDraggingOver && (
                        <div style={{
                            position: "absolute",
                            top: placeholderProps.clientY,
                            left: placeholderProps.clientX + `60px`,
                            height: placeholderProps.clientHeight,
                            border: "1px dashed #d0d4e4",
                            borderRadius: "2px",
                            width: placeholderProps.clientWidth - `10`,
                        }} />
                    )}
                    {provided.placeholder}
                </ul>
            )}
        </Droppable>
        // </DragDropContext>



    )
}