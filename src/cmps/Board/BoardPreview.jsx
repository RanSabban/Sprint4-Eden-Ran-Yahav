import { GroupList } from "./GroupList";
import { RenderHeaders } from "./RenderHeaders";

export function BoardPreview({ board }) {
    console.log(board);
    console.log(board.groups);
    const groups = board.groups
    const columns = board.columns


    if (!board) return <div>LOADING</div>
    return (
        <section className="board-preview">
            <h2>I am Board Preview</h2>

            {
                groups.map((group) => {
                    const tasks = group.tasks
                    return (<section className="group-item" key={group.id}>
                        <GroupList columns={columns} groups={groups} />
                    </section>
                    )
                })
            }
        </section>
    )
}
// const BoardContainer = () => {
//     const columns = useSelector(state => state.columns);
//     const tasksByColumnId = useSelector(state => state.tasksByColumnId);

//     return (
//         <div className="board">
//             {columns.map(column => (
//                 <ColumnComponent
//                     key={column.id}
//                     columnName={column.name}
//                     tasks={tasksByColumnId[column.id]}
//                 />
//             ))}
//         </div>
//     );
// };

{/* {tasks.map(task => {
                            return (        
                            <li key={task.id}>   
                                <TasksPreview task={task} />
                            </li>
                            )
                           
                        })} */}