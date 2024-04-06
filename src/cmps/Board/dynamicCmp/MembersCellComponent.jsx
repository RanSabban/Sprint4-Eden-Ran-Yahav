import { AvatarGroupAng } from "../reusableCmps/AvatarGroupAang";

export function MembersCellComponent({clmType,cell}) {

    // console.log(clmType,cell);
    const assignedUsers = cell.dataId
    // console.log(assignedUsers);

    function getUsers(){
        const clmTypeObj = clmType[0]
        const users = clmTypeObj.data.filter(user => {
            const id = user._id
            // console.log(user);
            for (var i = 0; i < assignedUsers.length; i++) {
                if (assignedUsers[i] === user._id) return {fullname: user.fullname, imgUrl: user.imgUrl}
            }
            // console.log(assignedUsers);
        })
        return users
    }



    return (
        <span className="dyn-cell members"><AvatarGroupAng users= {getUsers()} /></span>
    )
}