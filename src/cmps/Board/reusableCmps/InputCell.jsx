import { Avatar, AvatarGroup, Button, EditableHeading, MenuButton, MenuDivider, Tab, TabList, Tooltip, EditableText } from "monday-ui-react-core";
import { useState } from "react"

export function InputCell() {

    function handleInput(ev) {
        console.log(ev)

    }


    return (
        <EditableText
            type="text2"
            placeholder="+Add item"
            onChange={(value) => handleInput(value)}
        />
    )
}