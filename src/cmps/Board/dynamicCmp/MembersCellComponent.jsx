import { Fragment, useState, useRef, useEffect } from "react"
import { AvatarGroupAng } from "../reusableCmps/AvatarGroupAang"
import { Chips, Search } from "monday-ui-react-core"
import { loadBoards } from "../../../store/actions/board.actions"
import { AddBtn } from "../../../services/svg.service"


export function MembersCellComponent({ clmType, cell, taskId, groupId, onUpdateCell, setIsEditing }) {
    const [isOpen, setIsOpen] = useState(false)
    const [users, setUsers] = useState(cell.dataId || [])
    const modalRef = useRef()

    useEffect(() => {
        function handleClickOutside(event) {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                setIsOpen(false)
            }
        }

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside)
            setIsEditing(true)
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [isOpen])

    const dynClass = isOpen ? 'flex' : 'none'

    function getUnassignedUsers(allUsers, users) {
        return allUsers.filter(user => !users.includes(user._id))
    }



    async function updateMember(id) {
        try {
            const newAssignedUsers = [...users, id]
            const newCell = { ...cell, dataId: newAssignedUsers }
            onUpdateCell(newCell, taskId, groupId)
            setUsers(newAssignedUsers)
            setIsOpen(false)
        } catch (err) {
            // console.log('Err on assigned member to task', err)
        }
    }

    async function removeMember(id) {
        const newAssignedUsers = users.filter(user => user !== id)
        // console.log("newAssignedUsers", newAssignedUsers);
        try {
            const newCell = { ...cell, dataId: newAssignedUsers }
            // console.log('!!!!!!!1', newCell)
            await onUpdateCell(newCell, taskId, groupId)
            setUsers(newAssignedUsers)
        } catch (err) {
            // console.log('Err on remove member', err)
        }
    }

    if (!clmType) return

    const unassignedUsers = getUnassignedUsers(clmType.data, users)

    return (
        <Fragment>
            <span onClick={() => setIsOpen(!isOpen)} className="dyn-cell members dyn-cell-flexy">
                <AddBtn />
                <AvatarGroupAng users={clmType.data.filter(user => users.includes(user._id))} />
            </span>

            <div ref={modalRef} style={{ display: dynClass }} className={`members-picker`}>
                <div className="arrow" dataplacement="top"></div>


                <div className="chips-div">
                    {users.map((userId) => {
                        const user = clmType.data.find(user => user._id === userId)
                        if (user) {
                            return (
                                <Chips onDelete={() => removeMember(user._id)} key={userId} label={user.fullname} leftAvatar={user.imgUrl} />
                            )
                        }
                    })}
                </div>
                <Search
                    size="Search.sizes.MEDIUM"
                    placeholder="Search names, roles or teams"
                    wrapperClassName="monday-storybook-search_size"
                />
                <p style={{
                    marginLeft: "1.6em",
                    color: "#676879",
                    textAlign: "start",
                    wordBreak: "keep-all",
                    whiteSpace: "nowrap",
                    marginBottom: "0.5em",
                }} className="suggested-people-title">Suggested people</p>

                {unassignedUsers.map((user) => (
                    <button onClick={() => updateMember(user._id)} key={user._id} style={{ width: "4em", display: "flex", flexDirection: "rows", background: "none" }} className="member-option">
                        <img style={{ borderRadius: "50%" }} src={user.imgUrl} alt={user.fullname} className="url" />
                        <div style={{ lineHeight: "3em", color: "#323338" }}>{user.fullname}</div>
                    </button>
                ))}
            </div>
        </Fragment>
    )
}