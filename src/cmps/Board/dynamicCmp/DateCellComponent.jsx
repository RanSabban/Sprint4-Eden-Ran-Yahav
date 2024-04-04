export function DateCellComponent({ClmType,cell}) {
    
    function getCellDate(){
        const date = new Date(cell.date);
        return date.toLocaleDateString()
    }

    return (
        <span className="dyn-cell date">{getCellDate()}</span>
    )
}