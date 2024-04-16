import React, { useEffect, useRef } from 'react'
import { Routes, Route, useLocation } from 'react-router'

import { AppHeader } from './cmps/AppHeader'
import { AppFooter } from './cmps/AppFooter'
import { UserDetails } from './pages/UserDetails'
import { BoardIndex } from './pages/BoardIndex'
import { HomePage } from './pages/HomePage'
import { BoardHome } from './cmps/Board/BoardHome'
import { BoardDetails } from './cmps/Board/BoardDetails'
import { Activity } from './cmps/Activity'
import { LoginPage } from './pages/LoginPage'

export function RootCmp() {
    const location = useLocation()
    const showHeaderFooter = location.pathname !== '/users' && location.pathname !== '/';
    const isSurprisePrinted = useRef(false)

    useEffect(() => {
        logSurpriseMsg()
    }, [])

    function logSurpriseMsg() {
        if (isSurprisePrinted.current) return;
        console.log(
            `%cLooking for web developers?\n%cWe're looking for a job. Contact us!\n\n` +
            `%cEden Gilady: \n%chttps://www.linkedin.com/in/eden-gilady/\n` +
            `%cRan Sabban: \n%chttps://www.linkedin.com/in/ran-sabban-36b57a210/\n` +
            `%cYahav Ganon: \n%chttps://www.linkedin.com/in/yahavganon\n`,
            "color: #F85FFE; font-size:24px;", 
            "color: #ffca00; font-size:14px;",
            "color: #FC7870; font-size:16px;",
            "color: #ffca00; font-size:14px;",
            "color: #00c875; font-size:16px;",
            "color: #ffca00; font-size:14px;",
            "color: #52A5F5; font-size:16px;",
            "color: #ffca00; font-size:14px;"
        )

        isSurprisePrinted.current = true
    }

    return (
        <>
            {showHeaderFooter && <AppHeader />}
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/board' element={<BoardIndex />}>
                    <Route index element={<BoardHome />} />
                    <Route path=':boardId' element={<BoardDetails />}>
                        <Route path='task/:taskId' element={<Activity />} />
                    </Route>
                </Route>
                <Route path='/users' element={<LoginPage />} />
            </Routes>
            {showHeaderFooter && <AppFooter />}
        </>
    )
}

