import { useSelector } from 'react-redux'
import { DateCellComponent } from './dynamicCmp/DateCellComponent'
import { StatusCellComponent } from './dynamicCmp/StatusCellComponent'
import { PriorityCellComponent } from './dynamicCmp/PriorityCellComponent';
import { MembersCellComponent } from './dynamicCmp/MembersCellComponent';
import { TextCellComponent } from './dynamicCmp/TextCellComponent';
import { LastUpdatedComponent } from './dynamicCmp/LastUpdatedComponent'
import { FilesComponent } from './dynamicCmp/FilesComponent';
import { TimelinesComponent } from './dynamicCmp/TimelinesComponent';





export function TaskPreview({ task }) {

    const clmTypes = useSelector(storeState => storeState.boardModule.clmTypes)


    const { cells } = task
    function getClmType(cellId) {
        const ClmToReturn = clmTypes.filter(clmTypeToReturn => (clmTypeToReturn._id === cellId))
        return ClmToReturn
    }

    return (<li key={task._id} className='list-item'>
        <span className='dyn-cell title'>{task.title}</span>
        {
            cells.map((cell,idx) => (
                <>
                    <DynamicCmp key={idx} cmpType={cell.type}
                        ClmType={getClmType(cell._id)}
                        cell={cell}
                    />
                </>

            ))
        }
    </li>

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




