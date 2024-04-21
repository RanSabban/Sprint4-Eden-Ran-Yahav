import { Lines } from "monday-ui-react-core/icons";
import { useEffect, useRef, useState } from "react";

export function DynamicDialogAutomation({ itemsToRender, callBack, placeHolder, addFunc, type }) {

    const [isOpen, setIsOpen] = useState(false)
    const [isSelected, setIsSelected] = useState(false)
    const [placeHolderToShow, setPlaceHolderToShow] = useState(placeHolder)
    const dialogRef = useRef(null)

    console.log(itemsToRender);

    useEffect(() => {

        function handleClickOutside(event) {
            if (dialogRef.current && !dialogRef.current.contains(event.target)) {
                setIsOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }

    }, [])

    function onSelect(itemId, itemTitle) {
        setPlaceHolderToShow(itemTitle)
        callBack(itemId)
        setIsSelected(true)
    }

    async function onAddFunc(type) {
        try {
            await addFunc(type)
            setIsOpen(true)
        } catch (err) {
            console.log('cannot add column - automation', err)
        }
    }


    const isActiveClass = isOpen ? 'active' : ''
    const isSelectedClass = isSelected ? 'selected' : ''


    return (
        <span className={`dynamic-dialog-automation-placeholder ${isActiveClass} ${isSelectedClass}`} onClick={() => setIsOpen(open => !open)}>{placeHolderToShow}

            {isOpen && (<div className="dynamic-dialog-automation-container" ref={dialogRef}>
                {
                    itemsToRender.map((item,index) => {

                        return (
                            <div value={item._id || item.id} key={index} onClick={() => onSelect(item._id || item.id, item.title)} className="list-item-dialog-automation">
                                <span>
                                    <Lines />
                                </span>
                                <span>
                                    {item.title}
                                </span>
                            </div>
                        )
                    }
                    )}
                {addFunc ? <span className="add-listed-automation" onClick={() => onAddFunc(type)}>+ Add {type}</span> : ''}
            </div>)
            }

        </span>)


}