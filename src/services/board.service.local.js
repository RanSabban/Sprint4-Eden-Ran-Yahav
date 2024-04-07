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
    addBoardMsg,
    getEmptyTask,
    addTask,
    addGroup,
    removeGroup,
    updateCell,
    updateTask
}
window.cs = boardService



const gBoards = [
    {
        _id: "b101",
        title: "Robot dev proj",
        type: 'item',
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
                title: "Features",
                archivedAt: null,
                tasks: [
                    {
                        _id: "c101",
                        title: "Add filter",
                        cells: [
                            {
                                _id: "c111",
                                type: "status",
                                dataId: "l102"
                            },
                            {
                                _id: "c116",
                                type: "priority",
                                dataId: "l203"
                            },
                            {
                                _id: "c112",
                                type: "members",
                                dataId: ["EtzD1", "EtzD3"]
                            },
                            {
                                _id: "c113",
                                type: "timelines",
                                startDate: 1684886400000,
                                endDate: 1688256000000
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
                                date: 1706953308365
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
                    },
                    {
                        _id: "c105",
                        title: "Add paging",
                        cells: [
                            { _id: "c111", type: "status", dataId: "l101" }, // Working on it
                            { _id: "c116", type: "priority", dataId: "l202" }, // Medium
                            { _id: "c112", type: "members", dataId: ["EtzD2", "EtzD1"] }, // Yahav Ganon, Eden Gilady
                            {
                                _id: "c113", type: "timelines", startDate: 1685577600000,
                                endDate: 1688515200000
                            },
                            { _id: "c114", type: "files", dataId: "sdf124" }, // Example file
                            { _id: "c1145", type: "txt", txt: "Add groups paging" },
                            { _id: "c115", type: "date", date: 1709372508365 }, // Example date
                            { _id: "c116", type: "updates", dataId: "1478" } // Example update
                        ],
                        createdBy: {
                            _id: "EtzD2",
                            fullname: "Yahav Ganon",
                            imgUrl: "https://files.monday.com/euc1/photos/58211325/thumb_small/58211325-user_photo_2024_04_03_12_41_20.png?1712148081"
                        }
                    },
                    {
                        _id: "c106",
                        title: "Add drog & drop",
                        cells: [
                            { _id: "c111", type: "status", dataId: "l103" }, // Stuck
                            { _id: "c116", type: "priority", dataId: "l202" }, // Medium
                            { _id: "c112", type: "members", dataId: ["EtzD2"] }, // Yahav Ganon
                            {
                                _id: "c113", type: "timelines", startDate: 1687219200000,
                                endDate: 1688601600000
                            }, // Example timeline
                            { _id: "c114", type: "files", dataId: "sdf124" }, // Example file
                            { _id: "c1145", type: "txt", txt: "Drag & drop rows" },
                            { _id: "c115", type: "date", date: 1711359708365 }, // Example date
                            { _id: "c116", type: "updates", dataId: "1478" } // Example update
                        ],
                        createdBy: {
                            _id: "EtzD2",
                            fullname: "Yahav Ganon",
                            imgUrl: "https://files.monday.com/euc1/photos/58211325/thumb_small/58211325-user_photo_2024_04_03_12_41_20.png?1712148081"
                        }
                    },
                ]
            },
            {
                _id: "g102",
                title: "Bugs",
                archivedAt: null,
                tasks: [
                    {
                        _id: "c102",
                        title: "Logo shrinks on home page",
                        cells: [
                            {
                                _id: "c111",
                                type: "status",
                                dataId: "l101"
                            },
                            {
                                _id: "c116",
                                type: "priority",
                                dataId: "l200"
                            },
                            {
                                _id: "c112",
                                type: "members",
                                dataId: ["EtzD3"]
                            },
                            {
                                _id: "c113",
                                type: "timelines",
                                startDate: 1687824000000,
                                endDate: 1688515200000
                            },
                            {
                                _id: "c114",
                                type: "files",
                                dataId: "sdf124"
                            },
                            {
                                _id: "c1145",
                                type: "txt",
                                txt: "Use Scss"
                            },
                            {
                                _id: "c115",
                                type: "date",
                                date: 1712396508365
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
                        title: "Origin group closes on D&D",
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
                                dataId: ["EtzD3"]
                            },
                            {
                                _id: "c113",
                                type: "timelines",
                                startDate: 1690934400000,
                                endDate: 1696118400000
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
                                date: 1706694108365
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
            },
            {
                _id: "g103",
                title: "Frontend",
                archivedAt: null,
                tasks: [
                    {
                        _id: "c104",
                        title: "Structure based on monday app",
                        cells: [
                            { _id: "c111", type: "status", dataId: "l101" }, // Done
                            { _id: "c116", type: "priority", dataId: "l202" }, // Low
                            { _id: "c112", type: "members", dataId: ["EtzD1"] }, // Eden Gilady
                            {
                                _id: "c113", type: "timelines", startDate: 1693526400000,
                                endDate: 1694908800000
                            },
                            { _id: "c114", type: "files", dataId: "sdf124" }, // Example file
                            { _id: "c1145", type: "txt", txt: "Initial planning" },
                            { _id: "c115", type: "date", date: 1722419175369 }, // Example date
                            { _id: "c116", type: "updates", dataId: "456" } // Example update
                        ],
                        createdBy: {
                            _id: "EtzD1",
                            fullname: "Eden Gilady",
                            imgUrl: "https://files.monday.com/euc1/photos/58211317/thumb/58211317-user_photo_2024_04_03_12_43_15.png?1712148195"
                        }
                    },
                    {
                        _id: "c106",
                        title: "Home page structure & design",
                        cells: [
                            { _id: "c111", type: "status", dataId: "l102" }, // Working on it
                            { _id: "c116", type: "priority", dataId: "l204" }, // Medium
                            { _id: "c112", type: "members", dataId: ["EtzD3"] }, // Ran Sabban
                            {
                                _id: "c113", type: "timelines", startDate: 1696809600000,
                                endDate: 1699228800000
                            }, // Example timeline
                            { _id: "c114", type: "files", dataId: "sdf124" }, // Example file
                            { _id: "c1145", type: "txt", txt: "Based on Monday.com" },
                            { _id: "c115", type: "date", date: 1721295975369 }, // Example date
                            { _id: "c116", type: "updates", dataId: "1478" } // Example update
                        ],
                        createdBy: {
                            _id: "EtzD3",
                            fullname: "Ran Sabban",
                            imgUrl: "https://files.monday.com/euc1/photos/58193035/small/58193035-user_photo_2024_04_04_15_17_09.png?1712243830"
                        }
                    },
                    // Task 3
                    {
                        _id: "c107",
                        title: "Add side nav bar",
                        cells: [
                            { _id: "c111", type: "status", dataId: "l101" }, // Will do
                            { _id: "c116", type: "priority", dataId: "l202" }, // High
                            { _id: "c112", type: "members", dataId: ["EtzD4"] }, // Mor Marzan
                            {
                                _id: "c113", type: "timelines", startDate: 1697155200000,
                                endDate: 1700006400000
                            }, // Example timeline
                            { _id: "c114", type: "files", dataId: "sdf124" }, // Example file
                            { _id: "c1145", type: "txt", txt: "Responsive & Flexible" },
                            { _id: "c115", type: "date", date: 1722937575369 }, // Example date
                            { _id: "c116", type: "updates", dataId: "8965" } // Example update
                        ],
                        createdBy: {
                            _id: "EtzD4",
                            fullname: "Mor Marzan",
                            imgUrl: "https://ca.slack-edge.com/T06BA1MNBK8-U06GT00SQJ3-a496fd1353ec-512"
                        }
                    },
                    {
                        _id: "c137",
                        title: "Sign in page",
                        cells: [
                            { _id: "c111", type: "status", dataId: "l100" }, // Will do
                            { _id: "c116", type: "priority", dataId: "l204" }, // High
                            { _id: "c112", type: "members", dataId: ["EtzD4"] }, // Mor Marzan
                            {
                                _id: "c113", type: "timelines", startDate: 1706745600000,
                                endDate: 1707091200000
                            }, // Example timeline
                            { _id: "c114", type: "files", dataId: "sdf124" }, // Example file
                            { _id: "c1145", type: "txt", txt: "Bonus feature" },
                            { _id: "c115", type: "date", date: 1722419175369 }, // Example date
                            { _id: "c116", type: "updates", dataId: "8965" } // Example update
                        ],
                        createdBy: {
                            _id: "EtzD4",
                            fullname: "Mor Marzan",
                            imgUrl: "https://ca.slack-edge.com/T06BA1MNBK8-U06GT00SQJ3-a496fd1353ec-512"
                        }
                    },
                    {
                        _id: "c138",
                        title: "Build Service API",
                        cells: [
                            { _id: "c111", type: "status", dataId: "l100" }, // Will do
                            { _id: "c116", type: "priority", dataId: "l201" }, // High
                            { _id: "c112", type: "members", dataId: ["EtzD3", "EtzD2"] }, // 
                            {
                                _id: "c113", type: "timelines", startDate: 1707004800000,
                                endDate: 1711584000000
                            }, // Example timeline
                            { _id: "c114", type: "files", dataId: "sdf124" }, // Example file
                            { _id: "c1145", type: "txt", txt: "Must do" },
                            { _id: "c115", type: "date", date: 1721295975369 }, // Example date
                            { _id: "c116", type: "updates", dataId: "8965" } // Example update
                        ],
                        createdBy: {
                            _id: "EtzD4",
                            fullname: "Mor Marzan",
                            imgUrl: "https://ca.slack-edge.com/T06BA1MNBK8-U06GT00SQJ3-a496fd1353ec-512"
                        }
                    },
                ]
            },
            {
                _id: "g104",
                title: "Backend",
                archivedAt: null,
                tasks: [
                    {
                        _id: "c151",
                        title: "Build basic server",
                        cells: [
                            { _id: "c111", type: "status", dataId: "l101" }, // Done
                            { _id: "c116", type: "priority", dataId: "l201" }, // Low
                            { _id: "c112", type: "members", dataId: ["EtzD1"] }, // Eden Gilady
                            {
                                _id: "c113", type: "timelines", startDate: 1684886400000,
                                endDate: 1688256000000
                            }, // Example timeline
                            { _id: "c114", type: "files", dataId: "sdf124" }, // Example file
                            { _id: "c1145", type: "txt", txt: "Initial planning" },
                            { _id: "c115", type: "date", date: 1722937575369 }, // Example date
                            { _id: "c116", type: "updates", dataId: "456" } // Example update
                        ],
                        createdBy: {
                            _id: "EtzD1",
                            fullname: "Eden Gilady",
                            imgUrl: "https://files.monday.com/euc1/photos/58211317/thumb/58211317-user_photo_2024_04_03_12_43_15.png?1712148195"
                        }
                    },
                    {
                        _id: "c152",
                        title: "Build services",
                        cells: [
                            { _id: "c111", type: "status", dataId: "l100" }, // Working on it
                            { _id: "c116", type: "priority", dataId: "l204" }, // Medium
                            { _id: "c112", type: "members", dataId: ["EtzD3", "EtzD1"] }, // Ran Sabban
                            {
                                _id: "c113", type: "timelines", startDate: 1685577600000,
                                endDate: 1688515200000
                            }, // Example timeline
                            { _id: "c114", type: "files", dataId: "sdf124" }, // Example file
                            { _id: "c1145", type: "txt", txt: "Use node.js" },
                            { _id: "c115", type: "date", date: 1721295975369 }, // Example date
                            { _id: "c116", type: "updates", dataId: "1478" } // Example update
                        ],
                        createdBy: {
                            _id: "EtzD3",
                            fullname: "Ran Sabban",
                            imgUrl: "https://files.monday.com/euc1/photos/58193035/small/58193035-user_photo_2024_04_04_15_17_09.png?1712243830"
                        }
                    },
                    // Task 3
                    {
                        _id: "c153",
                        title: "Build controllers",
                        cells: [
                            { _id: "c111", type: "status", dataId: "l101" }, // Done
                            { _id: "c116", type: "priority", dataId: "l202" }, // High
                            { _id: "c112", type: "members", dataId: ["EtzD4"] }, // Mor Marzan
                            {
                                _id: "c113", type: "timelines", startDate: 1687219200000,
                                endDate: 1688601600000
                            }, // Example timeline
                            { _id: "c114", type: "files", dataId: "sdf124" }, // Example file
                            { _id: "c1145", type: "txt", txt: "Efficient" },
                            { _id: "c115", type: "date", date: 1722937575369 }, // Example date
                            { _id: "c116", type: "updates", dataId: "8965" } // Example update
                        ],
                        createdBy: {
                            _id: "EtzD4",
                            fullname: "Mor Marzan",
                            imgUrl: "https://ca.slack-edge.com/T06BA1MNBK8-U06GT00SQJ3-a496fd1353ec-512"
                        }
                    },
                    {
                        _id: "c154",
                        title: "Build atlas basic data",
                        cells: [
                            { _id: "c111", type: "status", dataId: "l100" }, // Will do
                            { _id: "c116", type: "priority", dataId: "l201" }, // High
                            { _id: "c112", type: "members", dataId: ["EtzD3", "EtzD2"] }, // 
                            {
                                _id: "c113", type: "timelines", startDate: 1687824000000,
                                endDate: 1688515200000
                            }, // Example timeline
                            { _id: "c114", type: "files", dataId: "sdf124" }, // Example file
                            { _id: "c1145", type: "txt", txt: "Must do" },
                            { _id: "c115", type: "date", date: 1721295975369 }, // Example date
                            { _id: "c116", type: "updates", dataId: "8965" } // Example update
                        ],
                        createdBy: {
                            _id: "EtzD4",
                            fullname: "Mor Marzan",
                            imgUrl: "https://ca.slack-edge.com/T06BA1MNBK8-U06GT00SQJ3-a496fd1353ec-512"
                        }
                    },
                ]
            }
        ]
    },
    {
        "_id": "b102",
        "title": "Web Development Roadmap",
        type: 'project',
        "isStarred": true,
        "archivedAt": null,
        "createdBy": {
            "_id": "EtzD2",
            "fullname": "Yahav Ganon",
            "imgUrl": "https://files.monday.com/euc1/photos/58211325/thumb_small/58211325-user_photo_2024_04_03_12_41_20.png?1712148081"
        },
        "clmTypes": [
            {
                "_id": "c111",
                "type": "status",
                "title": "Stage",
                "data": [
                    { "id": "l205", "title": "Planning", "color": "#f2d600" },
                    { "id": "l206", "title": "Design", "color": "#ff9f1a" },
                    { "id": "l207", "title": "Development", "color": "#eb5a46" },
                    { "id": "l208", "title": "Testing", "color": "#c377e0" },
                    { "id": "l209", "title": "Deployment", "color": "#0079bf" },
                    { "id": "l210", "title": "Completed", "color": "#00c875" }
                ]
            },
            {
                "_id": "c117",
                "type": "priority",
                "title": "Priority",
                "data": [
                    { "id": "l211", "title": "Urgent", "color": "#eb5a46" },
                    { "id": "l212", "title": "High", "color": "#ff9f1a" },
                    { "id": "l213", "title": "Medium", "color": "#f2d600" },
                    { "id": "l214", "title": "Low", "color": "#c4c4c4" }
                ]
            },
            {
                "_id": "c112",
                "type": "members",
                "title": "Members",
                "data": [
                    { "_id": "EtzD1", "fullname": "Eden Gilady", "imgUrl": "https://files.monday.com/euc1/photos/58211317/thumb/58211317-user_photo_2024_04_03_12_43_15.png?1712148195" },
                    { "_id": "EtzD2", "fullname": "Yahav Ganon", "imgUrl": "https://files.monday.com/euc1/photos/58211325/thumb_small/58211325-user_photo_2024_04_03_12_41_20.png?1712148081" },
                    { "_id": "EtzD3", "fullname": "Ran Sabban", "imgUrl": "https://files.monday.com/euc1/photos/58193035/small/58193035-user_photo_2024_04_04_15_17_09.png?1712243830" },
                    { "_id": "EtzD4", "fullname": "Mor Marzan", "imgUrl": "https://ca.slack-edge.com/T06BA1MNBK8-U06GT00SQJ3-a496fd1353ec-512" }
                ]
            },
            {
                "_id": "c114",
                "type": "files",
                "title": "Files",
                "data": [
                    { "_id": "sdf124", "file": "https://res.cloudinary.com/dkvliixzt/image/upload/v1704304383/large-Screenshot_2024-01-03_at_11.35.48_qclnrt.png" }
                ]
            },
            { "_id": "c1145", "type": "txt", "title": "Notes" },
            { "_id": "c115", "type": "date", "title": "Due Date" }
        ],
        "groups": [
            {
                "_id": "g201",
                "title": "Part 1: Planning and Design",
                "archivedAt": null,
                "tasks": [
                    {
                        "_id": "c201",
                        "title": "Define Project Scope",
                        "cells": [
                            { "_id": "c111", "type": "status", "dataId": "l205" },
                            { "_id": "c117", "type": "priority", "dataId": "l212" },
                            { "_id": "c112", "type": "members", "dataId": ["EtzD1"] },
                            { "_id": "c114", "type": "files", "dataId": "sdf124" },
                            { "_id": "c1145", "type": "txt", "txt": "Document the project's high-level scope." },
                            { "_id": "c115", "type": "date", "date": new Date().getTime() }
                        ]
                    },
                    {
                        "_id": "c202",
                        "title": "UI/UX Design Mockups",
                        "cells": [
                            { "_id": "c111", "type": "status", "dataId": "l206" },
                            { "_id": "c117", "type": "priority", "dataId": "l213" },
                            { "_id": "c112", "type": "members", "dataId": ["EtzD2", "EtzD4"] },
                            { "_id": "c114", "type": "files", "dataId": "sdf124" },
                            { "_id": "c1145", "type": "txt", "txt": "Complete initial design drafts for review." },
                            { "_id": "c115", "type": "date", "date": new Date().getTime() + 86400000 * 7 } // Plus 7 days
                        ]
                    },
                    // Additional tasks...
                ]
            },
            {
                "_id": "g202",
                "title": "Part 2: Development",
                "archivedAt": null,
                "tasks": [
                    {
                        "_id": "c203",
                        "title": "Frontend Development",
                        "cells": [
                            { "_id": "c111", "type": "status", "dataId": "l207" },
                            { "_id": "c117", "type": "priority", "dataId": "l211" },
                            { "_id": "c112", "type": "members", "dataId": ["EtzD3"] },
                            { "_id": "c114", "type": "files", "dataId": "sdf124" },
                            { "_id": "c1145", "type": "txt", "txt": "Develop the user interface based on approved designs." },
                            { "_id": "c115", "type": "date", "date": new Date().getTime() + 86400000 * 14 } // Plus 14 days
                        ]
                    },
                    // Additional tasks...
                ]
            },
            {
                "_id": "g203",
                "title": "Part 3: Testing and Deployment",
                "archivedAt": null,
                "tasks": [
                    {
                        "_id": "c204",
                        "title": "Quality Assurance Testing",
                        "cells": [
                            { "_id": "c111", "type": "status", "dataId": "l208" },
                            { "_id": "c117", "type": "priority", "dataId": "l213" },
                            { "_id": "c112", "type": "members", "dataId": ["EtzD4", "EtzD1"] },
                            { "_id": "c114", "type": "files", "dataId": "sdf124" },
                            { "_id": "c1145", "type": "txt", "txt": "Conduct comprehensive testing across all major browsers and devices." },
                            { "_id": "c115", "type": "date", "date": new Date().getTime() + 86400000 * 21 } // Plus 21 days
                        ]
                    },
                    // Additional tasks...
                ]
            }
        ]
    }
]

// const gBoards = [
//     {
//       _id: "b101",
//       title: "Robot dev proj",
//       isStarred: false,
//       archivedAt: 1589983468418,
//       createdBy: {
//         _id: "EtzD1",
//         fullname: "Puki Norma",
//         imgUrl: "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png",
//       },
//       clmTypes: [
//         {
//             _id: "c111",
//             type: "status",
//             title: "Status",
//             data: [
//               { id: "l102", title: "Working on it", color: "#fdab3d" },
//               { id: "l103", title: "Stuck", color: "#df2f4a" },
//               { id: "l101", title: "Done", color: "#00c875" },
//               { title: "Will do", id: "l100", color: "#c4c4c4" },
//             ],
//           },
//           {
//             _id: "c116",
//             type: "priority",
//             title: "Priority",
//             data: [
//               { id: "l201", title: "Critical ⚠", color: "#333333" },
//               { id: "l202", title: "High", color: "#401694" },
//               { id: "l203", title: "Medium", color: "#5559df" },
//               { id: "l204", title: "Low", color: "#579bfc" },
//               { id: "l200", color: "#c4c4c4" },
//             ],
//           },
//           {
//             _id: "c112",
//             type: "members",
//             title: "Assigned To",
//             data: [
//               { _id: "EtzD1", fullname: "Eden Gilady", imgUrl: "https://files.monday.com/euc1/photos/58211317/thumb/58211317-user_photo_2024_04_03_12_43_15.png?1712148195" },
//               { _id: "EtzD2", fullname: "Yahav Ganon", imgUrl: "https://files.monday.com/euc1/photos/58211325/thumb_small/58211325-user_photo_2024_04_03_12_41_20.png?1712148081" },
//               { _id: "EtzD3", fullname: "Ran Sabban", imgUrl: "https://files.monday.com/euc1/photos/58193035/small/58193035-user_photo_2024_04_04_15_17_09.png?1712243830" },
//               { _id: "EtzD4", fullname: "Mor Marzan", imgUrl: "https://ca.slack-edge.com/T06BA1MNBK8-U06GT00SQJ3-a496fd1353ec-512" },
//             ],
//           },
//           {
//             _id: "c113",
//             type: "timelines",
//             title: "Timeline",
//             data: [{ _id: "sdf123", startDate: 1703703751234, dueDate: 1703703751345 }],
//           },
//           {
//             _id: "c114",
//             type: "files",
//             title: "Files",
//             data: [{ _id: "sdf124", file: "https://res.cloudinary.com/dkvliixzt/image/upload/v1704304383/large-Screenshot_2024-01-03_at_11.35.48_qclnrt.png" }],
//           },
//           { _id: "c1145", type: "txt", title: "Free text" },
//           { _id: "c115", type: "date", title: "Date" },
//           {
//             _id: "c116",
//             type: "updates",
//             title: "Last Updated",
//             data: [
//               { _id: "1478", fullname: "Yahav Ganon", date: 1703703751234, activity: "Moved" },
//               { _id: "456", fullname: "Eden Gilady", date: 1703703751434, activity: "Added" },
//               { _id: "8965", fullname: "Ran Sabban", date: 1703703751834, activity: "Removed" },
//             ],
//           },
//       ],
//       groups: [
//         {
//             _id: "g101",
//         title: "Group 1 - Planning Phase",
//         tasks: [
//           // Task 1
//           {
//             _id: "t101",
//             title: "Task 1",
//             cells: [
//               { _id: "c111", type: "status", dataId: "l102" },
//               { _id: "c116", type: "priority", dataId: "l201" },
//               { _id: "c112", type: "members", dataId: "EtzD1" },
//               { _id: "c113", type: "timelines", dataId: "sdf123" },
//               { _id: "c114", type: "files", dataId: "sdf124" },
//               { _id: "c1145", type: "txt", txt: "Initial planning phase." },
//               { _id: "c115", type: "date", date: 1589983468418 },
//               { _id: "c116", type: "updates", dataId: "1478" },
//             ],
//             createdBy: { _id: "EtzD1", fullname: "Eden Gilady" },
//           },
//           // Task 2
//           {
//             _id: "t102",
//             title: "Task 2",
//             cells: [
//               { _id: "c111", type: "status", dataId: "l103" },
//               { _id: "c116", type: "priority", dataId: "l202" },
//               { _id: "c112", type: "members", dataId: "EtzD2" },
//               { _id: "c113", type: "timelines", dataId: "sdf123" },
//               { _id: "c114", type: "files", dataId: "sdf124" },
//               { _id: "c1145", type: "txt", txt: "Detailed task breakdown." },
//               { _id: "c115", type: "date", date: 1589983468418 },
//               { _id: "c116", type: "updates", dataId: "456" },
//             ],
//             createdBy: { _id: "EtzD2", fullname: "Yahav Ganon" },
//           },
//           // Additional tasks as needed...
//         ],
//         },
//         {
//           _id: "g102",
//           title: "Group 2 - Development Phase",
//           tasks: [
//             {
//               _id: "t201",
//               title: "Implement Core Features",
//               cells: [
//                 { _id: "c111", type: "status", dataId: "l102" }, // Working on it
//                 { _id: "c116", type: "priority", dataId: "l203" }, // Medium
//                 { _id: "c112", type: "members", dataId: "EtzD3" }, // Ran Sabban
//                 { _id: "c113", type: "timelines", dataId: "sdf123" }, // Placeholder timeline
//                 { _id: "c114", type: "files", dataId: "sdf124" }, // Placeholder file
//                 { _id: "c1145", type: "txt", txt: "Core functionality development." },
//                 { _id: "c115", type: "date", date: 1589983468418 }, // Placeholder date
//                 { _id: "c116", type: "updates", dataId: "456" }, // Eden Gilady update
//               ],
//               createdBy: { _id: "EtzD3", fullname: "Ran Sabban" },
//             },
//             {
//               _id: "t202",
//               title: "UI/UX Design",
//               cells: [
//                 { _id: "c111", type: "status", dataId: "l100" }, // Will do
//                 { _id: "c116", type: "priority", dataId: "l202" }, // High
//                 { _id: "c112", type: "members", dataId: "EtzD4" }, // Mor Marzan
//                 { _id: "c113", type: "timelines", dataId: "sdf123" }, // Placeholder timeline
//                 { _id: "c114", type: "files", dataId: "sdf124" }, // Placeholder file
//                 { _id: "c1145", type: "txt", txt: "Designing the user interface and experience." },
//                 { _id: "c115", type: "date", date: 1589983468418 }, // Placeholder date
//                 { _id: "c116", type: "updates", dataId: "8965" }, // Ran Sabban update
//               ],
//               createdBy: { _id: "EtzD4", fullname: "Mor Marzan" },
//             },
//             // Add more tasks as needed...
//           ],
//         },
//         {
//           _id: "g103",
//           title: "Group 3 - Deployment Phase",
//           tasks: [
//             {
//               _id: "t301",
//               title: "Prepare Production Environment",
//               cells: [
//                 { _id: "c111", type: "status", dataId: "l101" }, // Done
//                 { _id: "c116", type: "priority", dataId: "l201" }, // Critical
//                 { _id: "c112", type: "members", dataId: "EtzD1" }, // Eden Gilady
//                 { _id: "c113", type: "timelines", dataId: "sdf123" }, // Placeholder timeline
//                 { _id: "c114", type: "files", dataId: "sdf124" }, // Placeholder file
//                 { _id: "c1145", type: "txt", txt: "Setting up servers, databases, and services for production." },
//                 { _id: "c115", type: "date", date: 1589983468418 }, // Placeholder date
//                 { _id: "c116", type: "updates", dataId: "1478" }, // Yahav Ganon update
//               ],
//               createdBy: { _id: "EtzD1", fullname: "Eden Gilady" },
//             },
//             {
//               _id: "t302",
//               title: "Launch Product",
//               cells: [
//                 { _id: "c111", type: "status", dataId: "l102" }, // Working on it
//                 { _id: "c116", type: "priority", dataId: "l201" }, // Critical
//                 { _id: "c112", type: "members", dataId: "EtzD2" }, // Yahav Ganon
//                 { _id: "c113", type: "timelines", dataId: "sdf123" }, // Placeholder timeline
//                 { _id: "c114", type: "files", dataId: "sdf124" }, // Placeholder file
//                 { _id: "c1145", type: "txt", txt: "Final checks and product launch activities." },
//                 { _id: "c115", type: "date", date: 1589983468418 }, // Placeholder date
//                 { _id: "c116", type: "updates", dataId: "8965" }, // Ran Sabban update
//               ],
//               createdBy: { _id: "EtzD2", fullname: "Yahav Ganon" },
//             },
//             // Add more tasks as needed...
//           ],
//         },
//       ],
//     },
//   ];

async function query(filterBy = { txt: '', price: 0 }) {
    var boards = await storageService.query(STORAGE_KEY)
    if (!boards.length) {
        boards = gBoards
        _save(STORAGE_KEY, gBoards)
    }
    return boards
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
        // board.owner = userService.getLoggedinUser(),
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
        title: "New Board",
        isStarred: false,
        type: 'item',
        archivedAt: null,
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
                _id: "c115",
                type: "date",
                title: "Date"
            }
        ],
        groups: [
            {
                _id: utilService.makeId(),
                title: "Group Title",
                archivedAt: null,
                tasks: [
                    {
                        _id: utilService.makeId(),
                        title: "Task 1",
                        cells: [
                            {
                                _id: "c111",
                                type: "status",
                                dataId: "l102"
                            },
                            {
                                _id: "c112",
                                type: "members",
                                dataId: ["EtzD1"]
                            },
                            {
                                _id: "c115",
                                type: "date",
                                date: 1589983468418
                            }
                        ],
                        createdBy: {
                            _id: "u102",
                            fullname: "Ran Sabban",
                            imgUrl: "https://files.monday.com/euc1/photos/58193035/small/58193035-user_photo_2024_04_04_15_17_09.png?1712243830"
                        }
                    },
                    {
                        _id: utilService.makeId(),
                        title: "Task 2",
                        cells: [
                            {
                                _id: "c111",
                                type: "status",
                                dataId: "l101"
                            },
                            {
                                _id: "c112",
                                type: "members",
                                dataId: ["EtzD1"]
                            },
                            {
                                _id: "c115",
                                type: "date",
                                date: 1589983468418
                            },
                        ],
                        createdBy: {
                            _id: "u102",
                            fullname: "Ran Sabban",
                            imgUrl: "https://files.monday.com/euc1/photos/58193035/small/58193035-user_photo_2024_04_04_15_17_09.png?1712243830"
                        }
                    },
                    {
                        _id: utilService.makeId(),
                        title: "Task 3",
                        cells: [
                            { _id: "c111", type: "status", dataId: "l100" }, // Working on it
                            { _id: "c112", type: "members", dataId: ["EtzD2"] }, // Yahav Ganon
                            { _id: "c115", type: "date", date: 1589983468418 }, // Example date
                        ],
                        createdBy: {
                            _id: "EtzD2",
                            fullname: "Yahav Ganon",
                            imgUrl: "https://files.monday.com/euc1/photos/58211325/thumb_small/58211325-user_photo_2024_04_03_12_41_20.png?1712148081"
                        }
                    },

                ]
            },
            {
                _id: utilService.makeId(),
                title: "Group title",
                archivedAt: null,
                tasks: [
                    {
                        _id: utilService.makeId(),
                        title: "Task 4",
                        cells: [
                            {
                                _id: "c111",
                                type: "status",
                                dataId: "l100"
                            },
                            {
                                _id: "c112",
                                type: "members",
                                dataId: ["EtzD2"]
                            },
                            {
                                _id: "c115",
                                type: "date",
                                date: 1589983468418
                            }
                        ],
                        createdBy: {
                            _id: "u103",
                            fullname: "Eden Gilady",
                            imgUrl: "https://files.monday.com/euc1/photos/58211317/thumb/58211317-user_photo_2024_04_03_12_43_15.png?1712148195"
                        }
                    },
                    {
                        _id: utilService.makeId(),
                        title: "Task 5",
                        cells: [
                            {
                                _id: "c111",
                                type: "status",
                                dataId: "l100"
                            },
                            {
                                _id: "c112",
                                type: "members",
                                dataId: ["EtzD3"]
                            },
                            {
                                _id: "c115",
                                type: "date",
                                date: 1589983468418
                            }
                        ],
                        createdBy: {
                            _id: "u104",
                            fullname: "Yahav Ganon",
                            imgUrl: "https://files.monday.com/euc1/photos/58211325/thumb_small/58211325-user_photo_2024_04_03_12_41_20.png?1712148081"
                        }
                    }
                ]
            },]
    }
}

async function getEmptyTask(groupId, boardId) {

    const board = await getById(boardId)
    const { clmTypes } = board
    console.log(clmTypes);
    const cells = clmTypes.map(clmType => {
        if (clmType.type === 'status' || clmType.type === 'priority') {
            return { _id: clmType._id, type: clmType.type, dataId: clmType.data[0].id }
        }
        if (clmType.type === 'members') {
            return { _id: clmType._id, type: 'members', dataId: clmType.data[0]._id }
        }
        if (clmType.type === 'timelines') {
            return { _id: clmType._id, type: 'timelines', startDate: 0, endDate: 0 }
        }
        if (clmType.type === 'files') {
            return { _id: clmType._id, type: 'files' }
        }
        if (clmType.type === 'txt') {
            return { _id: clmType._id, type: 'txt', txt: '' }
        }
        if (clmType.type === 'date') {
            return { _id: clmType._id, type: 'date', date: Date.now() }
        }
        if (clmType.type === 'updates') {
            return { _id: clmType._id, type: 'updates', dataId: '1478' }
        }
    })
    return {
        _id: utilService.makeId(),
        title: "New task",
        cells: cells
    }
}

function getById(boardId) {
    return storageService.get(STORAGE_KEY, boardId)
}

async function addGroup(boardId) {
    const board = await getById(boardId)
    console.log(board);
    const group = getEmptyGroup()
    board.groups.push(group)
    console.log(board);
    await save(board)
    console.log(group, board);
    return group
}

async function removeGroup(groupId) {
    console.log(groupId);
    const boards = await storageService.query(STORAGE_KEY)
    const boardsToReturn = boards.map((board) => ({
        ...board, groups: board.groups.filter(group => group._id !== groupId)
    }))
    console.log(boardsToReturn);
    _save(STORAGE_KEY, boardsToReturn)
}

async function addTask(groupId, task) {
    console.log(groupId, task);
    const boards = await storageService.query(STORAGE_KEY)
    boards.map(board => {
        return board.groups.map((group => {
            if (group._id === groupId) {
                group.tasks.push(task)
            }
        }))
    })
    console.log(boards);
    return _save(STORAGE_KEY, boards)
}

async function updateCell(updatedCell, taskId, groupId) {
    const boards = await storageService.query(STORAGE_KEY)
    const updatedBoards = boards.map(board => {
        // No changes to the board itself, but iterate over its groups
        return {
            ...board,
            groups: board.groups.map(group => {
                // Check if this is the group we're modifying
                if (group._id === groupId) {
                    return {
                        ...group,
                        tasks: group.tasks.map(task => {
                            // Check if this is the task we're modifying
                            if (task._id === taskId) {
                                return {
                                    ...task,
                                    cells: task.cells.map(cell => {
                                        // Check if this is the cell we're updating
                                        if (cell._id === updatedCell._id) {
                                            return updatedCell; // Use the updated cell
                                        }
                                        return cell; // Otherwise, return the cell unchanged
                                    })
                                };
                            }
                            return task; // Return tasks that aren't being updated unchanged
                        })
                    };
                }
                return group; // Return groups that aren't being updated unchanged
            })
        };
    });
    _save(STORAGE_KEY, updatedBoards)
}

function getEmptyGroup() {

    return {
        _id: utilService.makeId(),
        title: "Puki",
        archivedAt: null,
        tasks: [
            // {
            //     _id: "c101",
            //     title: "Task 1",
            //     cells: [
            //         {
            //             _id: "c111",
            //             type: "status",
            //             dataId: "l103"
            //         },
            //         {
            //             _id: "c116",
            //             type: "priority",
            //             dataId: "l201"
            //         },
            //         {
            //             _id: "c112",
            //             type: "members",
            //             dataId: ["EtzD1"]
            //         },
            //         {
            //             _id: "c113",
            //             type: "timelines",
            //             dataId: "sdf123"
            //         },
            //         {
            //             _id: "c114",
            //             type: "files",
            //             dataId: "sdf124"
            //         },
            //         {
            //             _id: "c1145",
            //             type: "txt",
            //             txt: "puki"
            //         },
            //         {
            //             _id: "c115",
            //             type: "date",
            //             date: 1589983468418
            //         },
            //         {
            //             _id: "c116",
            //             type: "updates",
            //             dataId: "1478"
            //         }
        ],
        createdBy: {
            _id: "u102",
            fullname: "Ran Sabban",
            imgUrl: "https://files.monday.com/euc1/photos/58193035/small/58193035-user_photo_2024_04_04_15_17_09.png?1712243830"
        }


    }
}

async function updateTask(taskToUpdate, groupId) {
    console.log(taskToUpdate, groupId);
    const boards = await storageService.query(STORAGE_KEY)
    const updatedBoards = boards.map(board => {
        return {
            ...board,
            groups: board.groups.map(group => {
                if (group._id === groupId) {
                    return {
                        ...group,
                        tasks: group.tasks.map(task => {
                            if (task._id === taskToUpdate._id) {
                                return taskToUpdate
                            }
                            return task
                        })
                    }
                }
                return group
            })
        }
    })
    console.log(updatedBoards);
    _save(STORAGE_KEY, updatedBoards)
}

// PRIVATE FUNCS

function _save(entityType, entities) {
    localStorage.setItem(entityType, JSON.stringify(entities))
}

// TEST DATA
// storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 2', price: 980}).then(x => console.log(x))


// EMPTY CELL TEMPLATE:

// cells: [
//     {
//         _id: "c111",
//         type: "status",
//         dataId: "l103"
//     },
//     {
//         _id: "c116",
//         type: "priority",
//         dataId: "l201"
//     },
//     {
//         _id: "c112",
//         type: "members",
//         dataId: ["EtzD1"]
//     },
//     {
//         _id: "c113",
//         type: "timelines",
//         dataId: "sdf123"
//     },
//     {
//         _id: "c114",
//         type: "files",
//         dataId: "sdf124"
//     },
//     {
//         _id: "c1145",
//         type: "txt",
//         txt: "puki"
//     },
//     {
//         _id: "c115",
//         type: "date",
//         date: 1589983468418
//     },
//     {
//         _id: "c116",
//         type: "updates",
//         dataId: "1478"
//     }
// ]




