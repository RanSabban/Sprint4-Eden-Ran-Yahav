import { RenderHeaders } from "./RenderHeaders";
import { TaskList } from "./TaskList";
import { GroupPreview } from "./GroupPreview";
import { Table, TableHeader } from "monday-ui-react-core";
import { boardService } from "../../services/board.service.local";
import { Button } from "monday-ui-react-core"
import { addTask } from "../../store/board.actions";
import { showErrorMsg, showSuccessMsg } from "../../services/event-bus.service";
import { removeGroup } from "../../store/board.actions";


export function GroupList({ clmTypes, groups, onAddTask }) {

    async function onRemoveGroup(groupId) {
        try {
            console.log(groupId);
            await removeGroup(groupId)
            showSuccessMsg('Group removed')
        } catch (err) {
            console.log('cannot remove group', err); 
            showErrorMsg('Error remove group')
        }
    }

    return <section className="group-list">
        {groups.map((group) => {
            return (<section className="group-item" key={group._id}>
                <span className="group-title">{group.title}</span>
                <Button onClick={() => onRemoveGroup(group._id)}>X</Button>
                {/* <Table> */}
                <section className="header-items">
                    <div className='dyn-cell header-item'>Item</div>
                    <RenderHeaders clmTypes={clmTypes} />
                </section>
                <TaskList tasks={group.tasks} groupId = {group._id} />
                {/* </Table> */}
                <Button variant="contained" onClick={() => onAddTask(group._id)}>Add task</Button>
            </section>)
        })}

    </section >
}