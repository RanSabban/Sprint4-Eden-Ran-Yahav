import { useEffect, useState } from "react";

// not in use

export function EditableLabelInput({ txt, labelId, onFocus, onUpdateLabelTitle, handleBlur,setFocusedId }) {
    const [isEditingTxt, setIsEditingTxt] = useState(false);
    const [content, setContent] = useState(txt);

    useEffect(() => {
        setContent(txt)
    }, [txt])

    const handleSpanClick = () => {
        setIsEditingTxt(true)
    }

    const handleInputChange = (e) => {
        setContent(e.target.value);
    };

    async function handleInputKeyDown(e) {
        if (e.key === 'Enter' && content) {
            try {
                await onUpdateLabelTitle(labelId,content)
                setFocusedId('')
            } catch (err) {
                console.error('Error updating content:', err)
            }
        }
    }



    return (
        <input
            className="label-edit-input"
            value={content}
            onFocus={() => onFocus(labelId)}
            onBlur={handleBlur}
            onSubmit={() => onUpdateLabelTitle(labelId)}
            onInput={handleInputChange}
            onKeyDown={handleInputKeyDown}
        />
    )
}