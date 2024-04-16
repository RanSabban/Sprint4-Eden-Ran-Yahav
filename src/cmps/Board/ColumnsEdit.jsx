import { Add } from "monday-ui-react-core/icons"
import { useState, useEffect, useRef } from "react"
import { addColumn } from "../../store/actions/board.actions"
import { useParams } from "react-router"

export function ColumnsEdit() {
    const [isOpen, setIsOpen] = useState(false)
    const modalRef = useRef()

    const clmTypes = [
        {_id: "c111", type: "status"},
        {_id: "c116", type: "priority"},
        {_id: "c112", type: "members"},
        {_id: "c113", type: "timelines"},
        {_id: "c114", type: "files"},
        {_id: "c1145", type: "txt"},
        {_id: "c115", type: "date"},
        {_id: "c1118", type: "updates"}
    ];

    const { boardId } = useParams()

    // This function could be refined if needed
    function getClmTypes() {
        const clmTypesToReturn = clmTypes.map((clmType) => ({ _id: clmType._id, type: clmType.type }))
        console.log(clmTypesToReturn)
    }

    useEffect(() => {
        function handleClickOutside(event) {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                setIsOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [modalRef])

    async function onAddColumn(type) {
        try {
            addColumn(type,boardId)
        } catch (err) {
            console.log('cannot add column', err);
        }
    }

    return (

        <section className="columns-edit-container" style={{ position: 'absolute' }}>
            <Add onClick={() => setIsOpen(!isOpen)} />
            {isOpen && (
                <div ref={modalRef} className="columns-list-container" style={{ position: 'absolute' }}>
                    <ul>
                        <span className="columns-list-title">Column Types</span>
                        {clmTypes.map(clmType => (
                            <li onClick={() => onAddColumn(clmType.type)}
                                key={clmType._id} className="list-item-clmtype" >{clmType.type}</li>
                        ))}
                    </ul>
                </div>
            )}
        </section>

    )
}



// import { Add } from "monday-ui-react-core/icons"
// import { useState } from "react"

// export function ColumnsEdit({ clmTypes }) {

//     const [isOpen, setIsOpen] = useState(false)
//     getClmTypes()

//     function getClmTypes() {
//         const clmTypesToReturn = clmTypes.map((clmType) => ({ _id: clmType._id, type: clmType.type }))
//         console.log(clmTypesToReturn)

//     }

//     return <section className="columns-edit-container" style={{ position: 'relative' }}>

//         <Add onClick={() => setIsOpen(!isOpen)} />
//         {isOpen && (
//             <div className="columns-list-container" style={{ position: 'absolute' }}>
//                 <ul>
//                     {clmTypes.map(clmType => (
//                         <li key={clmType._id}>{clmType.type}</li>
//                 ))}
//                 </ul>
//             </div>
//         )}
//     </section>
// }