import { useSelector } from 'react-redux'

export function RenderHeaders({columns}) {



    // const columns = useSelector(storeState => storeState.boardModule.columns)
    
    return (
        <section className="headers">
            {columns.map(column => (
                <span>{column.title} </span>
            ))}
        </section>
    )

}