import { RenderHeaders } from "./RenderHeaders";
import { TaskList } from "./TaskList";
import { GroupPreview } from "./GroupPreview";
import { Table, TableHeader } from "monday-ui-react-core";
import { boardService } from "../../services/board.service.local";
import { Button } from "monday-ui-react-core"
import { addTask } from "../../store/board.actions";


export function GroupList({ clmTypes, groups, onAddTask }) {

    return <section className="group-list">
        {groups.map((group) => {
            return (<section className="group-item" key={group._id}>
                <span>Group Title {group.title}</span>
                {/* <Table> */}
                <section className="header-items">
                    <div className='dyn-cell header-item'>Item</div>
                    <RenderHeaders clmTypes={clmTypes} />
                </section>
                <TaskList tasks={group.tasks} />
                {/* </Table> */}
                <Button variant="contained" onClick={() => onAddTask(group._id)}>Add task</Button>
            </section>)
        })}

    </section >
}