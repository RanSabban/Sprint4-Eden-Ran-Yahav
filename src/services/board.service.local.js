
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
        "_id": "b101",
        "title": "Robot dev proj",
        "isStarred": false,
        "archivedAt": 1589983468418,
        "createdBy": {
            "_id": "EtzD1",
            "fullname": "Puki Norma",
            "imgUrl": "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png"
        },

        "clmTypes": [
            {
                _id: "c111",
                type: 'status',
                title: 'Status',
                data: [
                    {
                        _id: "d111",
                        "txt": "Done",
                        "color": "#61bd4f"
                    },
                    {
                        _id: "d112",
                        "txt": "Progress",
                        "color": "#61bd33"
                    },
                ]
            },
            {
                _id: "c116",
                type: 'priority',
                title: 'Priority',
                data: [
                    {
                        _id: "d116",
                        "txt": "Urgent",
                        "color": "#61bd4f"
                    },
                    {
                        _id: "d119",
                        "txt": "NOW",
                        "color": "#61bd33"
                    },
                ]
            },
            {
                _id: "c112",
                type: 'members',
                title: 'Assigned To',
                data: [
                    {
                        "_id": "EtzD1",
                        "fullname": "Puki Norma",
                        "imgUrl": "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png"
                    }
                ]
            },
            {
                _id: 'c113',
                title: 'Free text',
                type: 'txt',
            },
            {
                _id: 'c114',
                title: 'Date',
                type: 'date',
            }
        ],
        "groups": [
            {
                "_id": "g101",
                "title": "Group 1",
                "archivedAt": null,
                "tasks": [
                    {
                        "_id": "c101",
                        "title": "Task 1",
                        "cells": [
                            {
                                _id: "c111",
                                type: 'status',
                                dataId: 'd111'
                            },
                            {
                                _id: "c116",
                                type: 'priority',
                                dataId: 'd116'
                            },
                            {
                                _id: "c112",
                                type: 'members',
                                dataId: 'EtzD1'
                            },
                            {
                                _id: "c113",
                                type: 'txt',
                                txt: 'puki'
                            },
                            {
                                _id: "c114",
                                type: 'date',
                                date: 1234
                            }
                        ],
                        "createdBy": {
                            "_id": "u102",
                            "fullname": "John Doe",
                            "imgUrl": "http://example.com/john.jpg"
                        }
                    },
                ]
            },
            {
                "id": "g102",
                "title": "Group 2",
                "archivedAt": null,
                "tasks": [
                    {
                        "id": "c102",
                        "title": "Task 2",
                        "cells": [
                            {
                                _id: "c111",
                                type: 'status',
                                optionId: 'd112'
                            },
                            {
                                _id: "c112",
                                type: 'members',
                                optionId: 'EtzD1'
                            }
                        ],
                        "byMember": {
                            "_id": "u102",
                            "username": "John",
                            "fullname": "John Doe",
                            "imgUrl": "http://example.com/john.jpg"
                        }
                    },
                ]
            },
        ]
    },
    {
        "_id": "b102",
        "title": "Website Redesign",
        "isStarred": true,
        "archivedAt": null,
        "createdBy": {
            "_id": "xyz123",
            "fullname": "John Doe",
            "imgUrl": "https://example.com/profile.jpg"
        },
        "status": [
            {
                "id": "l101",
                "title": "Done",
                "color": "#61bd4f"
            },
            {
                "id": "l102",
                "title": "Progress",
                "color": "#61bd33"
            }
        ],
        "members": [
            {
                "_id": "EtzD1",
                "fullname": "Puki Norma",
                "imgUrl": "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png"
            },
            {
                "_id": "xyz123",
                "fullname": "John Doe",
                "imgUrl": "https://example.com/profile.jpg"
            }
        ],
        "groups": {
            "id": "g102",
            "title": "Group 2",
            "archivedAt": null,
            "tasks": [
                {
                    "id": "c101",
                    "title": "Task 1",
                    "status": "to-do",
                    "priority": "low",
                    "description": "Description for Task 1",
                    "memberIds": ["u102"],
                    "dueDate": 16156215211,
                    "byMember": {
                        "_id": "u102",
                        "username": "John",
                        "fullname": "John Doe",
                        "imgUrl": "http://example.com/john.jpg"
                    }
                },
                {
                    "id": "c102",
                    "title": "Task 2",
                    "status": "in-progress",
                    "priority": "medium",
                    "description": "Description for Task 2",
                    "memberIds": ["u103"],
                    "dueDate": 16156215211,
                    "byMember": {
                        "_id": "u103",
                        "username": "Alice",
                        "fullname": "Alice Johnson",
                        "imgUrl": "http://example.com/alice.jpg"
                    }
                },
                {
                    "id": "c103",
                    "title": "Task 3",
                    "status": "done",
                    "priority": "high",
                    "description": "Description for Task 3",
                    "memberIds": ["u104"],
                    "dueDate": 16156215211,
                    "byMember": {
                        "_id": "u104",
                        "username": "Jane",
                        "fullname": "Jane Smith",
                        "imgUrl": "http://example.com/jane.jpg"
                    }
                }
            ]
        }
    },
    {
        "_id": "b103",
        "title": "Mobile App Development",
        "isStarred": false,
        "archivedAt": null,
        "createdBy": {
            "_id": "abc456",
            "fullname": "Jane Smith",
            "imgUrl": "https://example.com/profile.jpg"
        },
        "status": [
            {
                "id": "l101",
                "title": "Done",
                "color": "#61bd4f"
            },
            {
                "id": "l102",
                "title": "Progress",
                "color": "#61bd33"
            }
        ],
        "members": [
            {
                "_id": "abc456",
                "fullname": "Jane Smith",
                "imgUrl": "https://example.com/profile.jpg"
            },
            {
                "_id": "xyz789",
                "fullname": "Alice Johnson",
                "imgUrl": "https://example.com/profile.jpg"
            }
        ],
        "groups": {
            "id": "g103",
            "title": "Group 3",
            "archivedAt": null,
            "tasks": [
                {
                    "id": "c105",
                    "title": "Wireframe screens"
                },
                {
                    "id": "c106",
                    "title": "Implement user authentication"
                }
            ]
        }
    }
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




