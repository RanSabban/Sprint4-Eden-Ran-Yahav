
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

const STORAGE_KEY = 'board'

export const boardService = {
    query,
    getById,
    save,
    remove,
    getEmptyBoard,
    addBoardMsg
}
window.cs = boardService

const gBoards = [
    {
        _id: "b101",
        title: "Robot dev proj",
        isStarred: false,
        archivedAt: 1589983468418,
        createdBy: {
            _id: "EtzD1",
            fullname: "Puki Norma",
            imgUrl: "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png"
        },
        clmTypes: [
            {
                _id: "c111",
                type: "status",
                title: "Status",
                data: [
                    {
                        id: "l102",
                        title: "Working on it",
                        color: "#fdab3d"
                    },
                    {
                        id: "l103",
                        title: "Stuck",
                        color: "#df2f4a"
                    },
                    {
                        id: "l101",
                        title: "Done",
                        color: "#00c875"
                    },
                    {
                        title: 'Will do',
                        id: "l100",
                        color: "#c4c4c4"
                    }
                ]
            },
            {
                _id: "c116",
                type: "priority",
                title: "Priority",
                data: [
                    {
                        id: "l201",
                        title: "Critical ⚠",
                        color: "#333333"
                    },
                    {
                        id: "l202",
                        title: "High",
                        color: "#401694"
                    },
                    {
                        id: "l203",
                        title: "Medium",
                        color: "#5559df"
                    },
                    {
                        id: "l204",
                        title: "Low",
                        color: "#579bfc"
                    },
                    {
                        id: "l200",
                        color: "#c4c4c4"
                    }
                ]
            },
            {
                _id: "c112",
                type: "members",
                title: "Assigned To",
                data: [
                    {
                        _id: "EtzD1",
                        fullname: "Eden Gilady",
                        imgUrl: "https://files.monday.com/euc1/photos/58211317/thumb/58211317-user_photo_2024_04_03_12_43_15.png?1712148195"
                    },
                    {
                        _id: "EtzD2",
                        fullname: "Yahav Ganon",
                        imgUrl: "https://files.monday.com/euc1/photos/58211325/thumb_small/58211325-user_photo_2024_04_03_12_41_20.png?1712148081"
                    },
                    {
                        _id: "EtzD3",
                        fullname: "Ran Sabban",
                        imgUrl: "https://files.monday.com/euc1/photos/58193035/small/58193035-user_photo_2024_04_04_15_17_09.png?1712243830"
                    },
                    {
                        _id: "EtzD4",
                        fullname: "Mor Marzan",
                        imgUrl: "https://ca.slack-edge.com/T06BA1MNBK8-U06GT00SQJ3-a496fd1353ec-512"
                    }
                ]
            },
            {
                _id: "c113",
                type: "timelines",
                title: "Timeline",
                data: [
                    {
                        _id: "sdf123",
                        startDate: 1703703751234,
                        dueDate: 1703703751345
                    }
                ]
            },
            {
                _id: "c114",
                type: "files",
                title: "Files",
                data: [
                    {
                        _id: "sdf124",
                        file: "https://res.cloudinary.com/dkvliixzt/image/upload/v1704304383/large-Screenshot_2024-01-03_at_11.35.48_qclnrt.png"
                    }
                ]
            },
            {
                _id: "c1145",
                type: "txt",
                title: "Free text"
            },
            {
                _id: "c115",
                type: "date",
                title: "Date"
            },
            {
                _id: "c116",
                type: "updates",
                title: "Last Updated",
                data: [
                    {
                        _id: "1478",
                        fullname: "Yahav Ganon",
                        date: 1703703751234,
                        activity: "Moved"
                    },
                    {
                        _id: "456",
                        fullname: "Eden Gilady",
                        date: 1703703751434,
                        activity: "Added"
                    },
                    {
                        _id: "8965",
                        fullname: "Ran Sabban",
                        date: 1703703751834,
                        activity: "Removed"
                    }
                ]
            }
        ],
        groups: [
            {
                _id: "g101",
                title: "Group 1",
                archivedAt: null,
                tasks: [
                    {
                        _id: "c101",
                        title: "Task 1",
                        cells: [
                            {
                                _id: "c111",
                                type: "status",
                                dataId: "l103"
                            },
                            {
                                _id: "c116",
                                type: "priority",
                                dataId: "d116"
                            },
                            {
                                _id: "c112",
                                type: "members",
                                dataId: "EtzD1"
                            },
                            {
                                _id: "c113",
                                type: "timelines",
                                dataId: "sdf123"
                            },
                            {
                                _id: "c114",
                                type: "files",
                                dataId: "sdf124"
                            },
                            {
                                _id: "c1145",
                                type: "txt",
                                txt: "puki"
                            },
                            {
                                _id: "c115",
                                type: "date",
                                date: 1589983468418
                            },
                            {
                                _id: "c116",
                                type: "updates",
                                dataId: "1478"
                            }
                        ],
                        createdBy: {
                            _id: "u102",
                            fullname: "Ran Sabban",
                            imgUrl: "https://files.monday.com/euc1/photos/58193035/small/58193035-user_photo_2024_04_04_15_17_09.png?1712243830"
                        }
                    }
                ]
            },
            {
                _id: "g102",
                title: "Group 2",
                archivedAt: null,
                tasks: [
                    {
                        _id: "c102",
                        title: "Task 2",
                        cells: [
                            {
                                _id: "c111",
                                type: "status",
                                dataId: "l102"
                            },
                            {
                                _id: "c116",
                                type: "priority",
                                dataId: "l204"
                            },
                            {
                                _id: "c112",
                                type: "members",
                                dataId: "EtzD2"
                            },
                            {
                                _id: "c113",
                                type: "timelines",
                                dataId: "sdf123"
                            },
                            {
                                _id: "c114",
                                type: "files",
                                dataId: "sdf124"
                            },
                            {
                                _id: "c1145",
                                type: "txt",
                                txt: "Important notes here"
                            },
                            {
                                _id: "c115",
                                type: "date",
                                date: 1589983468418
                            },
                            {
                                _id: "c116",
                                type: "updates",
                                dataId: "456"
                            }
                        ],
                        createdBy: {
                            _id: "u103",
                            fullname: "Eden Gilady",
                            imgUrl: "https://files.monday.com/euc1/photos/58211317/thumb/58211317-user_photo_2024_04_03_12_43_15.png?1712148195"
                        }
                    },
                    {
                        _id: "c103",
                        title: "Task 3",
                        cells: [
                            {
                                _id: "c111",
                                type: "status",
                                dataId: "l103"
                            },
                            {
                                _id: "c116",
                                type: "priority",
                                dataId: "l202"
                            },
                            {
                                _id: "c112",
                                type: "members",
                                dataId: "EtzD3"
                            },
                            {
                                _id: "c113",
                                type: "timelines",
                                dataId: "sdf123"
                            },
                            {
                                _id: "c114",
                                type: "files",
                                dataId: "sdf124"
                            },
                            {
                                _id: "c1145",
                                type: "txt",
                                txt: "Secondary notes"
                            },
                            {
                                _id: "c115",
                                type: "date",
                                date: 1589983468418
                            },
                            {
                                _id: "c116",
                                type: "updates",
                                dataId: "8965"
                            }
                        ],
                        createdBy: {
                            _id: "u104",
                            fullname: "Yahav Ganon",
                            imgUrl: "https://files.monday.com/euc1/photos/58211325/thumb_small/58211325-user_photo_2024_04_03_12_41_20.png?1712148081"
                        }
                    }
                ]
            }
        ]
    },


]


