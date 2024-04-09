import { useSelector } from 'react-redux'
import { DateCellComponent } from './dynamicCmp/DateCellComponent'
import { StatusCellComponent } from './dynamicCmp/StatusCellComponent'
import { PriorityCellComponent } from './dynamicCmp/PriorityCellComponent';
import { MembersCellComponent } from './dynamicCmp/MembersCellComponent';
import { TextCellComponent } from './dynamicCmp/TextCellComponent';
import { LastUpdatedComponent } from './dynamicCmp/LastUpdatedComponent'
import { FilesComponent } from './dynamicCmp/FilesComponent';
import { TimelinesComponent } from './dynamicCmp/TimelinesComponent';
import { Button, Checkbox, Menu, MenuButton, MenuItem } from 'monday-ui-react-core';
import { AddSmall, Delete, Update } from 'monday-ui-react-core/icons';
import { InputCell } from './reusableCmps/InputCell';
import { LabelPicker } from './reusableCmps/LabelPicker';
import { useState } from 'react';
import { onOpenModalLabel, onHideModalLabel } from '../../store/actions/board.actions';





export function TaskPreview({ task, onUpdateCell, onUpdateTask, onRemoveTask, groupColor }) {

    const clmTypes = useSelector(storeState => storeState.boardModule.board.clmTypes)
    const modalProps = useSelector(storeState => storeState.boardModule.modalProps)

    async function onChange(cell) {
        try {
            const labelsList = currClmType.data
        }
        catch (err) {
            console.log(err);
        }

    }

    function openDynModal(clmType) {
        console.log("almost");
    }

    const { cells } = task
    function getClmType(cellId) {
        const clmToReturn = clmTypes.find(clmTypeToReturn => (clmTypeToReturn._id === cellId))
        return clmToReturn
    }

    function onUpdateTitle(newTxt) {
        const taskToUpdate = task
        task.title = newTxt
        onUpdateTask(taskToUpdate)
    }

    async function onClickLabel(target, clmType, cell) {
        try {
            console.log(target);
            const { cell: prevCell, task: prevTask } = modalProps
            console.log(prevCell, prevTask);
            console.log(task, cell);
            if (prevTask === undefined || (prevCell.type !== cell.type || task._id !== prevTask._id)) {
                onOpenModalLabel(target, clmType, cell, task, onUpdateCell);
            } else {
                console.log('here');
                onHideModalLabel();
            }
        } catch (err) {
            console.log('Err on modal toggle', err);
        }
    }

    return (<>
        <section style={{ position: 'absolute' }} className="task-actions">
            <MenuButton size='XS' >
                <Menu id={`menu-${task._id}`} size={Menu.sizes.LARGE}>
                    {/* <MenuItem icon={AddSmall} title="Add group"/> */}
                    <MenuItem icon={Delete} title="Delete" onClick={() => onRemoveTask(task._id)} />
                </Menu>
            </MenuButton>
        </section>
        <div className='dyn-cell checkbox-container'>
            <Checkbox />
        </div>
        <div className='title-container'>
            <span style={{ width: '300px' }} className='dyn-cell title'><InputCell txt={task.title} onUpdateInput={onUpdateTitle} style={{ marginLeft: '5px' }} /></span>
            <Button
                className="btn-message"
                kind="tertiary"
                onClick={() => console.log('m-list')}
                size="small">
                <Update />
            </Button>
        </div>


        {
            cells.map((cell, idx) => (

                <DynamicCmp key={idx}
                    groupColor={groupColor}
                    cmpType={cell.type}
                    onChange={onChange}
                    clmType={getClmType(cell._id)}
                    cell={cell}
                    onUpdateCell={onUpdateCell}
                    taskId={task._id}
                    onClick={openDynModal}
                    onClickLabel={onClickLabel}
                />
            ))
        }
    </>
    )
}

function DynamicCmp(props) {
    switch (props.cmpType) {
        case 'status':
            return <StatusCellComponent {...props} />
        case 'priority':
            return <PriorityCellComponent {...props} />
        case 'members':
            return <MembersCellComponent {...props} />
        case 'txt':
            return <TextCellComponent {...props} />
        case 'date':
            return <DateCellComponent {...props} />
        case 'timelines':
            return <TimelinesComponent {...props} />
        case 'files':
            return <FilesComponent {...props} />
        case 'updates':
            return <LastUpdatedComponent {...props} />

        default: <span>NoNo</span>

    }
}




