import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Home } from '../services/svg.service'
import { TimelinePicker } from '../cmps/Board/reusableCmps/TimelinePicker'



export function HomePage() {

    return (
        <section className='home-page'>
            <TimelinePicker/>
        </section >
    )
}