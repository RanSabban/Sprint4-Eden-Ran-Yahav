import React from 'react'
import { Routes, Route, useLocation } from 'react-router'

import { AppHeader } from './cmps/AppHeader'
import { AppFooter } from './cmps/AppFooter'
import { UserDetails } from './pages/UserDetails'
import { BoardIndex } from './pages/BoardIndex'
import { HomePage } from './pages/HomePage'
import { BoardHome } from './cmps/Board/BoardHome'
import { BoardDetails } from './cmps/Board/BoardDetails'
import { Activity } from './cmps/Acttivity'
import { LoginPage } from './pages/LoginPage'

export function RootCmp() {
    const location = useLocation()
    const showHeaderFooter = location.pathname !== '/users'

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

