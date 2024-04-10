import { Link, NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { login, logout, signup } from '../store/actions/user.actions.js'
import { LoginSignup } from './LoginSignup.jsx'
import { Help, Inbox, Invite, Notifications, Search } from 'monday-ui-react-core/icons'
import { Avatar, Badge, Button } from 'monday-ui-react-core'
import { Tooltip } from '@mui/material'

export function AppHeader() {
    const user = useSelector(storeState => storeState.userModule.user)

    async function onLogin(credentials) {
        try {
            const user = await login(credentials)
            showSuccessMsg(`Welcome: ${user.fullname}`)
        } catch (err) {
            showErrorMsg('Cannot login')
        }
    }
    async function onSignup(credentials) {
        try {
            const user = await signup(credentials)
            showSuccessMsg(`Welcome new user: ${user.fullname}`)
        } catch (err) {
            showErrorMsg('Cannot signup')
        }
    }
    async function onLogout() {
        try {
            await logout()
            showSuccessMsg(`Bye now`)
        } catch (err) {
            showErrorMsg('Cannot logout')
        }
    }

    return (
        <header className="app-header">
            <div className='logo'>
                <img alt="monday.com logo" src="https://dapulse-res.cloudinary.com/image/upload/f_auto,q_auto/remote_mondaycom_static/img/monday-logo-x2.png"></img>
            </div>

            <nav className='nav-container'>



                <Tooltip content='Notifications' animationType="expand">

                    <Button
                        className="btn"
                        kind="tertiary"
                        onClick={() => console.log('m-list')}
                        size="sm"
                    >
                    <Badge alignment={Badge.alignments.CIRCULAR}>
                            <Notifications className='flex' />
                        </Badge>
                    </Button>
                </Tooltip>

                <Tooltip content='Inbox' animationType="expand">
                    <Button
                        className="btn"
                        kind="tertiary"
                        onClick={() => console.log('m-list')}
                        size="sm"
                    >
                        <Inbox />
                    </Button>
                </Tooltip>

                <Tooltip content='Invite' animationType="expand">
                    <Button
                        className="btn"
                        kind="tertiary"
                        onClick={() => console.log('m-list')}
                        size="sm"
                    >
                        <Invite />
                    </Button>
                </Tooltip>

                <Tooltip content='Search' animationType="expand">
                    <Button
                        className="btn"
                        kind="tertiary"
                        onClick={() => console.log('m-list')}
                        size="sm"
                    >
                        <Search />
                    </Button>
                </Tooltip>

                <div className="separator"></div>

                <Tooltip content='Help' animationType="expand">
                    <Button
                        className="btn"
                        kind="tertiary"
                        onClick={() => console.log('m-list')}
                        size="sm"
                    >
                        <Help />
                    </Button>
                </Tooltip>

                <Tooltip content='Help' animationType="expand">
                    <Button
                        className="btn"
                        kind="tertiary"
                        onClick={() => console.log('m-list')}
                        size="sm"
                    >
                        <Avatar size={Avatar.sizes.MEDIUM}
                            src="https://files.monday.com/euc1/photos/58211325/thumb_small/58211325-user_photo_2024_04_03_12_41_20.png?1712148081"
                            withoutBorder
                            type={Avatar.types.IMG}
                            ariaLabel="Eden Gilady" />
                    </Button>
                </Tooltip>





            </nav>
        </header>
    )
}