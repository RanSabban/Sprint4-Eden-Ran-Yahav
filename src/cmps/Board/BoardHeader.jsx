// import { InviteIcon } from "../../services/svg.service";

// import { Tooltip } from "@mui/material";
import { Avatar, AvatarGroup, Button, EditableHeading, MenuButton, Tab, TabList, Tooltip, } from "monday-ui-react-core";
import { Emoji, Favorite, Invite, Warning } from "monday-ui-react-core/icons";
import { BoardFilter } from "./BoardFilter";

export function BoardHeader() {

    return (
        <section className="board-header-wrapper">
            <div className="board-header-top flex align-center justify-between">
                <div className="board-title-left">
                    <div className="editable-container flex">
                        <Tooltip
                            position="bottom"
                            content='Click to edit'
                            animationType="expand">
                            <EditableHeading
                                type="h2"
                                value='Start from scratch'
                                isEditMode={"true"}
                            />
                            <Tooltip
                                content='Click to edit'
                                animationType="expand">
                            </Tooltip>
                        </Tooltip>

                        <Tooltip
                            content='Show board description'
                            animationType="expand">
                            <Button
                                className="btn-info"
                                kind="tertiary"
                                onClick={() => console.log('m-list')}
                                size="small">
                                <Warning />
                            </Button>
                        </Tooltip>

                        <Tooltip
                            content='Add to favorites'
                            animationType="expand">
                            <Button
                                className="btn-starred"
                                kind="tertiary"
                                onClick={() => console.log('m-list')}
                                size="small">
                                <Favorite />
                            </Button>
                        </Tooltip>

                    </div>
                </div>

                <div className="board-title-right flex">

                    <Button
                        className="btn-avatars"
                        kind="tertiary"
                        onClick={() => console.log('m-list')}
                        size="small"
                    >
                        Activity
                        <AvatarGroup max={2} size="small" className="overlap-images-wrapper">
                            <Avatar
                                className="overlap-image"
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

                    <Tooltip
                        content='Add to favorites'
                        animationType="expand">
                        <Button
                            className="btn-starred"
                            kind="secondary"
                            onClick={() => console.log('m-list')}
                            size="small"
                        >
                            <Invite
                                style={{ marginRight: "4px" }}
                            />Invite
                        </Button>
                    </Tooltip>

                    <Tooltip
                        content='Options'
                        animationType="expand">
                        <MenuButton />
                    </Tooltip>
                </div>
            </div>
                <div className="board-header-bottom flex align-center justify-between">
                <TabList
                    
                    size="sm">
                    <Tab
                        className="main-table-tab"
                       
                        iconSide="left">
                        Main Table
                    </Tab>
                  
                    <Tab >
                        Dashboard
                    </Tab>
                </TabList>
                </div>
            <BoardFilter />
        </section>
    )
}