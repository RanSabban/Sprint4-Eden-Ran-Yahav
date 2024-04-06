import { Avatar, AvatarGroup, Button, EditableHeading, MenuButton, MenuDivider, Tab, TabList, Tooltip, EditableText } from "monday-ui-react-core";

export function InputCell({ txt, onUpdateInput }) {

    function handleInput(newTxt) {
        onUpdateInput(newTxt)
    }

    return (
        <EditableText
            type="text2"
            placeholder="+Add item"
            onChange={(newTxt) => handleInput(newTxt)}
            value={txt}
        />
    )
}