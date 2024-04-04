import { AvatarIcon } from "../services/svg.service";

export function UserImg({user}){

    return (
        <>
        {!user.imgUrl ? (
            <AvatarIcon user={user.fullname}/>
            ) : (
            <AvatarIcon user={user.imgUrl}/>
        )}
        </>
    )
}