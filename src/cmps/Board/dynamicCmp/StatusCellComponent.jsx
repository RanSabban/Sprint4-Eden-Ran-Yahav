import { useState } from "react"
import { LabelPicker } from "../reusableCmps/LabelPicker"
import { useEffect } from "react"

export function StatusCellComponent({ clmType, cell, onChange, onClickLabel,setSelectedCell, isLast }) {

    
    const [isOpen, setIsOpen] = useState(false)
    const [status, setStatus] = useState({ color: '', title: '' })

    // console.log(clmType, cell)
    // const { data } = clmType

    useEffect(() => {
        const item = clmType.data.find(item => item.id === cell.dataId)
        if (item) {
            setStatus({ color: item.color, title: item.title })
        }
    }, [clmType, cell])
    
    return (
        <>
            <div 
            style={{ backgroundColor: status.color, width: '100%', cursor: 'pointer',  }} className="dyn-cell status dyn-cell-flexy"
             onClick={(ev) => onClickLabel(ev.target,clmType,cell)}
            >
                <div className="label-fold">
                    <div class="half first-half"></div>
                    <div class="half second-half"></div>
                </div>
                {status.title}
            </div>
        </>
    )
}


// import { useState } from "react"
// import { LabelPicker } from "../reusableCmps/LabelPicker"

// export function StatusCellComponent({ clmType, cell, onChange, onClickLabel }) {
//     const [isOpen, setIsOpen] = useState(false)
//     // console.log(clmType, cell)
//     const { data } = clmType



//     function getCellTxt() {
//         const item = data.find(item => item.id === cell.dataId)
//         if (!item) return 'puki wrongico'
//         const title = item.title
//         return title
//     }

//     function getCellColor() {
//         const item = data.find(item => item.id === cell.dataId)
//         if (!item) return 'red'
//         const color = item.color
//         return color
//     }

//     function toggleLabelPicker() {
//         setIsOpen(!isOpen)
//         console.log("isOpen", isOpen)
//     }

//     function onOpenDropdown({ target }) {
//         onClickLabel(target, clmType, cell)
//     }

//     return (
//         <>
//             <div style={{ backgroundColor: getCellColor(), width: '100%', cursor: 'pointer', position: 'relative' }} className="dyn-cell status dyn-cell-flexy"
//                 // onClick={(ev) => onOpenDropdown(ev)}
//                 onClick={() => setIsOpen(!isOpen)}
                
//             >
//                  {
//             isOpen && (
//                 <div className="label-picker-container" style={{position: 'absolute', transform: 'translate(0%,50%)'}}>
//                     <div className="cell-target-indicator" style={{
//                         height: '20px',
//                         width: '100%',
//                         backgroundColor: '#f0f0f0',
//                         textAlign: 'center',
//                         lineHeight: '20px',
//                         borderTopLeftRadius: '0.6em',
//                         borderTopRightRadius: '0.6em'
//                     }}>
//                       Test
//                     </div> 

//                     <div className="label-picker-content">
//                         <ul>
//                             {clmType.data.map((label) => (
//                                 <li key={label.id} className="label"  style={{
//                                     backgroundColor: label.color,
//                                     width: '130px',
//                                     height: '35px'
//                                 }}>
//                                     <span className="label-txt">{label.title}</span>
//                                 </li>
//                             ))}
//                         </ul>
//                     </div>
//                 </div>
                
//             )
//         }
//                 {getCellTxt()}
//             </div>
       

//         </>
//     )
// }