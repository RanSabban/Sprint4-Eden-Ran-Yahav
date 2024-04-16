import { ColumnsEdit } from './ColumnsEdit';

export function RenderHeaders({ clmTypes, isCollapsed }) {

    return (
        <>
            {isCollapsed ? (
                clmTypes.map((clmType, idx) => {
                    // console.log(clmType);
                    if (clmType.type !== "files" &&
                        clmType.type !== "members" &&
                        clmType.type !== "txt" &&
                        clmType.type !== "files" &&
                        clmType.type !== "updates" &&
                        clmType.type !== "timelines") {
                        return <span className='dyn-cell header-item' style={{ fontSize: '14px' }} key={idx}>{clmType.title}</span>
                    }
                    return null
                })
            ) : (
                <>
                    {clmTypes.map((clmType, idx) => (
                        <span className='dyn-cell header-item' style={{ fontSize: '14px' }} key={idx}>{clmType.title}</span>
                    ))}
                    <div className='dyn-cell infinity add-column'>

                        <ColumnsEdit clmTypes={clmTypes} />

                    </div>
                </>
            )}
        </>
    );
}
