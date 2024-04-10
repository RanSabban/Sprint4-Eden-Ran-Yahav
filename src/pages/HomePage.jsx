import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Home } from '../services/svg.service'
import { TimelinePicker } from '../cmps/Board/reusableCmps/TimelinePicker'
import { EditableCmp } from '../cmps/Board/reusableCmps/EditableCmp'



export function HomePage() {

    return (
        <section className='home-page'>
            <TimelinePicker/>
            <EditableCmp txt={'Hello'} />
        </section >
    )
}