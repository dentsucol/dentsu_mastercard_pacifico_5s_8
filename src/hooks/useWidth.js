
import { useEffect, useState } from 'react'

function useWidth() {
    const [width, setWindowWidth] = useState(0);

    useEffect(() => {
        updateDimensions()
        window.addEventListener('resize', updateDimensions)
        return () => {
            window.removeEventListener('resize', updateDimensions)
        }
    }, [])

    const updateDimensions = () => {
        const width = window.innerWidth
        setWindowWidth(width)
    }

    return {width}
}

export default useWidth