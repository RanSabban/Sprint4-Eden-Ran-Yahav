import { useEffect, useRef, useState } from "react";

export const useEditableText = (initialText, updateFunc, updateEntity) => {
    const editableTextRef = useRef(null);
    const [isEditable, setIsEditable] = useState(false);
    const [dynClass, setDynClass] = useState('');

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (editableTextRef.current && !editableTextRef.current.contains(event.target)) {
                setIsEditable(false);
                setDynClass('');
                // Optionally revert to the original text if editing was cancelled without changes
                editableTextRef.current.innerText = initialText;
            }
        };

        const handleKeyDown = (event) => {
            if (event.key === 'Enter') {
                event.preventDefault(); // Prevent the default action to avoid newline in contenteditable
                editableTextRef.current.blur(); // Remove focus from the editable element
                
                // Check if text was changed before updating
                const newText = editableTextRef.current.innerText;
                if (newText !== initialText) {
                    try {
                        updateFunc(updateEntity, newText);
                    } catch (error) {
                        console.error('Error updating text:', error);
                        // Optionally revert to the original text on error
                        editableTextRef.current.innerText = initialText;
                    }
                }

                setIsEditable(false); // Turn off editable mode
                setDynClass(''); // Reset dynamic class
            }
        };

        // Attach event listeners
        document.addEventListener('mousedown', handleOutsideClick);
        editableTextRef.current && editableTextRef.current.addEventListener('keydown', handleKeyDown);

        return () => {
            // Cleanup
            document.removeEventListener('mousedown', handleOutsideClick);
            if (editableTextRef.current) {
                editableTextRef.current.removeEventListener('keydown', handleKeyDown);
            }
        };
    }, [initialText, updateFunc, updateEntity]);

    return { editableTextRef, isEditable, setIsEditable, dynClass, setDynClass };
};
