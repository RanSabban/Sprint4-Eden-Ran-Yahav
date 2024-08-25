import { Avatar, AvatarGroup } from "monday-ui-react-core";
import { PersonRound } from "monday-ui-react-core/icons";

export function AvatarGroupAng({ users, maxUsers = 2, userSize = 'small', handleChangeMember }) {


    // if (!users.length) return <PersonRound height={'30px'} />
    if (!users.length) return <Avatar
        // ariaLabel={user.fullname}
        src='https://cdn.monday.com/icons/dapulse-person-column.svg'
        type="img"
        size="small"
    // key={user._id}
    />

    return (
        <AvatarGroup className="avatar-group" max={maxUsers} size={userSize}
        >

            {
                users.map(user => (
                    <Avatar
                        ariaLabel={user.fullname}
                        src={user.imgUrl}
                        type="img"
                        key={user._id}
                        size={userSize}
                        onClick={() => handleChangeMember(user)}
                    />
                ))
            }
        </AvatarGroup>

    )
}