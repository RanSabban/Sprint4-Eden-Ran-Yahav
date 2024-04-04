export function DateCellComponent({ClmType,cell}) {
    
    function getCellDate(){
        const date = new Date(cell.date);
        return date.toLocaleDateString()
    }

    return (
        <span className="date-cell">{getCellDate()}</span>
    )
}