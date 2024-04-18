import { useSelector } from 'react-redux'
import { Draggable } from 'react-beautiful-dnd'
import { Menu, MenuButton, MenuItem, Button, Checkbox, Tooltip, EditableHeading } from 'monday-ui-react-core';
import { Add, AddSmall, Delete, DropdownChevronDown, DropdownChevronRight, DropdownChevronUp } from 'monday-ui-react-core/icons';
import { RenderHeaders } from './RenderHeaders'
import { TaskList } from './TaskList'
import { useEffect, useState } from 'react';
import { useEditableText } from '../../customHooks/useEditableText';
import { ResizableColumn } from './ResizableColumn';
import { loadBoards, onOpenModalLabel, updateGroup } from '../../store/actions/board.actions';
import { GroupStatistics } from './GroupStatistics';
import { useParams } from 'react-router';
import { ColumnsEdit } from './ColumnsEdit';
import { useScreenWidth } from '../../customHooks/useScreenWidth';
import { utilService } from '../../services/util.service';
import { ColorPicker } from './reusableCmps/ColorPicker';

export function GroupPreview({ onAddGroup, group, index, onRemoveGroup, onAddTask, onUpdateGroup, boardType, placeholderProps, isCollapsedAll }) {
    const specificGroup = useSelector(storeState => storeState.boardModule.board.groups.find(g => g === group))
    const clmTypes = useSelector(storeState => storeState.boardModule.board.clmTypes)

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
    const screenWidth = useScreenWidth()
    const [currGroup, setCurrGroup] = useState(group)
    const [currClmTypes, setCurrClmTypes] = useState(clmTypes)


    const [isCollapsed, setIsCollapsed] = useState(false)

    const { boardId } = useParams()

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

    function onClickLabel(target, groupId, clmType, key) {
        try {
            console.log(target, groupId, clmType);
            onOpenModalLabel(target, group, clmType, boardId, specificGroup)
        } catch (err) {
            console.log('cannot open modal', err)
        }
    }

    async function onUpdateGroupData(groupId, key, value) {
        const updatedGroupData = { ...specificGroup, [key]: value };
        try {
            setOptionColorOpen(!optionColorOpen)
            await updateGroup(groupId, updatedGroupData, boardId)
            console.log('Group updated successfully')
        } catch (err) {
            console.error('Error updating group:', err)

        } finally {
            console.log(`Updating group ${groupId}: ${key} = ${value}`);
        }
    }
    useEffect(() => {
        setCurrGroup(group)
    },[group])

    useEffect(() => {
        setCurrClmTypes([...clmTypes])
    },[clmTypes])



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
            await updateGroup(group._id, updatedGroupData, boardId)
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
    }

    function getTemplateStyle() {
        const fixedStart = screenWidth > 920 ? '40px 453px' : '196px'
        const dynamicColumns = clmTypes.map(clmType => {
            switch (clmType.type) {
                case 'priority':
                case 'status':
                case 'members':
                    return '150px';
                case 'timelines':
                    return '180px'
                default:
                    return '125px';
            }
        }).join(' ')
        const fixedEnd = "minmax(60px,1fr)"
        const gridTemplateColumns = `${fixedStart} ${dynamicColumns} ${fixedEnd}`
        return { gridTemplateColumns }
    }
    function getTemplateStyleCollapsed() {
        const fixedStart = '196px'
        const dynamicColumns = clmTypes.map(clmType => {
            switch (clmType.type) {
                case 'priority':
                case 'status':
                case 'members':
                    return '150px';
                case 'timelines':
                    return '180px'
                default:
                    return '125px';
            }
        }).join(' ')
        const fixedEnd = "minmax(60px,1fr)"
        const gridTemplateColumns = `${fixedStart} ${dynamicColumns} ${fixedEnd}`
        return { gridTemplateColumns }
    }

    const gridStyle = getTemplateStyle()
    // console.log(gridStyle)

    // console.log(dynamicStyle);
    // if (!group.tasks.length) return

    console.log(currClmTypes);

    return (

        <>
            {isCollapsed ? (
                <div className="collapsed-group" >
                    <section
                        className="group-container"  >
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
                                    style={{ borderLeft: `6px solid ${group.groupColor}`, borderTopLeftRadius: "0.6em" }}>

                                    <section className="group-header">
                                        <div className="section-group-header-sticky">

                                            <DropdownChevronRight
                                                className="btn-group-collapse-arrow"
                                                size={22}
                                                style={{ color: currGroup.groupColor }}
                                                onClick={() => setIsCollapsed(!isCollapsed)}
                                            />

                                            <Tooltip content="Click to Edit">
                                                <EditableHeading
                                                    onFocus={() => setOptionColorOpen(!optionColorOpen)}
                                                    style={{
                                                        color: currGroup.groupColor,
                                                        paddingLeft: isEditMode ? '36px' : undefined
                                                        
                                                    }}
                                                    editing='false'
                                                    type={EditableHeading.types.h3}
                                                    weight={"normal"}
                                                    value={currGroup.title}
                                                    isEditMode={"true"}
                                                    id={`editable-header %${editing ? "yes" : 'no'}`}
                                                    onBlur={(newTitle) => onUpdateGroupData(group._id, 'title', newTitle)}

                                                />
                                            </Tooltip>
                                        </div>
                                    </section>
                                    {/* <div className='header-item sticky'>{boardType}</div> */}
                                </div>
                                <RenderHeaders clmTypes={currClmTypes} setColumnWidths={setColumnWidths} columnWidths={columnWidths} isCollapsed={isCollapsed} />

                            </section>
                            <GroupStatistics tasks={currGroup.tasks} clmTypes={currClmTypes} isCollapsed={isCollapsed} groupColor={currGroup.groupColor} />
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
                            <div className="group-color-display" onClick={(ev) => onClickLabel(ev.target, group._id, "groupColor")} style={{ backgroundColor: group.groupColor, display: colorOptions }}></div>


                            {/* <ColorPicker group={group} onClickLabel={onClickLabel} /> */}

                            {/* <div onClick={() => setIsOpen(!isOpen)} className="group-color-display" style={{ backgroundColor: group.groupColor, display: colorOptions }}>
                                <div className='color-picker-modal'>
                                    {
                                        colorsList.map((color, index) => (
                                            <div className='color'
                                                key={index} 
                                                onClick={() => onUpdateGroupData(group._id, 'groupColor', color)} 
                                                style={{ backgroundColor: color }}
                                            ></div>
                                        ))
                                    }
                                </div>
                            </div> */}

                            <Tooltip content="Click to Edit">
                                <EditableHeading
                                    onFocus={() => setOptionColorOpen(!optionColorOpen)}
                                    style={{ color: group.groupColor }}
                                    type={EditableHeading.types.h3}
                                    weight={"normal"}
                                    value={group.title}
                                    isEditMode={"true"}
                                    id='editable-header'
                                    onFinishEditing={(newTitle) => onUpdateGroupData(group._id, 'title', newTitle)}

                                />
                            </Tooltip>


                            {/* </Tooltip> */}
                        </div>
                    </section>
                    <section
                        className="group-container" style={getTemplateStyle()}>
                        {/* future collumns resizable */}
                        {/* className="group-container" style={dynamicStyle}> */}
                        <section className="header-items">
                            <div className='blank-cell'></div>

                            {/* <ResizableColumn /> */}
                            <div className="group-preview-title-container dyn-cell"
                                style={{ borderLeft: `0.4em solid ${group.groupColor}`, borderTopLeftRadius: "0.6em" }}>
                                <div className='checkbox-header-container sticky'>
                                    <Checkbox />
                                </div>
                                <div className='header-item sticky' style={{ fontSize: '14px' }} >{boardType}</div>
                            </div>
                            { }
                            <RenderHeaders clmTypes={currClmTypes} setColumnWidths={setColumnWidths} columnWidths={columnWidths} />

                        </section>
                        <TaskList
                            groupColor={group.groupColor}
                            tasks={group.tasks}
                            groupId={group._id}
                            onAddTask={onAddTask}
                            placeholderProps={placeholderProps}
                            columnWidth={columnWidths}
                            clmTypes={currClmTypes}
                        />

                        <GroupStatistics tasks={group.tasks} clmTypes={currClmTypes} />
                    </section>
                </>
            )}

        </>
    )
}

