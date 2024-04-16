import { useParams } from "react-router";
// import { Avatar, AvatarGroup } from "monday-ui-react-core";
import { Avatar, AvatarGroup, Button, EditableHeading, Menu, MenuButton, MenuDivider, MenuItem, Tab, TabList, Tooltip, } from "monday-ui-react-core";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { CloseIcon, DetailsIcon, EmailIcon, HouseIcon } from "../services/svg.service";
import { useState } from "react";



export function Activity() {
    const { taskId } = useParams()
    const currBoard = useSelector(state => state.boardModule.board)
    console.log(currBoard)
    const [txtToUpdate, setTxtToUpdate] = useState('')

    const task = useSelector(storeState => {
        for (let group of storeState.boardModule.board.groups) {
            for (let task of group.tasks) {
                if (task._id === taskId) {
                    return task
                }
            }
        }
        return null
    })

    function handleChange({ target }) {
        setTxtToUpdate(target.value)
        console.log(txtToUpdate);
    }

    function onSubmit(ev) {
        ev.preventDefault()
    }

    console.log('task please', task)

    if (!task) {
        return <div>Loading task or task not found...</div>
    }

    return (
        <section style={{ zIndex: '11111111' }} className="activity-container">
            <div className="upper-details">
                <Link to={`/board/${currBoard._id}`} className="close-details"><CloseIcon /></Link>
                <div className="upper-details-actions">
                    <div className="actions-list">
                        <section className="activity-input-container">
                            <input value={task.title} type="text" className="input-details" onChange={handleChange} />
                            <button onClick={onSubmit}>Submit</button>
                        </section>
                        {task && task.createdBy ? (
                            <Avatar
                                style={{ width: '32px' }}
                                src={task.createdBy.imgUrl || 'fallback-image-url-here'}
                                type="img"
                                key={task._id}
                            />
                        ) : (
                            <img style={{ lineHeight: '3em', width: '32px', height: '32px', borderRadius: '50%' }} src="https://res.cloudinary.com/dkvliixzt/image/upload/v1704358773/person-empty_zckbtr_wrffbw.svg" href="" />
                        )}
                        <div style={{ lineHeight: "3.5em", marginRight: "2em" }} > <DetailsIcon /></div>
                    </div>

                    <section style={{ marginLeft: "3.4em" }} className="panel-subjects flex"><button className="details-option"><HouseIcon />Updates</button><button className="details-option">Files</button><button className="details-option">Activity Log</button></section>
                    <MenuDivider />

                </div>


            </div>
            <div className="lower-details">
                <input type="text" placeholder="Write an update..." className="input-details2" />
                <div className="send-update-wrapper">
                    <EmailIcon />
                    <span className="regular-msg">Write updates via email</span>
                </div>
                <div className="no-updates"><img style={{ width: '26em' }} src="https://myday-p034.onrender.com/img/no-updates.svg" alt="" /><div className="post-not-found-txt"><h2 style={{ margin: '1em 0' }}>No Updates yet for this item</h2><p className="post-not-found-subtitle">Be the first one to update about progress, mention someone<br />or upload files to share with your team members</p></div></div>
            </div>
        </section>
    )
}
