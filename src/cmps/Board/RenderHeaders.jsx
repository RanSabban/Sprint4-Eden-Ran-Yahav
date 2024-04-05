import { useSelector } from 'react-redux'
import { TableHeader, TableHeaderCell } from 'monday-ui-react-core'

export function RenderHeaders({clmTypes}) {

    console.log(clmTypes.title);

    // const columns = useSelector(storeState => storeState.boardModule.columns)
    
    return (
        
        <>
            {clmTypes.map((clmType,idx) => (
                <div className='dyn-cell header-item' key={idx}>{clmType.title}</div> 
            ))}
        </>

    )

}