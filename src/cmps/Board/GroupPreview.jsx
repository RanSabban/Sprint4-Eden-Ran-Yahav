import { useSelector } from 'react-redux'
import { Draggable } from 'react-beautiful-dnd'
import { Menu, MenuButton, MenuItem, Button, Checkbox, Tooltip, EditableHeading, ColorPicker } from 'monday-ui-react-core';
import { AddSmall, Delete, DropdownChevronDown, DropdownChevronRight, DropdownChevronUp } from 'monday-ui-react-core/icons';
import { RenderHeaders } from './RenderHeaders'
import { TaskList } from './TaskList'
import { useEffect, useState } from 'react';
import { useEditableText } from '../../customHooks/useEditableText';
import { ResizableColumn } from './ResizableColumn';
import { GroupArrow } from '../../services/svg.service';
import { set } from 'date-fns';
import { loadBoards, updateGroup } from '../../store/actions/board.actions';
import { GroupStatistics } from './GroupStatistics';

export function GroupPreview({ boardId, onAddGroup, group, index, onRemoveGroup, onAddTask, onUpdateGroup, boardType, clmTypes, placeholderProps, isCollapsedAll }) {
    const specificGroup = useSelector(storeState => storeState.boardModule.board.groups.find(g => g === group))
    // const [specificGroup, setSpecificGroup] = useState(group)
    const [initialTitle, setInitialTitle] = useState(group.title)
    const [isEditable, setIsEditable] = useState(false)
    const [dynClass, setDynClass] = useState('')
    const editableTitleRef = useEditableText(initialTitle, isEditable, setIsEditable, onUpdateGroup, group)
    const [columnWidths, setColumnWidths] = useState([40, 453, 150, 150, 100, 200, 100, 100, 100, 100])
    const [isOpen, setIsOpen] = useState(false)
    const colorOpen = isOpen ? 'grid' : 'none'
    const [optionColorOpen, setOptionColorOpen] = useState(false)
    const colorOptions = optionColorOpen ? 'block' : 'none'

    const [isCollapsed, setIsCollapsed] = useState(false)



    const [collapseClass, setCollapseClass] = useState('')
    // const dynCollapseBtn = isCollapsed ? '' : 'collapseBtn'


    useEffect(() => {
        if (isCollapsedAll) {
            console.log(isCollapsedAll);
            setIsCollapsed(true)
        } else {
            setIsCollapsed(false)
        }
    }, [isCollapsedAll])


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

    async function setGroupColor(ev) {

        const updatedGroupData = { ...specificGroup, groupColor: ev.target.style.backgroundColor }

        try {
            await updateGroup(group._id, updatedGroupData)
            // setSpecificGroup(updatedGroupData)
            setOptionColorOpen(!optionColorOpen)
            console.log('Group updated successfully')

        } catch (err) {
            console.error('Error updating group:', err)

        }

    }

    const resizeColumn = (index, newWidth) => {
        setColumnWidths(currentWidths =>
            currentWidths.map((width, i) => (i === index ? newWidth : width))
        )
    }

    const dynamicStyle = {
        gridTemplateColumns: columnWidths.map((width, index) => `${width}px`).join(' ')
    };

    // console.log(dynamicStyle);
    if (!group.tasks.length) return
    return (

        <>
            {isCollapsed ? (
                <div className="collapsed-group">
                    <section
                        className="group-container">
                        {/* <section className="header-items"> */}
                        <div className='blank-cell'>

                            <MenuButton size='XS' >
                                <Menu id={`menu-${group._id}`} size={Menu.sizes.SMALL} style={{ zIndex: '1111111' }}>
                                    <MenuItem icon={AddSmall} title="Add group" onClick={onAddGroup} />
                                    <MenuItem icon={Delete} title="Delete" onClick={() => onRemoveGroup(group._id)} />
                                </Menu>
                            </MenuButton>
                        </div>

                        <div className="group-wrapper">
                            <section className="header-items">

                                <div className="group-preview-title-container dyn-cell"
                                    style={{ borderLeft: `0.4em solid ${group.groupColor}`, borderTopLeftRadius: "0.6em" }}>

                                    <section className="group-header">
                                        <div className="section-group-header-sticky">

                                            <DropdownChevronRight
                                                className="btn-group-collapse-arrow"
                                                size={22}
                                                style={{ color: group.groupColor }}
                                                onClick={() => setIsCollapsed(!isCollapsed)}
                                            />

                                            <Tooltip content="Click to Edit">
                                                <EditableHeading
                                                    onFocus={() => setOptionColorOpen(!optionColorOpen)}
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
                                    {/* <div className='header-item sticky'>{boardType}</div> */}
                                </div>
                                <RenderHeaders clmTypes={clmTypes} setColumnWidths={setColumnWidths} columnWidths={columnWidths} isCollapsed={isCollapsed} />

                            </section>
                            <GroupStatistics tasks={group.tasks} clmTypes={clmTypes} isCollapsed={isCollapsed} groupColor={group.groupColor} />
                        </div>

                    </section>
                </div>
            ) : (
                <>
                    <section className="group-header">
                        <div className="section-group-header-sticky">
                            <MenuButton size='XS' >
                                <Menu id={`menu-${group._id}`} size={Menu.sizes.SMALL} style={{ zIndex: '1111111' }}>
                                    <MenuItem icon={AddSmall} title="Add group" onClick={onAddGroup} />
                                    <MenuItem icon={Delete} title="Delete" onClick={() => onRemoveGroup(group._id)} />
                                </Menu>
                            </MenuButton>

                            {/* <Tooltip content="Click to Edit"
                        zIndex="99999"
                        animationType="expand"> */}
                            {/* <span style={{ color: group.groupColor, transform: 'rotate(90deg)', }} className='group-collapse'> <GroupArrow /> </span> */}

                            {isCollapsed ? (
                                <DropdownChevronUp
                                    className="btn-group-collapse-arrow"
                                    size={22}
                                    style={{ color: group.groupColor }}
                                    onClick={() => setIsCollapsed(!isCollapsed)}
                                />
                            ) : (
                                <DropdownChevronDown
                                    className="btn-group-collapse-arrow"
                                    size={22}
                                    style={{ color: group.groupColor }}
                                    onClick={() => setIsCollapsed(!isCollapsed)}
                                />
                            )}

                            {/* <div onClick={() => setIsOpen(!isOpen)} className="group-color-display" style={{ backgroundColor: group.groupColor, display: colorOptions }}></div> */}

                            <Tooltip content="Click to Edit">
                                <EditableHeading
                                    onFocus={() => setOptionColorOpen(!optionColorOpen)}
                                    style={{ color: group.groupColor }}
                                    type={EditableHeading.types.h3}
                                    weight={"normal"}
                                    value={group.title}
                                    isEditMode={"true"}
                                    id='editable-header'
                                    onFinishEditing={(newTitle) => onUpdateGroup(group._id, newTitle)}

                                />
                            </Tooltip>
                            {/*                    
                    <div style={{ display: colorOpen }} className="color-picker-modal">
                        <div onClick={setGroupColor} className="color" style={{ backgroundColor: '#ffcb00' }}></div>
                        <div onClick={setGroupColor} className="color" style={{ backgroundColor: '#007038' }}></div>
                        <div onClick={setGroupColor} className="color" style={{ backgroundColor: '#469e9b' }}></div>
                        <div onClick={setGroupColor} className="color" style={{ backgroundColor: '#579bfc' }}></div>
                        <div onClick={setGroupColor} className="color" style={{ backgroundColor: '#9aadbd' }}></div>
                        <div onClick={setGroupColor} className="color" style={{ backgroundColor: '#bba5e8' }}></div>
                        <div onClick={setGroupColor} className="color" style={{ backgroundColor: '#8050ab' }}></div>
                        <div onClick={setGroupColor} className="color" style={{ backgroundColor: '#4f3a65' }}></div>
                        <div onClick={setGroupColor} className="color" style={{ backgroundColor: '#92334c' }}></div>
                        <div onClick={setGroupColor} className="color" style={{ backgroundColor: '#bb3354' }}></div>
                        <div onClick={setGroupColor} className="color" style={{ backgroundColor: '#ff7575' }}></div>
                    </div> */}
                            {/* </Tooltip> */}
                        </div>
                    </section>
                    <section
                        className="group-container">
                        {/* future collumns resizable */}
                        {/* className="group-container" style={dynamicStyle}> */}
                        <section className="header-items">
                            <div className='blank-cell'>

                            </div>

                            {/* <ResizableColumn /> */}
                            <div className="group-preview-title-container dyn-cell"
                                style={{ borderLeft: `0.4em solid ${group.groupColor}`, borderTopLeftRadius: "0.6em" }}>
                                <div className='checkbox-header-container sticky'>
                                    <Checkbox />
                                </div>
                                <div className='header-item sticky'>{boardType}</div>
                            </div>
                            { }
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

                        <GroupStatistics tasks={group.tasks} clmTypes={clmTypes} />
                    </section>
                </>
            )}

        </>
    )
}

