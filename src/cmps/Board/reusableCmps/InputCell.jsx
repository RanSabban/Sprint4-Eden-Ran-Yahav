import { Avatar, AvatarGroup, Button, EditableHeading, MenuButton, MenuDivider, Tab, TabList, Tooltip, EditableText } from "monday-ui-react-core";
import { useEffect, useState } from "react";

export function InputCell({ txt, onUpdateInput, style, isClear, onAddTaskComplete }) {

    const [txtToShow, setTxtToShow] = useState(txt)
    console.log(isClear);

    useEffect(() => {
        if (isClear){
            setTxtToShow('')
        } 
    },[isClear])

    function handleInput(newTxt) {
        onUpdateInput(newTxt)
    }

    return (
        <EditableText
            type="text2"
            placeholder="+Add item"
            onChange={(newTxt) => handleInput(newTxt)}
            value={txtToShow}
            style={style}
        />
    )
}