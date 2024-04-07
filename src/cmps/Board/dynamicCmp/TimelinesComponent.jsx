import dayjs from "dayjs";

export function TimelinesComponent({ cell }) {

    // const calculateDurationInDays = (startDate, endDate) => {
    //     const start = new Date(startDate);
    //     const end = new Date(endDate);
    //     const difference = end - start; // Difference in milliseconds
    //     const durationDays = Math.floor(difference / (1000 * 60 * 60 * 24)); // Convert to days
    //     return durationDays;
    // }

    // Format dates for display
    // const formatDisplayDate = (date) => {
    //     return new Date(date).toLocaleDateString();
    // }

    function formatDisplayDate(date) {
        const newDate = dayjs(date).format('DD MMM');
        return newDate
    }

    // getPercentage()

    function getPercentage() {
        const now = dayjs()
        const start = dayjs(cell.startDate)
        const end = dayjs(cell.endDate)
        // console.log(durationPerc);
        if (now.isBefore(start)) {
            return '0%'
        } else if (now.isAfter(end)) {
            return '100%'
        }

        const totalDuration = end.diff(start, 'day')
        const elapsedDuration = now.diff(start, 'day')
        const percentage = (elapsedDuration / totalDuration) * 100
        // const durationPerc = Math.floor(difference / (1000 * 60 * 60 * 24))
        console.log(percentage);
        return `${percentage}%`
    }


    return (
        <section className="timeline-container">
            <span className="timeline-date-txt-start">{formatDisplayDate(cell.startDate)} </span> <span>{formatDisplayDate(cell.endDate)}</span>
            {/* <div style={{
                width: getPercentage()}}
                className="timline-inside">
            </div> */}
        </section>
    );
};
