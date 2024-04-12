import { useEffect, useState } from "react";

export function GroupStatistics({ tasks, clmTypes }) {
    const [statusStats, setStatusStats] = useState({});
    const [priorityStats, setPriorityStats] = useState({});

    useEffect(() => {
        const statusCounts = getMapCounts('status');
        const priorityCounts = getMapCounts('priority');
        const totalStatus = Object.values(statusCounts).reduce((acc, count) => acc + count, 0);
        const totalPriority = Object.values(priorityCounts).reduce((acc, count) => acc + count, 0);

        const statusPercentages = mapCountsToPercentages(statusCounts, totalStatus);
        const priorityPercentages = mapCountsToPercentages(priorityCounts, totalPriority);

        setStatusStats(statusPercentages);
        setPriorityStats(priorityPercentages);
    }, [tasks]); // Dependency array includes tasks to recalculate when tasks change

    function getMapCounts(type) {
        const counts = {};
        tasks.forEach(task => {
            task.cells.forEach(cell => {
                if (cell.type === type) {
                    counts[cell.dataId] = (counts[cell.dataId] || 0) + 1;
                }
            });
        });
        return counts;
    }

    function mapCountsToPercentages(counts, total) {
        return Object.keys(counts).reduce((acc, key) => {
            acc[key] = (counts[key] / total * 100).toFixed(2) + '%'; // Converts to percentage string
            return acc;
        }, {});
    }

    return (
        <div className="list-item statistics">
            <div className="group-statistics-fill"
                style={{ gridColumn: '1/3', height: '100%', position: 'sticky', left: '0', background: 'white' }}>
            </div>
            {clmTypes.map(clmType => {
                if (clmType.type === 'status' || clmType.type === 'priority') {
                    return (
                        <div key={clmType._id}
                            className="stats-cell-container"
                            style={{ padding: '2px' }}
                        >
                            <div style={{ display: 'flex' }}>
                                {clmType.data.map(item => {
                                    const stats = clmType.type === 'status' ? statusStats : priorityStats
                                    const width = stats[item.id] || '0%'
                                    return (
                                        <div key={item.id} style={{
                                            width: width,
                                            height: '20px',
                                            backgroundColor: item.color,
                                            // margin: '2px'
                                        }} title={`${item.title}: ${width}`}></div>
                                    );
                                })}
                            </div>
                        </div>
                    );
                } else {
                    return <div className="stats-fill-cell" >

                    </div>;
                }
            })}

        </div>
    );
}

