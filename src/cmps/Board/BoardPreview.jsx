import { TasksPreview } from "./TasksPreview";
export function BoardPreview({ board }) {
    console.log(board);
    console.log(board.groups);
    const groups = board.groups


    if (!board) return <div>LOADING</div>
    return (
        <section className="book-preview">
            <h2>I am Board Preview</h2>

            {
                groups.map((group) => {
                    const tasks = group.tasks
                    return ( <section className="group-item" key={group.id}>
                        {/* GROUP HEADER CMP WITH BOARD TYPES */}
                    <h2>Group Title: {group.title}</h2>
                        {/* {tasks.map(task => {
                            return (        
                            <li key={task.id}>   
                                <TasksPreview task={task} />
                            </li>
                            )
                           
                        })} */}
                        <TasksPreview tasks={tasks} />
                         </section>
                    )
                })
            }
        </section>
    )
    // return (
    //     // <section className="book-preview">
    //     //     {/* <h2>I am Book Preview</h2> */}
    //     // </section>
    // )
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