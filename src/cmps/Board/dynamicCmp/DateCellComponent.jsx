export function DateCellComponent({clmType,cell}) {
    
    console.log(clmType,cell);
    console.log(cell);
    function getCellDate(){
        const date = new Date(cell.date);
        return date.toLocaleDateString()
    }

    return (
        <span className="date-cell">{getCellDate()}</span>
    )
}