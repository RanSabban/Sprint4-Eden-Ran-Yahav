import { useEffect, useRef, useState } from "react"

export const useEditableText = (initialText, updateFunc, updateEntity) => {
    const editableTextRef = useRef(null)
    const [isEditable, setIsEditable] = useState(false)
    const [dynClass, setDynClass] = useState('')

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (editableTextRef.current && !editableTextRef.current.contains(event.target)) {
                setIsEditable(false)
                setDynClass('')
                editableTextRef.current.innerText = initialText
            }
        }

        const handleKeyDown = (event) => {
            if (event.key === 'Enter') {
                event.preventDefault()
                editableTextRef.current.blur()
                
                const newText = editableTextRef.current.innerText
                if (newText !== initialText) {
                    try {
                        updateFunc(updateEntity, newText)
                    } catch (error) {
                        console.error('Error updating text:', error)
                        editableTextRef.current.innerText = initialText
                    }
                }

                setIsEditable(false)
                setDynClass('')
            }
        }

        document.addEventListener('mousedown', handleOutsideClick)
        editableTextRef.current && editableTextRef.current.addEventListener('keydown', handleKeyDown)

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick)
            if (editableTextRef.current) {
                editableTextRef.current.removeEventListener('keydown', handleKeyDown)
            }
        }
    }, [initialText, updateFunc, updateEntity])

    return { editableTextRef, isEditable, setIsEditable, dynClass, setDynClass }
}
