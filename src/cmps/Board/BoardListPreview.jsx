import { utilService } from "../../services/util.service"

// function handleAddToCalendar(task) {
function handleAddToCalendar() {

    const task = {
        title: 'BoomShackalak',
        cell: {
            date: 1713423652520
        }
    }

    if (!task) {
      console.error('Stay details are missing')
      return
    }
    if (!order.startDate || !order.endDate) {
      console.error('Order dates are missing')
      return
    }

    const startDateFormatted = utilService.formatIsoDateToYMD(task.cell.date)
    const endDateFormatted = utilService.formatIsoDateToYMD(task.cell.date)
    const startDate = startDateFormatted.replace(/\//g, '')
    const endDate = endDateFormatted.replace(/\//g, '')
    const startTime = 'T000000'
    const endTime = 'T235959'
    const details = encodeURIComponent(`Task: ${task.title}`)
    // const location = encodeURIComponent(`${task.loc.city}, ${task.loc.country}`)
    const googleCalendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=Task: ${task.title}&dates=${startDate}${startTime}/${endDate}${endTime}&details=${details}&sf=true&output=xml`
    
    window.open(googleCalendarUrl, '_blank')
}