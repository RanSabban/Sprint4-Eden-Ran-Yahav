import { useParams } from "react-router";
// import { Avatar, AvatarGroup } from "monday-ui-react-core";
import { Avatar, AvatarGroup, Button, EditableHeading, Menu, MenuButton, MenuDivider, MenuItem, Tab, TabList, Tooltip, } from "monday-ui-react-core";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";



export function Activity() {
    const { taskId } = useParams()
    const currBoard = useSelector(state => state.boardModule.board)
    console.log(currBoard)

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

    console.log('task please', task)

    if (!task) {
        return <div>Loading task or task not found...</div>
    }

    return (
        <section style={{zIndex: '11111111'}} className="activity-container">
            <div className="upper-details">
                <Link to={`/board/${currBoard._id}`} className="close-details">X</Link>
                <div className="upper-details-actions">
                    <div style={{ flexDirection: 'row', justifyContent: "space-between" }} className="flex">
                        <input value={task.title} type="text" className="input-details" />
                        {task && task.createdBy ? (
                            <Avatar
                                style={{ width: '32px' }}
                                src={task.createdBy.imgUrl || 'fallback-image-url-here'}
                                type="img"
                                key={task._id}
                            />
                        ) : (
                            // Optionally render a placeholder or nothing while data is loading
                            // <div style={{lineHeight: '3em'}}>Loading...</div>
                            <img style={{ lineHeight: '3em', width: '32px', height: '32px', borderRadius: '50%' }} src="https://res.cloudinary.com/dkvliixzt/image/upload/v1704358773/person-empty_zckbtr_wrffbw.svg" href="" />
                        )}
                        <div style={{ lineHeight: "3.5em", marginRight: "2em" }} > <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M6 10.5C6 11.3284 5.32843 12 4.5 12C3.67157 12 3 11.3284 3 10.5C3 9.67157 3.67157 9 4.5 9C5.32843 9 6 9.67157 6 10.5Z"></path><path d="M11.8333 10.5C11.8333 11.3284 11.1618 12 10.3333 12C9.50492 12 8.83334 11.3284 8.83334 10.5C8.83334 9.67157 9.50492 9 10.3333 9C11.1618 9 11.8333 9.67157 11.8333 10.5Z"></path><path d="M17.6667 10.5C17.6667 11.3284 16.9951 12 16.1667 12C15.3383 12 14.6667 11.3284 14.6667 10.5C14.6667 9.67157 15.3383 9 16.1667 9C16.9951 9 17.6667 9.67157 17.6667 10.5Z"></path></svg> </div>
                    </div>

                    <section style={{ marginLeft: "3.4em" }} className="panel-subjects flex"><button className="details-option"><svg style={{ position: 'absolute', left: "2.4em", top: '8em' }} width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M9.56992 2.1408C9.82591 1.95307 10.1741 1.95307 10.4301 2.1408L17.7028 7.47413C17.8896 7.61113 18 7.82894 18 8.06061V16.7879C18 17.1895 17.6744 17.5152 17.2727 17.5152H11.9394C11.5377 17.5152 11.2121 17.1895 11.2121 16.7879V13.1515H8.78788V16.7879C8.78788 17.1895 8.46227 17.5152 8.06061 17.5152H2.72727C2.32561 17.5152 2 17.1895 2 16.7879V8.06061C2 7.82894 2.11037 7.61113 2.29719 7.47413L9.56992 2.1408ZM3.45455 8.42914V16.0606H7.33333V12.4242C7.33333 12.0226 7.65894 11.697 8.06061 11.697H11.9394C12.3411 11.697 12.6667 12.0226 12.6667 12.4242V16.0606H16.5455V8.42914L10 3.62914L3.45455 8.42914Z"></path></svg>Updates</button><button className="details-option">Files</button><button className="details-option">Activity Log</button></section>
                    <MenuDivider />

                </div>


            </div>
            <div className="lower-details">
                <input type="text" placeholder="Write an update..." className="input-details2" />
                <div className="send-update-wrapper" style={{ textAlign: "end", marginRight: "1em", marginBottom: '4em' }}>
                    <svg viewBox="0 0 20 20" fill="currentColor" width="26" height="26" aria-hidden="true" className="Icon-module_icon" data-testid="icon"><path d="M3 4.25C2.58579 4.25 2.25 4.58579 2.25 5V15C2.25 15.4142 2.58579 15.75 3 15.75H17C17.4142 15.75 17.75 15.4142 17.75 15V5C17.75 4.58579 17.4142 4.25 17 4.25H3ZM3.75 6.71589V14.25H16.25V6.71591L11.802 10.1371C11.2854 10.5346 10.6518 10.75 10 10.75C9.3482 10.75 8.71468 10.5346 8.19805 10.1371L3.75 6.71589ZM15.0455 5.75H4.95456L9.1126 8.94818L9.11265 8.94821C9.36706 9.14393 9.67903 9.25004 10 9.25004C10.321 9.25004 10.633 9.14393 10.8874 8.94821L10.8874 8.94818L15.0455 5.75Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                    <span className="regular-msg">Write updates via email</span>
                </div>
                <div className="no-updates"><img style={{ width: '26em' }} src="https://myday-p034.onrender.com/img/no-updates.svg" alt="" /><div className="post-not-found-txt"><h2 style={{ margin: '1em 0' }}>No Updates yet for this item</h2><p className="post-not-found-subtitle">Be the first one to update about progress, mention someone<br />or upload files to share with your team members</p></div></div>
            </div>
        </section>
    )
}
