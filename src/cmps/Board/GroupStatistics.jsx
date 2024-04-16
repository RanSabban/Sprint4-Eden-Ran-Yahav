import { useEffect, useState } from "react"
import { utilService } from "../../services/util.service"
import { Tooltip } from "monday-ui-react-core"

export function GroupStatistics({ tasks, clmTypes, isCollapsed, groupColor }) {
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
    // const style = !isCollapsed ?
    //     { gridColumn: '1/3', position: 'sticky', left: '0', background: 'white' } :
    //     {
    //         borderLeft: `0.4em solid ${groupColor}`,
    //     }
    // }
    // const style = !isCollapsed ? borderLeft: `0.4em solid ${groupColor}`
        


    return (

        <div className="list-item statistics">

            <div className={`group-statistics-fill ${isCollapsed ? 'collapsed' : ''}`}  style={{borderLeft: `0.4em solid ${groupColor}`}}><span>{isCollapsed && `${tasks.length} Tasks`}</span></div>

            {clmTypes.map((clmType, index) => {
                if (clmType.type === 'status' || clmType.type === 'priority') {
                    return (
                        <div key={JSON.stringify(clmType._id)} className="stats-cell-container" style={!isCollapsed ? { padding: '2px' } : {}}>
                            <div style={{ display: 'flex' }} className="stats-clrs-container">
                                {clmType.data.map((item, index) => {
                                    const stats = clmType.type === 'status' ? statusStats : priorityStats
                                    const width = stats[item.id] || '0%'
                                    return (
                                        <Tooltip key={JSON.stringify(item.title)} content={`${item.title|| ' '}: ${width}`}>
                                            <div style={{
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
                    return <div key={JSON.stringify(clmType.type)} className="stats-fill-cell"></div>
                }
            })}
            <div className='dyn-cell infinity'></div>
        </div>

    )
}

