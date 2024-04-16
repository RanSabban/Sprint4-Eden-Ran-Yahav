import { useState } from "react";

export function EditableHeaderTitle({txt, onUpdateInput, setIsEditMode, clmId}) {
    const [isEditingTxt, setIsEditingTxt] = useState(false);
    const [content, setContent] = useState(txt);

    const handleSpanClick = () => {
        setIsEditingTxt(true)
        setIsEditMode(true)
    }

    const handleInputBlur = async () => {
        setIsEditingTxt(false)
        setIsEditMode(false)

        if (content)
            try {
                await onUpdateInput(content,clmId);
            } catch (err) {
                console.error('Error updating content:', err);
            }
    };

    const handleInputChange = (e) => {
        setContent(e.target.value);
    };

    const handleInputKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.target.blur(); // This triggers handleInputBlur
        }
    };

    return (
        <div className="editable-container-title-header">
            {!isEditingTxt ? (
                <span onClick={handleSpanClick} className="editable-title-header-cmp-span">
                    {content}
                </span>
            ) : (
                <input
                    type="text"
                    className="editable-title-header-input"
                    value={content}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    onKeyDown={handleInputKeyDown}
                    autoFocus
                />
            )}
        </div>
    );
}
