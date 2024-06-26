export const utilService = {
    makeId,
    makeLorem,
    getRandomIntInclusive,
    debounce,
    randomPastTime,
    saveToStorage,
    loadFromStorage,
    getPrettyRandomColor,
    getColors,
    formatIsoDateToYMD

}

function makeId(length = 6) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return txt
}

function makeLorem(size = 100) {
    var words = ['The sky', 'above', 'the port', 'was', 'the color of television', 'tuned', 'to', 'a dead channel', '.', 'All', 'this happened', 'more or less', '.', 'I', 'had', 'the story', 'bit by bit', 'from various people', 'and', 'as generally', 'happens', 'in such cases', 'each time', 'it', 'was', 'a different story', '.', 'It', 'was', 'a pleasure', 'to', 'burn']
    var txt = ''
    while (size > 0) {
        size--
        txt += words[Math.floor(Math.random() * words.length)] + ' '
    }
    return txt
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive 
}


function randomPastTime() {
    const HOUR = 1000 * 60 * 60
    const DAY = 1000 * 60 * 60 * 24
    const WEEK = 1000 * 60 * 60 * 24 * 7

    const pastTime = getRandomIntInclusive(HOUR, WEEK)
    return Date.now() - pastTime
}

function formatIsoDateToYMD(date) {
    const dateObj = new Date(date)
    if (isNaN(dateObj.getTime())) {
        console.error('Invalid date provided')
        return ''
    }

    let year = dateObj.getFullYear()
    let month = dateObj.getMonth() + 1
    let day = dateObj.getDate()

    month = month < 10 ? `0${month}` : month
    day = day < 10 ? `0${day}` : day

    return `${year}/${month}/${day}`
}

function debounce(func, timeout = 300) {
    let timer
    return (...args) => {
        clearTimeout(timer)
        timer = setTimeout(() => { func.apply(this, args) }, timeout)
    }
}

function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}

function loadFromStorage(key) {
    const data = localStorage.getItem(key)
    return (data) ? JSON.parse(data) : undefined
}

function getPrettyRandomColor() {
    const colors = ['#579bfc', '#ffca00', '#9dd327', '#7e3b8a', '#175a63']
    const randomIndex = Math.floor(Math.random() * colors.length)
    return colors[randomIndex]
}

function getColors() {
    return [
        "#9dd327",
        "#cbb641",
        "#ffca00",
        "#ff642e",
        "#ffaead",
        "#ff7575",
        "#ba3354",
        "#ff017e",
        "#ff5ac3",
        "#faa1f1",
        "#794bd0",
        "#7e3b8a",
        "#401694",
        "#5559df",
        "#235091",
        "#579bfc",
        "#4ecdc6",
        "#66cbff",
        "#74b0cc",
        "#9aadbc",
        "#757575",
        "#333333",
        "#7f5348",
        "#e384bc",
        "#bda58b",
        "#a0e3f6",
        "#cd9282",
        "#216fde",
        "#175a63",
        "#bea8fa",
        "#a9bee9",
        "#9d9ab9",
        "#563e3e"
    ]
}