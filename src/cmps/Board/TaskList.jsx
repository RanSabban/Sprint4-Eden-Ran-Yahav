import { TaskPreview } from './TaskPreview'

export function TaskList({ tasks }) {


    return (<>
        {
            tasks.map(task => (
                <ul key={task._id}>
                    <TaskPreview task={task} />
                </ul>
            ))
        }
    </>
    )
}