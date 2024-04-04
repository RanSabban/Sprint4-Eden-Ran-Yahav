import { useSelector } from 'react-redux'

export function RenderHeaders({clmTypes}) {



    // const columns = useSelector(storeState => storeState.boardModule.columns)
    
    return (
        <section className="headers">
            {clmTypes.map(clmType => (
                <span>{clmType.title} </span>
            ))}
        </section>
    )

}