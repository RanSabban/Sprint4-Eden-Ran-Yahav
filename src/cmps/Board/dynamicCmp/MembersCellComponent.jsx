import { AvatarGroupAng } from "../reusableCmps/AvatarGroupAang";
import { Avatar, AvatarGroup, DialogContentContainer, Search, Text, Chips } from "monday-ui-react-core";
import { Favorite, Invite, AddSmall, Integrations, Robot, DropdownChevronUp, DropdownChevronDown, Info, Sun, Moon } from "monday-ui-react-core/icons";



export function MembersCellComponent({ clmType, cell }) {

    console.log('cell cell', cell)
    console.log('cell cell', clmType)

    // console.log(clmType,cell);
    const assignedUsers = cell.dataId
    // console.log(assignedUsers);

    function getUsers() {

        const users = clmType.data.filter(user => {
            const id = user._id
            // console.log(user);
            for (var i = 0; i < assignedUsers.length; i++) {
                if (assignedUsers[i] === user._id) return { fullname: user.fullname, imgUrl: user.imgUrl, id: user._id }
            }
            // console.log(assignedUsers);
        })
        return users
    }

    const users = getUsers()

    return (
        <div>
            <span className="dyn-cell members"><AvatarGroupAng users={users} /></span>

            {/* <div style={{ position: 'absolute',left: '0', top: '1em',display: 'flex', flexDirection: 'column' }}>
                <div style={{display: 'flex'}}>
                {users.map((user) => (
                    <Chips label={user.fullname} leftAvatar={user.imgUrl} />
                ))}
                </div>
                <Search
                    size="Search.sizes.MEDIUM"
                    placeholder=" Search"
                    wrapperClassName="monday-storybook-search_size"
                />
                <p style={{
                    wordBreak: "keep-all",
                    whiteSpace: "nowrap"
                }} className="suggested-people-title">Suggested people</p>
                {users.map((user) => (
                    <button style={{width: "4em"}} className="member-option">{<img src={user.imgUrl} alt="" className="url" />} {user.fullname}</button>
                ))}
            </div> */}

        </div >
    )
}