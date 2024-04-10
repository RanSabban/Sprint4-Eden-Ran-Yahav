import { Fragment, useState, useRef, useEffect } from "react"
import { AvatarGroupAng } from "../reusableCmps/AvatarGroupAang"
import { Chips, Search } from "monday-ui-react-core"
import { loadBoards } from "../../../store/actions/board.actions"


export function MembersCellComponent({ clmType, cell, taskId, groupId, onUpdateCell }) {
    const [isOpen, setIsOpen] = useState(false)
    const modalRef = useRef()

    useEffect(() => {
        function handleClickOutside(event) {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                setIsOpen(false)
            }
        }

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside)
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [isOpen])

    const dynClass = isOpen ? 'block' : 'none'

    const assignedUsers = cell.dataId || []

    function getUnassignedUsers(allUsers, assignedUsers) {
        return allUsers.filter(user => !assignedUsers.includes(user._id))
    }

    const unassignedUsers = getUnassignedUsers(clmType.data, assignedUsers)

    async function updateMember(id) {
        try {
            assignedUsers.push(id)
            const newcell = { ...cell, dataId: assignedUsers }
            await onUpdateCell(newcell, taskId, groupId)
            loadBoards()

        } catch (err) {
            console.log('Err on assigned member to task', err)
        }
    }

    async function removeMember(id) {
        const index = assignedUsers.indexOf(id)
        const newAssignedUsers = [...assignedUsers]
        newAssignedUsers.splice(index, 1)
        const newCell = { ...cell, dataId: newAssignedUsers }
        try {
            console.log('!!!!!!!1', newCell)
            await onUpdateCell(newCell, taskId, groupId)
            loadBoards()
            console.log(newCell, taskId, groupId)

        } catch (err) {
            console.log('Err on remove member', err)
        }
    }

    return (
        <Fragment>
            <span onClick={() => setIsOpen(!isOpen)} className="dyn-cell members dyn-cell-flexy">
                <AvatarGroupAng users={clmType.data.filter(user => assignedUsers.includes(user._id))} />
            </span>

            <div ref={modalRef} style={{ display: dynClass }} className={`members-picker`}>
                <div className="chips-div">
                    {assignedUsers.map((userId) => {
                        const user = clmType.data.find(user => user._id === userId)
                        return (
                            <Chips onDelete={() => removeMember(user._id)} key={userId} label={user.fullname} leftAvatar={user.imgUrl} />
                        )
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
                    marginBottom: "0.5em"
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