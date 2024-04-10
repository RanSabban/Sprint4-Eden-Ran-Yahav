import React from 'react'
import { Routes, Route } from 'react-router'

import { AppHeader } from './cmps/AppHeader'
import { AppFooter } from './cmps/AppFooter'
import { UserDetails } from './pages/UserDetails'
import { BoardIndex } from './pages/BoardIndex'
import { HomePage } from './pages/HomePage'

export function RootCmp() {

    return (
        <>
            <AppHeader />
            <Routes>
                <Route element= {<HomePage />} path='/' />
                <Route element= {<BoardIndex />} path='/board' />
                <Route element= {<BoardIndex />} path='/board/:boardId' />
            </Routes>
            <AppFooter />
        </>
    )
}


