import { TasksPreview } from "./TasksPreview";
export function BoardPreview({ board }) {
    console.log(board.groups);
    const groups = board.groups



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
                                <TaskPreview task={task} />
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