
import React, { useState } from "react";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file

export function RangePicker({ setModalType, headerFilterBy }) {
    const [dateRange, setDateRange] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: "selection"
        }
    ])
    const handleSelect = (ranges) => {
        const startDateTimestamp = ranges.selection.startDate.getTime()
        const endDateTimestamp = ranges.selection.endDate.getTime()
        setDateRange([ranges.selection])
        console.log(dateRange);
        // setModalType('check-out')
    };
    return (
        <section className='range-picker'>
            <DateRangePicker
                ranges={dateRange}
                onChange={handleSelect}
                months={2}
                showSelectionPreview={false}
                showPreview={false}
                showMonthAndYearPickers={false}
                showDateDisplay={false}
                direction="horizontal"
                staticRanges={[]}
                inputRanges={[]}
                enableOutsideDays={true}
            />
        </section>
    );
}



