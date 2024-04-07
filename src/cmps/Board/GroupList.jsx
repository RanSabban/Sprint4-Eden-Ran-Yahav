import { RenderHeaders } from "./RenderHeaders";
import { TaskList } from "./TaskList";
import { GroupPreview } from "./GroupPreview";
import { Menu, MenuButton, MenuItem } from "monday-ui-react-core";
import { boardService } from "../../services/board.service.local";
import { Button } from "monday-ui-react-core"
import { addGroup, addTask } from "../../store/board.actions";
import { showErrorMsg, showSuccessMsg } from "../../services/event-bus.service";
import { removeGroup } from "../../store/board.actions";
import { AddSmall, Delete, Edit, Favorite, Moon } from "monday-ui-react-core/icons";


export function GroupList({ clmTypes, groups, onAddTask, boardType, boardId }) {

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

    async function onAddGroup() {
        try {
            const group = await addGroup(boardId)
            console.log(group);
            showSuccessMsg('Group added')
        } catch (err) {
            console.log('Err add group', err);
            showErrorMsg('Nono')
        }
    }


    return <section className="group-list">
        {groups.map((group) => {
            return (<section className="group-item" key={group._id}>
                <section className="group-header">
                    <MenuButton>
                        <Menu id="menu" size={Menu.sizes.LARGE}>
                            <MenuItem icon={AddSmall} title="Add group" onClick={() => onAddGroup()} />
                            {/* <MenuItem icon={Edit} title="And the stars" /> */}
                            <MenuItem icon={Delete} title="Delete" onClick={() => onRemoveGroup(group._id)} />
                        </Menu>
                    </MenuButton>
                    <span className="group-title">{group.title}</span>
                </section>
                {/* <Button onClick={() => onRemoveGroup(group._id)}>X</Button> */}
                {/* <Table> */}
                <section className="header-items">
                    <div className='dyn-cell header-item'>{boardType}</div>
                    <RenderHeaders clmTypes={clmTypes} />
                </section>
                <TaskList tasks={group.tasks} groupId={group._id} />
                {/* </Table> */}
                <Button variant="contained" onClick={() => onAddTask(group._id)}>Add task</Button>
            </section>)
        })}

    </section >
}

