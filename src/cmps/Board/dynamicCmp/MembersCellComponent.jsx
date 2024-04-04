import { AvatarGroupAng } from "../reusableCmps/AvatarGroupAang";

export function MembersCellComponent({ClmType,cell}) {

    console.log(ClmType,cell);
    const assignedUsers = cell.dataId
    console.log(assignedUsers);

    function getUsers(){
        const clmTypeObj = ClmType[0]
        const users = clmTypeObj.data.filter(user => {
            const id = user._id
            console.log(user);
            for (var i = 0; i < assignedUsers.length; i++) {
                if (assignedUsers[i] === user._id) return {fullname: user.fullname, imgUrl: user.imgUrl}
            }
            console.log(assignedUsers);
        })
        return users
    }



    return (
        <span><AvatarGroupAng users= {getUsers()} /></span>
    )
}