import { useEffect, useState } from "react"
import { utilService } from "../../services/util.service"
import { Tooltip } from "monday-ui-react-core"

export function GroupStatistics({ tasks, clmTypes }) {
    const [statusStats, setStatusStats] = useState({})
    const [priorityStats, setPriorityStats] = useState({})

    useEffect(() => {
        const statusCounts = getMapCounts('status')
        const priorityCounts = getMapCounts('priority')
        const totalStatus = Object.values(statusCounts).reduce((acc, count) => acc + count, 0)
        const totalPriority = Object.values(priorityCounts).reduce((acc, count) => acc + count, 0)

        const statusPercentages = mapCountsToPercentages(statusCounts, totalStatus)
        const priorityPercentages = mapCountsToPercentages(priorityCounts, totalPriority)

        setStatusStats(statusPercentages)
        setPriorityStats(priorityPercentages)
    }, [tasks])

    function getMapCounts(type) {
        const counts = {}
        tasks.forEach(task => {
            task.cells.forEach(cell => {
                if (cell.type === type) {
                    counts[cell.dataId] = (counts[cell.dataId] || 0) + 1
                }
            })
        })
        return counts
    }

    function mapCountsToPercentages(counts, total) {
        return Object.keys(counts).reduce((acc, key) => {
            acc[key] = (counts[key] / total * 100).toFixed(2) + '%'
            return acc
        }, {})
    }

    return (
        <div className="list-item statistics" key={utilService.makeId()}>

            <div className="group-statistics-fill"
                style={{ gridColumn: '1/3', position: 'sticky', left: '0', background: 'white' }}>
            </div>
            {clmTypes.map((clmType, index) => {
                if (clmType.type === 'status' || clmType.type === 'priority') {
                    return (
                        <div key={JSON.stringify(clmType)}
                            className="stats-cell-container"
                            style={{ padding: '2px' }}
                        >
                            <div style={{ display: 'flex' }} key={utilService.makeId()} className="stats-clrs-container">
                                {clmType.data.map((item, index) => {
                                    const stats = clmType.type === 'status' ? statusStats : priorityStats
                                    const width = stats[item.id] || '0%'
                                    return (
                                        <Tooltip
                                            content={(item.title || ' ') + ' ' + width}>
                                            <div key={index} style={{
                                                width: width,
                                                backgroundColor: item.color,
                                            }} name={`${item.title}: ${width}`}></div>
                                        </Tooltip>
                                    )
                                })}
                            </div>
                        </div>
                    )
                } else {
                    return <div className="stats-fill-cell" >

                    </div>
                }
            })}
            <div className='dyn-cell infinity'>

            </div>
        </div>
    )
}

