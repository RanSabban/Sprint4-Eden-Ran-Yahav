// import { InviteIcon } from "../../services/svg.service";

import { Tooltip } from "@mui/material";
import { Avatar, AvatarGroup, Button, EditableHeading } from "monday-ui-react-core";


export function BoardHeader() {

    return (
        <section className="board-header-wrapper">
            <div className="board-header-top flex align-center justify-between">
                <div className="board-title">
                    <div className="editible-container">
                        <Tooltip
                            content='Start from scratch'
                            animationType="expand">
                            <EditableHeading
                                value='Start from scratch'
                            />
                        </Tooltip>
                    </div>
                </div>
                <Button
                    className="btn-avatars"
                    kind="tertiary"
                    onClick={() => console.log('m-list')}
                    size="small"
                >
                    Activity
                    <AvatarGroup max={2} size="small">
                        <Avatar
                            ariaLabel="Eden Gilady"
                            src="https://files.monday.com/euc1/photos/58211317/thumb/58211317-user_photo_2024_04_03_12_43_15.png?1712148195"
                            type="img"
                        />
                        <Avatar
                            ariaLabel="Yahav Ganon"
                            src="https://files.monday.com/euc1/photos/58211325/thumb_small/58211325-user_photo_2024_04_03_12_41_20.png?1712148081"
                            type="img"
                        />
                        <Avatar
                            ariaLabel="Ran Sabban"
                            src="https://files.monday.com/euc1/photos/58211325/thumb_small/58211325-user_photo_2024_04_03_12_41_20.png?1712148081"
                            type="img"
                        />
                    </AvatarGroup>
                </Button>
            </div>
        </section>
    )
}