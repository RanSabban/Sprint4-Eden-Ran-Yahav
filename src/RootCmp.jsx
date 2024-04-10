import React from 'react'
import { Routes, Route } from 'react-router'

import { AppHeader } from './cmps/AppHeader'
import { AppFooter } from './cmps/AppFooter'
import { UserDetails } from './pages/UserDetails'
import { BoardIndex } from './pages/BoardIndex'
import { HomePage } from './pages/HomePage'
import { BoardHome } from './cmps/Board/BoardHome'
import { BoardDetails } from './cmps/Board/BoardDetails'
import { Activity } from './cmps/Acttivity'

export function RootCmp() {

    return (
        <>
            <AppHeader />
            <Routes>
                <Route path='/' element={<HomePage />}>
                    <Route index element={<HomePage />} />
                    {/* You can place other nested routes for HomePage if needed */}
                </Route>

                <Route path='/board' element={<BoardIndex />}>
                    <Route index element={<BoardHome />} />
                    <Route path=':boardId' element={<BoardDetails />}>
                        <Route path='task/:taskId' element={<Activity />} />
                    </Route>
                </Route>
            </Routes>
            <AppFooter />
        </>
    )
}


