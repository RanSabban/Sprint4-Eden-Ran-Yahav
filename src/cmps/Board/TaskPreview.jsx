import { useSelector } from 'react-redux'
import { DateCellComponent } from './dynamicCmp/DateCellComponent'
import { StatusCellComponent } from './dynamicCmp/StatusCellComponent'
import { PriorityCellComponent } from './dynamicCmp/PriorityCellComponent';
import { MembersCellComponent } from './dynamicCmp/MembersCellComponent';
import { TextCellComponent } from './dynamicCmp/TextCellComponent';
import { LastUpdatedComponent } from './dynamicCmp/LastUpdatedComponent'
import { FilesComponent } from './dynamicCmp/FilesComponent';
import { TimelinesComponent } from './dynamicCmp/TimelinesComponent';
import { Button } from 'monday-ui-react-core';
import { Update } from 'monday-ui-react-core/icons';
import { InputCell } from './reusableCmps/InputCell';
import { LabelPicker } from './reusableCmps/LabelPicker';
import { useState } from 'react';





export function TaskPreview({ task, onUpdateTask }) {

    const clmTypes = useSelector(storeState => storeState.boardModule.board.clmTypes)
    const [cellToEdit, setCellToEdit] = useState('')

    const [modalInfo, setModalInfo] = useState({ visible: false, top: 0, left: 0, cellId: null });

    // const showModal = (event, cellId) => {
    //     const rect = event.currentTarget.getBoundingClientRect()
    //     setModalInfo({
    //         visible: true,
    //         top: rect.bottom + window.scrollY,
    //         left: rect.left + window.scrollX,
    //         cellId
    //     })
    // }

    function onChange(cell){
        console.log(cell);
        setCellToEdit(cell)
        console.log(cellToEdit);
    }

    const { cells } = task
    function getClmType(cellId) {
        const clmToReturn = clmTypes.filter(clmTypeToReturn => (clmTypeToReturn._id === cellId))
        return clmToReturn
    }

    return (<>
        <div className='title-container'>
            <span style={{ width: '300px' }} className='dyn-cell title'><InputCell txt={task.title} onUpdateTask={onUpdateTask} style={{ marginLeft: '5px' }} /></span>
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
                    cmpType={cell.type}
                    onChange={onChange}
                    // setCellToEdit={setCellToEdit}
                    clmType={getClmType(cell._id)}
                    cell={cell}
                    onUpdateTask={onUpdateTask}
                    taskId={task._id}
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




