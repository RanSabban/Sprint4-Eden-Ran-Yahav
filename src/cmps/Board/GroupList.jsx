import { RenderHeaders } from "./RenderHeaders";
import { TaskList } from "./TaskList";
import { Menu, MenuButton, MenuItem } from "monday-ui-react-core";
import { Button } from "monday-ui-react-core"
import { addGroup, addTask } from "../../store/board.actions";
import { showErrorMsg, showSuccessMsg } from "../../services/event-bus.service";
import { removeGroup } from "../../store/board.actions";
import { AddSmall, Delete, Edit, Favorite, Moon } from "monday-ui-react-core/icons";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { GroupPreview } from "./GroupPreview";


export function GroupList({ clmTypes, groups, onAddTask, boardType, boardId }) {

    async function onRemoveGroup(groupId) {
        try {
            console.log(groupId);
            await removeGroup(groupId)
            showSuccessMsg('Group removed')
        } catch (err) {
            console.log('cannot remove group', err);
            showErrorMsg('Error remove group')
        }
    }

    async function onAddGroup() {
        try {
            const group = await addGroup(boardId)
            console.log(group);
            showSuccessMsg('Group added')
        } catch (err) {
            console.log('Err add group', err);
            showErrorMsg('Nono')
        }
    }



    if (!groups) return <div>Loading</div>
    return (
        <div className="scrollable-container">

            <Droppable droppableId={boardId} type="GROUP" style={{ overflow: 'auto' }}>
                {(provided) => (
                    <ul className="group-list"
                        {...provided.droppableProps}
                        ref={provided.innerRef}>
                        {groups.map((group, index) => (
                            // <Draggable key={group._id} draggableId={group._id} index={index}>
                            //     {(provided) => (
                            //         <li ref={provided.innerRef}
                            //             {...provided.draggableProps}
                            //             {...provided.dragHandleProps}
                            //             style={{ overflow: 'auto' }}

                                        
                                        <GroupPreview
                                            boardId={boardId}
                                            group={group}
                                            index={index}
                                            clmTypes={clmTypes}
                                            boardType={boardType}
                                            onAddGroup={onAddGroup}
                                            onRemoveGroup={onRemoveGroup}
                                            onAddTask={onAddTask} 
                                        />
                            //         </li>
                            //     )}
                            // </Draggable>
                        ))}
                        {provided.placeholder}
                    </ul>
                )}
            </Droppable>
        </div>

    )
}
