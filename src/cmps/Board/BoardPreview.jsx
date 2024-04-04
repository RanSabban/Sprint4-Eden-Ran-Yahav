import { GroupList } from "./GroupList";
import { RenderHeaders } from "./RenderHeaders";

export function BoardPreview({ board }) {

    const groups = board.groups
    const clmTypes = board.clmTypes


    if (!board) return <div>LOADING</div>
    return (
        <section className="board-preview">
            {/* <h2>I am Board Preview</h2> */}

            {
                groups.map((group) => {
                    // const tasks = group.tasks
                    return (<section className="group-container" key={group._id}>
                        <GroupList clmTypes={clmTypes} groups={groups} />
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