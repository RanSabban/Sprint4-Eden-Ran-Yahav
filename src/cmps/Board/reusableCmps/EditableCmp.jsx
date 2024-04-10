import React, { useState } from "react"


export function EditableCmp({txt,onUpdateInput}) {

    const [isEditable,setIsEditable] = useState(false)
    const [txtToShow, onSetTxtToShow] = useState('')
    // const [onClickTxt, setOnClickTxt] = useState(false)

    function handleChange({target}) {
        const { value } = target
        onSetTxtToShow(value)
    }

    console.log(isEditable);



    return (
        <div className="editable-cmp-container" >
            
            {isEditable ? <input className="editable-cmp-input" value={txtToShow} onInput={onUpdateInput}></input> :  <span onClick={() => (setIsEditable((!isEditable)))} className="editable-cmp-txt">{txt}</span>}
        </div>
    )
}