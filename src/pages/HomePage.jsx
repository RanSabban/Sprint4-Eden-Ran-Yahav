import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Home } from '../services/svg.service'
import { TimelinePicker } from '../cmps/Board/reusableCmps/TimelinePicker'
import { EditableCmp } from '../cmps/Board/reusableCmps/EditableCmp'
import { ResizableGrid } from '../cmps/Board/ResizableGrid'



export function HomePage() {

    return (
        <section className='home-page'>

            <ResizableGrid/>
            {/* <TimelinePicker/> */}
        </section >
    )
}