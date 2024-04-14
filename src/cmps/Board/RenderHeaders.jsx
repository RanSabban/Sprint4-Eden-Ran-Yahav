import { useSelector } from 'react-redux'
import { TableHeader, TableHeaderCell } from 'monday-ui-react-core'
import { Add } from 'monday-ui-react-core/icons'

export function RenderHeaders({ clmTypes }) {

    // console.log(clmTypes.title);

    // const columns = useSelector(storeState => storeState.boardModule.columns)

    return (

        <>
            {clmTypes.map((clmType, idx) => (
                <span className='dyn-cell header-item' key={idx}>{clmType.title}</span>
            ))}
            <div className='dyn-cell infinity add-column'>
                <div className="add-column-container">
                    <Add />
                </div>
            </div>
        </>

    )

}