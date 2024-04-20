import { formatDistanceToNow } from 'date-fns';
import { useParams } from "react-router";
import { Avatar, Button, EditableHeading, Menu, MenuButton, MenuDivider, MenuItem, Tab, TabList, Tooltip, } from "monday-ui-react-core";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { CloseIcon, DetailsIcon, EmailIcon, HouseIcon, TimerSvg } from "../services/svg.service";
import { useState } from "react";
import { updateTask } from "../store/actions/board.actions";

export function Activity() {
    const { taskId, boardId } = useParams()
    const [txtToUpdate, setTxtToUpdate] = useState('')
    const [taskMsg, setTaskMsg] = useState({ id: '', msg: '', by: { _id: '' } })
    let user = useSelector(storeState => storeState.userModule.loggedInUser)
    console.log('user maybe:', user);

    const { task, groupId } = useSelector(storeState => {
        const groups = storeState.boardModule.board.groups || [];
        for (let group of groups) {
            for (let task of group.tasks) {
                if (task._id === taskId) {
                    // Directly return from here if a match is found
                    return { task, groupId: group._id };
                }
            }
        }
        // Return a consistent object structure, even when no task is found
        return { task: null, groupId: null };
    });

    function handleChange({ target }) {
        const { name: field, value } = target
        setTaskMsg(prevCreds => ({ ...prevCreds, [field]: value }))
    }

    function onSubmit(ev) {
        ev.preventDefault();

        // Prepare the new task message
        const newTaskMsg = {
            ...taskMsg,
            id: user._id,
            createdAt: Date.now(),
            by: {
                _id: user._id,
                imgUrl: user.imgUrl,
                fullname: user.fullname

            }
        };

        // Check if the task messages array exists, if not, initialize it
        if (!task.msgs) {
            task.msgs = [];
        }

        // Push the new message into the task messages array
        task.msgs.push(newTaskMsg);

        // Call the updateTask function to update the task
        updateTask(task, groupId, boardId)
            .then(() => {
                // Optionally, display a success message
                console.log('Your message was added successfully.');
                // showSuccessMsg('Your msg added');
            })
            .catch((err) => {
                // Optionally, display an error message
                console.error('Could not add your message.', err);
                // showErrorMsg('Cannot add your msg');
            });

        // Reset the task message input fields
        setTaskMsg({ id: '', msg: '', by: { _id: '' } });
    }

    console.log('task please', task)

    if (!task) {
        return <div>Loading task or task not found...</div>
    }

    return (
        <section style={{ zIndex: '11111111' }} className="activity-container">
            <div className="upper-details">
                <Link to={`/board/${boardId}`} className="close-details"><CloseIcon /></Link>
                <div className="upper-details-actions">
                    <div className="actions-list">
                        <section className="activity-input-container">
                            <input value={task.title} type="text" className="input-details" onChange={handleChange} />
                        </section>
                        <section className='right-top' >
                            {task && task.createdBy ? (
                                <Avatar
                                    style={{ maxWidth: '30px', maxHeight: '30px' }}
                                    src={task.createdBy.imgUrl || 'fallback-image-url-here'}
                                    type="img"
                                />
                            ) : (
                                <img style={{ width: '30px', height: '30px', borderRadius: '50%' }} src="https://res.cloudinary.com/dkvliixzt/image/upload/v1704358773/person-empty_zckbtr_wrffbw.svg" href="" />
                            )}
                            <div>
                                <DetailsIcon />
                            </div>
                        </section>
                    </div>

                    <section style={{ marginLeft: "2.25em" }} className="panel-subjects flex">
                        <HouseIcon />
                        <button className="details-option">Updates</button>
                        <button className="details-option">Files</button>
                        <button className="details-option">Activity Log</button>
                    </section>
                    <MenuDivider />

                </div>


            </div>
            <div className="lower-details">
                <form className='add-msg' onSubmit={onSubmit}>
                    <input value={taskMsg.msg} name="msg" type="text" onChange={(e) => handleChange(e)} placeholder="Write an update..." className="input-details2" />
                    <button type="submit" className="btn-clrblue">Update</button>
                </form>

                <div className="send-update-wrapper">
                    <EmailIcon />
                    <span className="regular-msg">Write updates via email</span>
                </div>

                <ul className="activity-updates-containers">
                    {(task.msgs) ? task.msgs.map((msg) => (
                        <li className="task-msg-preview" key={msg.id}>
                            <section className='avatar-date'>
                                <div className='avatar-name'>
                                    <Avatar
                                        style={{ maxWidth: '20px', maxHeight: '20px' }}
                                        src={msg.by.imgUrl || 'fallback-image-url-here'}
                                        type="img"
                                    />

                                    {msg.by.fullname}
                                </div>
                                <div className='time-task'>
                                    <TimerSvg />
                                    {formatDistanceToNow(new Date(msg.createdAt), { addSuffix: true })}
                                </div>
                            </section>
                            <span style={{ marginLeft: '1.5em' }}>
                                {msg.msg}
                            </span>
                        </li>
                    )) : <div className="no-updates"><img style={{ width: '26em' }} src="https://myday-p034.onrender.com/img/no-updates.svg" alt="" /><div className="post-not-found-txt"><h2 style={{ margin: '1em 0' }}>No Updates yet for this item</h2><p className="post-not-found-subtitle">Be the first one to update about progress, mention someone<br />or upload files to share with your team members</p></div></div>}
                </ul>

            </div>
        </section>
    )
}
