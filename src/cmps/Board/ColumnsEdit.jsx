import { Add } from "monday-ui-react-core/icons";
import { useState, useEffect, useRef } from "react";
import { addColumn } from "../../store/actions/board.actions";
import { useParams } from "react-router";

export function ColumnsEdit({ clmTypes }) {
    const [isOpen, setIsOpen] = useState(false);
    const modalRef = useRef(); // Reference to the modal div

    const { boardId } = useParams()

    // This function could be refined if needed
    function getClmTypes() {
        const clmTypesToReturn = clmTypes.map((clmType) => ({ _id: clmType._id, type: clmType.type }));
        console.log(clmTypesToReturn);
    }

    // Custom hook to detect clicks outside of the modal to close it
    useEffect(() => {
        function handleClickOutside(event) {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }

        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [modalRef]);

    async function onAddColumn(type) {
        try {
            addColumn(type,boardId)
        } catch (err) {

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

    );
}



// import { Add } from "monday-ui-react-core/icons";
// import { useState } from "react";

// export function ColumnsEdit({ clmTypes }) {

//     const [isOpen, setIsOpen] = useState(false)
//     getClmTypes()

//     function getClmTypes() {
//         const clmTypesToReturn = clmTypes.map((clmType) => ({ _id: clmType._id, type: clmType.type }))
//         console.log(clmTypesToReturn);

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