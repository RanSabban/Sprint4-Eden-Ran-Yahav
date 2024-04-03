import {InviteIcon, MyWork} from '../../services/svg.service.jsx'

export function BoardHeader() {

    return (
        <section className="board-header-wrapper">
            <div className="board-header-top flex">
                <h2>Start from scratch</h2>
                {/* <ActivityMembers/> */}
        <InviteIcon/>
        <InfoIcon/>
            </div>
        </section>
    )
}