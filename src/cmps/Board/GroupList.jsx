import { RenderHeaders } from "./RenderHeaders";
import { TaskList } from "./TaskList";
import { GroupPreview } from "./GroupPreview";
import { Table, TableHeader } from "monday-ui-react-core";

export function GroupList({ clmTypes, groups }) {
    // const columns = UseSelector(storeState => storeState.boardModule.columns)
    // console.log(tasks);
    console.log(clmTypes);





    return <section className="group-list">
        {groups.map((group) => {
            return (<section className="group-item" key={group._id}>
                <span>Group Title {group.title}</span>
                {/* <Table> */}
                <section className="header-items">
                    <RenderHeaders clmTypes={clmTypes} />
                </section>
                <TaskList tasks={group.tasks} />
                {/* </Table> */}
            </section>)
        })}

    </section >
}