import { useSelector } from 'react-redux'
import { DateCellComponent } from './dynamicCmp/DateCellComponent'
import { StatusCellComponent } from './dynamicCmp/StatusCellComponent'
import { PriorityCellComponent } from './dynamicCmp/PriorityCellComponent';
import { MembersCellComponent } from './dynamicCmp/MembersCellComponent';
import { TextCellComponent } from './dynamicCmp/TextCellComponent';




export function TaskPreview({ task }) {

    const clmTypes = useSelector(storeState => storeState.boardModule.clmTypes)


    const { cells } = task
    function getClmType(cellId) {
        const ClmToReturn = clmTypes.filter(clmTypeToReturn => (clmTypeToReturn._id === cellId))
        return ClmToReturn
    }

    return (<li key={task._id}>
        <span className='dyn-cell title'>{task.title}</span>
        {
            cells.map((cell) => (
                <>
                    <DynamicCmp cmpType={cell.type}
                        ClmType={getClmType(cell._id)}
                        cell={cell}
                    />
                </>

            ))
        }
    </li>

    )
}

function DynamicCmp(props) {
    switch (props.cmpType) {
        case 'status':
            return <StatusCellComponent {...props} />
        case 'priority':
            return <PriorityCellComponent {...props} />
        case 'members':
            return <MembersCellComponent {...props} />
        case 'txt':
            return <TextCellComponent {...props} />
        case 'date':
            return <DateCellComponent {...props} />
        default: <span>NoNo</span>

    }
}


// const { useState } = React

// import { ColorInput } from "./dynamic-inputs/ColorInput.jsx"
// import { FontsizeInput } from "./dynamic-inputs/FontSizeInput.jsx"

// export function AppFooter() {
//     const [cmpType, setCmpType] = useState('color')
//     const [footerStyle, setFooterStyle] = useState({
//         backgroundColor: 'pink',
//         fontSize: '16px'
//     })

//     function onChangeStyle(newStyle) {
//         setFooterStyle((prevStyle) => ({ ...prevStyle, ...newStyle }))
//     }

//     console.log('footerStyle', footerStyle)

//     return <footer style={footerStyle} className="app-footer full main-layout" >
//         <h3>Hello from footer</h3>
//         <section>
//             <select onChange={(ev) => { setCmpType(ev.target.value) }}>
//                 <option value="color">Color</option>
//                 <option value="fontSize">Font size</option>
//             </select>
//         </section>
//         <section>
//             <DynamicCmp cmpType={cmpType} name="Puki" onChangeStyle={onChangeStyle} footerStyle={footerStyle} />
//         </section>
//     </footer>
// }



