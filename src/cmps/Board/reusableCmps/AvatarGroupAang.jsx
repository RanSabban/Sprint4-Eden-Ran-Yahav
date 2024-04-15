import { Avatar, AvatarGroup } from "monday-ui-react-core";
import { PersonRound } from "monday-ui-react-core/icons";

export function AvatarGroupAng({ users }) {


    // if (!users.length) return <PersonRound height={'30px'} />
    if (!users.length) return <Avatar
        // ariaLabel={user.fullname}
        src='https://cdn.monday.com/icons/dapulse-person-column.svg'
        type="img"
        size="small"
    // key={user._id}
    />

    return (
        <AvatarGroup className="avatar-group" max={2} size="small">

            {
                users.map(user => (
                    <Avatar
                        ariaLabel={user.fullname}
                        src={user.imgUrl}
                        type="img"
                        key={user._id}
                    />
                ))
            }
        </AvatarGroup>

    )
}