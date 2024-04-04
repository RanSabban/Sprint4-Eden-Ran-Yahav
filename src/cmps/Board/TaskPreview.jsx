import { useSelector } from 'react-redux'



export function TaskPreview({ task }) {

    const cellComponents = {
        status: StatusCellComponent,
        priority: PriorityCellComponent,
        members: MembersCellComponent,
        txt: TextCellComponent,
        date: DateCellComponent
    };

    const clmTypes = useSelector(storeState => storeState.boardModule.clmTypes)


    const { cells } = task
    function renderCell(cell) {
        // const dynamicCmp = 
    }

    return (<ul>
            <li key = {task._id}>{task.title}</li>
        {
            cells.map((cell) => (
                <li>
                    {renderCell(cell)}
                </li>
            ))
        }
    </ul>

    )
}

const StatusCellComponent = ({ data }) => {
    return <div>{data}</div>;
};

const PriorityCellComponent = ({ data }) => {
    return <div>{data}</div>;
};

const MembersCellComponent = ({ data }) => {
    return <div>{data}</div>;
};

const TextCellComponent = ({ data }) => {
    return <div>{data}</div>;
};

const DateCellComponent = ({ data }) => {
    return <div>{data}</div>;
};

