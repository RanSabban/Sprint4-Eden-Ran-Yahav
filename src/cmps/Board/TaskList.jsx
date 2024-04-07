import { useSelector } from 'react-redux';
import { TaskPreview } from './TaskPreview'
import { updateCell } from '../../store/board.actions';
import { useParams } from 'react-router';


export function TaskList({ groupId }) {
    const tasks = useSelector(storeState =>
        storeState.boardModule.board.groups.find(group => group._id === groupId)?.tasks || []
    );

    const {boardId} = useParams()

    async function onUpdateCell(cell,taskId) {
        try { 
            await updateCell(cell,taskId,groupId)
        }
        catch (err) {
            console.log('err update task', err);
        }
    }
    
        

    return (<>
        {
            tasks.map(task => (
                <div className='list-item' key={task._id}>
                    <TaskPreview task={task} onUpdateCell={onUpdateCell} />
                </div>
            ))
        }
    </>
    )
}