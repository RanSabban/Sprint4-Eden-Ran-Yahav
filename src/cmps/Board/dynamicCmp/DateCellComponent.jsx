import dayjs from "dayjs";

export function DateCellComponent({clmType,cell}) {
    
    function getCellDate(){
        const date = dayjs(cell.date).format('DD MMM');
        return date
    }
    
    console.log(dayjs());

    return (
        <span className="dyn-cell date">{getCellDate()}</span>
    )
}

// <DialogContentContainer className={styles.datepickerDialogContentContainer}>
//         <DatePicker data-testid="date-picker" date={date} onPickDate={d => setDate(d)} />
//       </DialogContentContainer>