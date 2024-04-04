import { RenderHeaders } from "./RenderHeaders";
import { TaskList } from "./TaskList";

export function GroupList({ columns, groups }) {
    // const columns = UseSelector(storeState => storeState.boardModule.columns)
    // console.log(tasks);
    console.log(columns);





    return <section className="group-list">
        {groups.map((group) => {
            return (<section className="group-item" key={group.id}>
                <h1>Group Title {group.title}</h1>
                <RenderHeaders columns={columns} />
                {/* <GroupPreview /> */}
            </section>)
        })}

    </section>
}