import { useSelector } from 'react-redux'
import { Draggable } from 'react-beautiful-dnd'
import { Menu, MenuButton, MenuItem, Button } from 'monday-ui-react-core';
import { AddSmall, Delete } from 'monday-ui-react-core/icons';
import { RenderHeaders } from './RenderHeaders'
import { TaskList } from './TaskList'

export function GroupPreview({ boardId, onAddGroup, group, index, onRemoveGroup, onAddTask, boardType, clmTypes }) {

    return (

        <Draggable draggableId={String(group._id)} index={index}>
            {(provided) => (
                <li
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    className="group-container"
                    
                >
                    <section className="group-header">
                        <MenuButton>
                            <Menu id={`menu-${group._id}`} size={Menu.sizes.LARGE}>
                                <MenuItem icon={AddSmall} title="Add group" onClick={onAddGroup} />
                                <MenuItem icon={Delete} title="Delete" onClick={() => onRemoveGroup(group._id)} />
                            </Menu>
                        </MenuButton>
                        <span className="group-title">{group.title}</span>
                    </section>
                    <section className="header-items">
                        <div className='dyn-cell header-item'>{boardType}</div>
                        <RenderHeaders clmTypes={clmTypes} />
                    </section>
                    <TaskList tasks={group.tasks} groupId={group._id} />
                    <Button variant="primary" onClick={() => onAddTask(group._id)}>Add task</Button>
                </li>
            )}
        </Draggable>
    )
}