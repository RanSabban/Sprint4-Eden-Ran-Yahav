import { useSelector } from 'react-redux'
import { Draggable } from 'react-beautiful-dnd'
import { Menu, MenuButton, MenuItem, Button, Checkbox, Tooltip, EditableHeading } from 'monday-ui-react-core';
import { AddSmall, Delete } from 'monday-ui-react-core/icons';
import { RenderHeaders } from './RenderHeaders'
import { TaskList } from './TaskList'

export function GroupPreview({ boardId, onAddGroup, group, index, onRemoveGroup, onAddTask, boardType, clmTypes }) {

    return (

        <Draggable key={group._id} draggableId={group._id.toString()} index={index}>

            {(provided) => (
                <li
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    className="group-card"
                >
                    <section className="group-header">
                        <MenuButton>
                            <Menu id={`menu-${group._id}`} size={Menu.sizes.LARGE}>
                                <MenuItem icon={AddSmall} title="Add group" onClick={onAddGroup} />
                                <MenuItem icon={Delete} title="Delete" onClick={() => onRemoveGroup(group._id)} />
                            </Menu>
                        </MenuButton>
                        <Tooltip content="Click to Edit"
                            animationType="expand">
                            <EditableHeading
                                type={EditableHeading.types.h3}
                                weight={"normal"}
                                value={group.title}
                                isEditMode={"true"}
                                id='editable-header'

                            />
                        </Tooltip>
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
                </li>
            )}
        </Draggable>
    )
}

