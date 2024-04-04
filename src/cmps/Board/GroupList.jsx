import { RenderHeaders } from "./RenderHeaders";
import { TaskList } from "./TaskList";
import { GroupPreview } from "./GroupPreview";

export function GroupList({ clmTypes, groups }) {
    // const columns = UseSelector(storeState => storeState.boardModule.columns)
    // console.log(tasks);
    console.log(clmTypes);





    return <section className="group-list">
        {groups.map((group) => {
            return (<ul className="group-item" key={group.id}>
                <span>Group Title {group.title}</span>
                <RenderHeaders clmTypes={clmTypes} />
                <TaskList tasks = {group.tasks} />
            </ul>)
        })}

    </section>
}