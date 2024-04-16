import { useEffect, useState } from "react"

export function useScreenWidth() {
    const [width, setWidth] = useState(window.innerWidth)

    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth)
        window.addEventListener('resize', handleResize)
        console.log(width)
        return () => window.removeEventListener('resize', handleResize)

    }, [window.innerWidth])

    return width
}