import { RenderHeaders } from "./RenderHeaders";
import { TaskList } from "./TaskList";
import { Checkbox, Menu, MenuButton, MenuItem } from "monday-ui-react-core";
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


<<<<<<< HEAD
=======
    return <section className="group-list">
        {groups.map((group) => {
            return (<section className="group-card" key={group._id}>
                <section className="group-header">
                    <MenuButton>
                        <Menu id="menu" size={Menu.sizes.LARGE}>
                            <MenuItem icon={AddSmall} title="Add group" onClick={() => onAddGroup()} />
                            <MenuItem icon={Delete} title="Delete" onClick={() => onRemoveGroup(group._id)} />
                        </Menu>
                    </MenuButton>

                    <span className="group-title">{group.title}</span>
                </section>
                <section className="group-container">
                    <section className="header-items">
                        <div className='dyn-cell checkbox-header-container'>
                            <Checkbox />
                        </div>
                        <div className='dyn-cell header-item'>{boardType}</div>
                        <RenderHeaders clmTypes={clmTypes} />
                    </section>
                    <TaskList tasks={group.tasks} groupId={group._id} onAddTask={onAddTask} />
                </section>
            </section>
            )
        })}
>>>>>>> d0db9fc4c09cdc3dceb1ba2762460196ebc3fe75

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
