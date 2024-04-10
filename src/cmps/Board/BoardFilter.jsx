import { Avatar, Button, MenuItem, SearchComponent, SplitButton, SplitButtonMenu, Tooltip } from "monday-ui-react-core";
import { Filter, PersonRound, Search, Sort } from "monday-ui-react-core/icons";
import { useState } from "react";

export function BoardFilter({ onAddGroup, boardId }) {

    const [isSearch, setIsSearch] = useState(false)

    const dynSearchBtn = isSearch ? '' : 'searchBtn'

    function toggleIsSearch() {
        setIsSearch(!isSearch)
    }

    return (
        <section className="board-filter flex">



            <SplitButton
                shouldCloseOnClickInsideDialog
                onClick={console.log("Add Item Click")}
                size="small"

                secondaryDialogContent={
                    <SplitButtonMenu _id="split-menu">
                        <MenuItem
                            onClick={() => onAddGroup(boardId)}
                            title="New group of tasks"
                        />
                    </SplitButtonMenu>}>New Item

            </SplitButton>

            {isSearch ? (
                <Button
                    className="icon"
                    onBlur={() => toggleIsSearch()}
                    leftIcon={Search}
                    kind="tertiary"
                    style={{ marginRight: "6px", marginLeft: "6px" }}
                    size="small">
                    <span style={{ marginLeft: "-6px" }}>Search</span>
                </Button>

            ) : (
                <SearchComponent
                    id="search-input"
                    onBlur={() => toggleIsSearch()}
                    autoFocus
                    debounceRate={200}
                    leftIcon={Search}
                    placeholder="Search"
                    size="small"
                    wrapperClassName="dyn-search"
                />)
            }


            <Tooltip content='Sort board by person' animationType="expand">
                <Button
                    className="icon"
                    leftIcon={PersonRound}
                    kind="tertiary"
                    size="small"
                    style={{ marginRight: "6px" }}
                >
                    <span>Person</span>
                </Button>
            </Tooltip>

            <Tooltip content='Filter board by anything' animationType="expand">
                <Button
                    className="icon"
                    leftIcon={Filter}
                    kind="tertiary"
                    style={{ marginRight: "6px" }}
                    size="small">
                    <span>Filter</span>
                </Button>
            </Tooltip>


            <Tooltip content='Sort board by any column' animationType="expand">
                <Button
                    className="icon"
                    leftIcon={Sort}
                    kind="tertiary"
                    style={{ marginRight: "6px" }}
                    size="small">
                    <span>Sort</span>
                </Button>

            </Tooltip>

        </section>
    )
}