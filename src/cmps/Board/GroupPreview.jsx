import { useSelector } from 'react-redux'
import { Draggable } from 'react-beautiful-dnd'
import { Menu, MenuButton, MenuItem, Button, Checkbox, Tooltip, EditableHeading } from 'monday-ui-react-core';
import { AddSmall, Delete } from 'monday-ui-react-core/icons';
import { RenderHeaders } from './RenderHeaders'
import { TaskList } from './TaskList'
import { useState } from 'react';
import { useEditableText } from '../../customHooks/useEditableText';
import { ResizableColumn } from './ResizableColumn';
import { GroupArrow } from '../../services/svg.service';
import { set } from 'date-fns';

export function GroupPreview({ boardId, onAddGroup, group, index, onRemoveGroup, onAddTask, onUpdateGroup, boardType, clmTypes, placeholderProps }) {
    const [initialTitle, setInitialTitle] = useState(group.title)
    const [isEditable, setIsEditable] = useState(false)
    const [dynClass, setDynClass] = useState('')
    const editableTitleRef = useEditableText(initialTitle, isEditable, setIsEditable, onUpdateGroup, group)
    const [columnWidths, setColumnWidths] = useState([40, 453, 150, 150, 100, 200, 100, 100, 100, 100]);
    const [isOpen, setIsOpen] = useState(true)


    async function handleClick() {
        if (!isEditable) {
            setInitialTitle(boardTitle)
            setIsEditable(true)

            if (editableTitleRef.current) {
                setDynClass('flex-grow')
                editableTitleRef.current.contentEditable = "true"
                editableTitleRef.current.focus()
            }
        }

  


    }


    const resizeColumn = (index, newWidth) => {
        setColumnWidths(currentWidths =>
            currentWidths.map((width, i) => (i === index ? newWidth : width))
        )
    }

    const dynamicStyle = {
        gridTemplateColumns: columnWidths.map(width => `${width}px`).join(' ')
    };

    // console.log(dynamicStyle);
    return (

        <>
            <section className="group-header">
                <div className="section-group-header-sticky">
                    <MenuButton>
                        <Menu id={`menu-${group._id}`} size={Menu.sizes.LARGE}>
                            <MenuItem icon={AddSmall} title="Add group" onClick={onAddGroup} />
                            <MenuItem icon={Delete} title="Delete" onClick={() => onRemoveGroup(group._id)} />
                        </Menu>
                    </MenuButton>

                    <Tooltip content="Click to Edit"
                        zIndex="99999"
                        animationType="expand"> 
                       <span onClick={() => setIsOpen(!isOpen)} style={{color : group.groupColor, transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)'}} className='group-collapse'> <GroupArrow /> </span> 
                        <EditableHeading
                            style={{ color: group.groupColor }}
                            type={EditableHeading.types.h3}
                            weight={"normal"}
                            value={group.title}
                            isEditMode={"true"}
                            id='editable-header'
                            onFinishEditing={(newTitle) => onUpdateGroup(group._id, newTitle)}

                        />
                    </Tooltip>
                </div>
            </section>
            <section
                className="group-container" style={dynamicStyle}>
                <section className="header-items">
                    <div className='blank-cell'>

                    </div>

                    {/* <ResizableColumn /> */}
                    <div className="group-preview-title-container dyn-cell"
                        style={{ borderLeft: `0.4em solid ${group.groupColor}`, borderTopLeftRadius: "0.3em" }}>
                        <div className='checkbox-header-container sticky'>
                            <Checkbox />
                        </div>
                        <div className='header-item sticky'>{boardType}</div>
                    </div>
                    <RenderHeaders clmTypes={clmTypes} setColumnWidths={setColumnWidths} columnWidths={columnWidths} />
                </section>
                <TaskList
                    groupColor={group.groupColor}
                    tasks={group.tasks}
                    groupId={group._id}
                    onAddTask={onAddTask}
                    placeholderProps={placeholderProps} 
                    columnWidth={columnWidths}
                    />
            </section>

        </>
    )
}

