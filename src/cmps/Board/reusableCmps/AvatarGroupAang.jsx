import { Avatar, AvatarGroup } from "monday-ui-react-core";

export function AvatarGroupAng({ users }) {


    return (
        <AvatarGroup className="avatar-group" max={2} size="small">

            {
                users.map(user => (
                    <Avatar
                        ariaLabel={user.fullname}
                        src={user.imgUrl}
                        type="img"
                    />
                ))
            }
        </AvatarGroup>

    )
}