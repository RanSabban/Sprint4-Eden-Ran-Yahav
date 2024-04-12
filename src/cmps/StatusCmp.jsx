

export function StatusCmp({clmType, onClickStatus}){

    console.log('mnmnmnmnm', clmType, onClickStatus)
    
    return(  <div className="label-picker-content">
    <ul>
        {clmType.data.map((label) => (
            <li key={label.id} className="label" onClick={() => onClickStatus(label.id)} style={{
                backgroundColor: label.color,
                width: '130px',
                height: '35px'
            }}>
                <span className="label-txt">{label.title}</span>
            </li>
        ))}
    </ul>
</div>
)

}