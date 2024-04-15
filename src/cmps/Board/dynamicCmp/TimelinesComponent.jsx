import dayjs from "dayjs";

export function TimelinesComponent({ cell, groupColor }) {

    // const calculateDurationInDays = (startDate, endDate) => {
    //     const start = new Date(startDate);
    //     const end = new Date(endDate);
    //     const difference = end - start; // Difference in milliseconds
    //     const durationDays = Math.floor(difference / (1000 * 60 * 60 * 24)); // Convert to days
    //     return durationDays;
    // }

    function formatDisplayDate(startDate, endDate) {
        const start = dayjs(startDate);
        const end = dayjs(endDate);

        let formattedDate;
        if (start.month() === end.month()) {
            formattedDate = `${start.format('D')} - ${end.format('D MMM')}`;
        } else {
            formattedDate = `${start.format('D MMM')} - ${end.format('D MMM')}`;
        }
        return formattedDate;
    }
    // getPercentage()

    // function getPercentage() {
    //     const now = dayjs()
    //     const start = dayjs(cell.startDate)
    //     const end = dayjs(cell.endDate)
    //     // console.log(durationPerc);
    //     if (now.isBefore(start)) {
    //         return '0%'
    //     } else if (now.isAfter(end)) {
    //         return '100%'
    //     }

    //     const totalDuration = end.diff(start, 'day')
    //     const elapsedDuration = now.diff(start, 'day')
    //     const percentage = (elapsedDuration / totalDuration) * 100
    //     console.log(percentage);
    //     return `${percentage}%`
    // }

    function getPercentage() {
        const now = dayjs()
        const start = dayjs(cell.startDate)
        const end = dayjs(cell.endDate)
        if (now.isBefore(start)) {
            return '0%';
        } else if (now.isAfter(end)) {
            return '100%';
        }

        const totalDuration = end.diff(start, 'day')
        const elapsedDuration = now.diff(start, 'day')
        const percentage = (elapsedDuration / totalDuration) * 100
        console.log(percentage.toFixed(2))
        // return `${percentage.toFixed(2)}%`
        return `${percentage.toFixed(2)}%`

    }


    return (
        <div className="dyn-cell timeline dyn-cell-flexy">

        <section className="timeline-container">
          <div className="progress-bar-container">
            <span className="timeline-date-txt">{formatDisplayDate(cell.startDate, cell.endDate)}</span>
            
            <div style={{ width: getPercentage(cell.startDate, cell.endDate),background: groupColor, height: '100%' }} className="progress-bar" ></div>
            {/* <div className="progress-bar" style={{ width: "50%",background: groupColor }}></div> */}
          </div>
        </section>
        </div>
      )
      

}

