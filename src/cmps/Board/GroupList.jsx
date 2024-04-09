import { RenderHeaders } from "./RenderHeaders"
import { TaskList } from "./TaskList"
import { Menu, MenuButton, MenuItem } from "monday-ui-react-core"
import { Button } from "monday-ui-react-core"
import { addGroup, addTask, updateGroup } from "../../store/actions/board.actions"
import { showErrorMsg, showSuccessMsg } from "../../services/event-bus.service"
import { removeGroup } from "../../store/actions/board.actions"
import { AddSmall, Delete, Edit, Favorite, Moon } from "monday-ui-react-core/icons"
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd"
import { GroupPreview } from "./GroupPreview"
import { useSelector } from "react-redux"


export function GroupList({ clmTypes, onAddTask, boardType, boardId, placeholderProps }) {

    const groups = useSelector(storeState => storeState.boardModule.board.groups)

    async function onRemoveGroup(groupId) {
        try {
            console.log(groupId)
            await removeGroup(groupId)
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
            console.log(groupId, updatedTitle);
            const updatedGroupData = { title: updatedTitle };
            await updateGroup(groupId, updatedGroupData);

            console.log('Group updated successfully');
            showSuccessMsg('Group updated successfully');
        } catch (err) {
            console.error('Error updating group:', err);
            showErrorMsg('Error updating group');
        }
    }



    if (!groups) return <div>Loading</div>
    return (
        <Droppable
            droppableId={boardId}
            type="GROUP"
            style={{ overflow: 'auto' }}>
            {(provided) => (
                <ul className="group-list"
                    {...provided.droppableProps}
                    ref={provided.innerRef}>
                    {groups.map((group, index) => (
                        <Draggable key={group._id} draggableId={group._id.toString()} index={index}>

                            {(provided, snapshot) => (
                                <li
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    ref={provided.innerRef}
                                // className="group-card"
                                >
                                    <GroupPreview
                                        placeholderProps={placeholderProps}
                                        boardId={boardId}
                                        group={group}
                                        index={index}
                                        clmTypes={clmTypes}
                                        boardType={boardType}
                                        onAddGroup={onAddGroup}
                                        onRemoveGroup={onRemoveGroup}
                                        onUpdateGroup={onUpdateGroup}
                                        onAddTask={onAddTask}
                                    />

                                </li>
                            )}
                        </Draggable>
                    ))}


                </ul>
            )}
        </Droppable>
    )
}