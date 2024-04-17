import { Add } from "monday-ui-react-core/icons"
import { useState, useEffect, useRef } from "react"
import { addColumn } from "../../store/actions/board.actions"
import { useParams } from "react-router"
import { CSSTransition } from "react-transition-group"


export function ColumnsEdit() {
    const [isOpen, setIsOpen] = useState(false)
    const modalRef = useRef()

    const clmTypes = [
        { _id: "c111", type: "status" },
        { _id: "c116", type: "priority" },
        { _id: "c112", type: "members" },
        { _id: "c113", type: "timelines" },
        { _id: "c114", type: "files" },
        { _id: "c1145", type: "txt" },
        { _id: "c115", type: "date" },
        { _id: "c1118", type: "updates" }
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
            addColumn(type, boardId)
        } catch (err) {
            console.log('cannot add column', err);
        }
    }

    const clmTypeConfig = {
        status: {
            imgSrc: "https://cdn.monday.com/images/column-store/columns/color-column-icon.svg",
            bgColor: "rgb(17, 221, 128)"
        },
        priority: {
            imgSrc: "https://files.monday.com/euc1/photos/10162286/original/app_version_10162286_photo_2023_10_26_13_37_04.png?1713321012752",
            bgColor: "rgb(255, 203, 0)" // Example color
        },
        members: {
            imgSrc: "https://cdn.monday.com/images/column-store/columns/multiple-person-column-icon.svg",
            bgColor: "rgb(0, 207, 244)" // Example color
        },
        timelines: {
            imgSrc: "https://cdn.monday.com/images/column-store/columns/timerange-column-icon.svg",
            bgColor: "rgb(163, 88, 223)" // Example color
        },
        files: {
            imgSrc: "https://cdn.monday.com/images/column-store/columns/file-column-icon.svg",
            bgColor: "rgb(0, 207, 244)" // Example color
        },
        txt: {
            imgSrc: "https://cdn.monday.com/images/column-store/columns/text-column-icon.svg",
            bgColor: "rgb(0, 169, 255)" // Example color
        },
        date: {
            imgSrc: "https://cdn.monday.com/images/column-store/columns/date-column-icon.svg",
            bgColor: "rgb(17, 221, 128)" // Example color
        },
        updates: {
            imgSrc: "https://cdn.monday.com/images/column-store/columns/dropdown-column-icon.svg",
            bgColor: "rgb(247, 72, 117)" // Example color
        }
    };




    return (
        <section className="columns-edit-container" style={{ position: 'absolute' }}>
            <Add onClick={() => setIsOpen(!isOpen)} className="add-column-icon" />
            <CSSTransition
                in={isOpen}
                timeout={0}
                classNames="dropdown"
                unmountOnExit
            >
                <div ref={modalRef} className={`columns-list-container`} style={{ position: 'absolute' }} >
                    <ul  className={`${isOpen ? 'open' : ''}`}>
                        <span className="columns-list-title">Column Types</span>
                        {clmTypes.map(clmType => {
                            const { imgSrc, bgColor } = clmTypeConfig[clmType.type] || {};
                            return (
                                <li key={clmType._id} onClick={() => onAddColumn(clmType.type)} className="list-item-clmtype">
                                    <div className="monday-column-icon-component" style={{ backgroundColor: bgColor }}>
                                        <img className="monday-column-icon-component__icon" src={imgSrc} alt={clmType.type} />
                                    </div>
                                    <span>{clmType.type}</span>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </CSSTransition>
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