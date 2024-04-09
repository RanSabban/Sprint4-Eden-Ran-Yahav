
export function EditableText({textToEdit}) {
    const editableTextRef = useRef(null)
    const [isEditable, setIsEditable] = useState(false)



    return (
        <div
            ref={editableTitleRef}
            contentEditable={isEditable}
            onClick={handleClick}
            className="editable-title"
            onBlur={onRenameBoard}
            suppressContentEditableWarning={true}
        >
            {textToEdit}
        </div>
    )
}