async function query(filterBy = { txt: '', price: 0 }) {
    var boards = await storageService.query(STORAGE_KEY)
    if (!boards.length) {
        boards = gBoards
        _save(STORAGE_KEY, gBoards)
    }
    return boards
}

function getById(boardId) {
    return storageService.get(STORAGE_KEY, boardId)
}

async function remove(boardId) {
    // throw new Error('Nope')
    await storageService.remove(STORAGE_KEY, boardId)
}

async function save(board) {
    var savedBoard
    if (board._id) {
        savedBoard = await storageService.put(STORAGE_KEY, board)
    } else {
        // Later, owner is set by the backend
        board.owner = userService.getLoggedinUser()
        savedBoard = await storageService.post(STORAGE_KEY, board)
    }
    return savedBoard
}

async function addBoardMsg(boardId, txt) {
    // Later, this is all done by the backend
    const board = await getById(boardId)
    if (!board.msgs) board.msgs = []

    const msg = {
        id: utilService.makeId(),
        by: userService.getLoggedinUser(),
        txt
    }
    board.msgs.push(msg)
    await storageService.put(STORAGE_KEY, board)

    return msg
}

function getEmptyBoard() {
    return {
        vendor: 'Susita-' + (Date.now() % 1000),
        price: utilService.getRandomIntInclusive(1000, 9000),
    }
}

// PRIVATE FUNCS

function _save(entityType, entities) {
    localStorage.setItem(entityType, JSON.stringify(entities))
}

// TEST DATA
// storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 2', price: 980}).then(x => console.log(x))




