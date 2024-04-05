import { TaskPreview } from './TaskPreview'

export function TaskList({ tasks }) {


    return (<>
        {
            tasks.map(task => (
                <div className='list-item' key={task._id}>
                    <TaskPreview task={task} />
                </div>
            ))
        }
    </>
    )
}