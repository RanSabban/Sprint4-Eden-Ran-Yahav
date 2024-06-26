import { Link, NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
// import logo from '../assets/img/oneday-logo.png'
import logo from '/img/oneday-logov2.png'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { login, logout, signup } from '../store/actions/user.actions.js'
import { LoginSignup } from './LoginSignup.jsx'
import { Help, Inbox, Invite, Notifications, Search } from 'monday-ui-react-core/icons'
import { Avatar, Badge, Button, Menu, MenuItem, Tooltip } from 'monday-ui-react-core'
import { UserMsg } from './UserMsg.jsx'
import { useState } from 'react'
import { logoutUser } from '../services/svg.service.jsx'


export function AppHeader() {
    const [isLogout, setIsLogout] = useState(false)
    let user = useSelector(storeState => storeState.userModule.loggedInUser)
    // console.log('user', user);
    
    if(user === null){
       let credentials = {
        username: 'guest',
        password: 'guest'
    }
        user = onLogin(credentials)
    }

    async function onLogin(credentials) {
        try {
            const user = await login(credentials)
            // showSuccessMsg(`Welcome: ${user.fullname}`)
        } catch (err) {
            showErrorMsg('Cannot login')
            user = onLogin(credentials)
        }
    }
    async function onSignup(credentials) {
        try {
            const user = await signup(credentials)
            // showSuccessMsg(`Welcome new user: ${user.fullname}`)
        } catch (err) {
            showErrorMsg('Cannot signup')
        }
    }
    async function onLogout() {
        try {
            await logout()
            // showSuccessMsg(`Bye now`)

        } catch (err) {
            showErrorMsg('Cannot logout')
        }
    }

    return (
        <header className="main-header">
            <div className='logo'>
                <Link to='/'>
                    <img alt="oneday.com logo" src={logo}></img>
                </Link>
            </div>

            <nav className='nav-container'>



                <Tooltip content='Notifications' animationType="expand">

                    <Button
                        className="btn"
                        kind="tertiary"
                        // onClick={() => console.log('m-list')}
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
                        // onClick={() => console.log('m-list')}
                        size="sm"
                    >
                        <Inbox />
                    </Button>
                </Tooltip>

                <Tooltip content='Invite' animationType="expand">
                    <Button
                        className="btn"
                        kind="tertiary"
                        // onClick={() => console.log('m-list')}
                        size="sm"
                    >
                        <Invite />
                    </Button>
                </Tooltip>

                <Tooltip content='Search' animationType="expand">
                    <Button
                        className="btn"
                        kind="tertiary"
                        // onClick={() => console.log('m-list')}
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
                        // onClick={() => console.log('m-list')}
                        size="sm"
                        style={{ lineHeight: '0.5em' }}
                    >
                        <Help />
                    </Button>
                </Tooltip>

                <Tooltip content='' animationType="expand">
                    <Button
                        className="btn"
                        kind="tertiary"
                        size="sm"
                    >

                        <span onClick={() => setIsLogout(!isLogout)}> <Avatar size={Avatar.sizes.MEDIUM}
                            style={{ lineHeight: '0.5em' }}
                            src={user.imgUrl || "https://files.monday.com/euc1/photos/58211325/thumb_small/58211325-user_photo_2024_04_03_12_41_20.png?1712148081"}
                            // src={user.imgUrl}
                            withoutBorder
                            type={Avatar.types.IMG}
                            ariaLabel={user.fullname || 'Yahav Ganon'} /> </span>

                    </Button>
                </Tooltip>

                <div style={{ display: isLogout ? 'flex' : 'none' }} className="logout-check" >

                    {logoutUser()}
                    <Menu id="menu" size="large" style={{ height: "30px" }} >
                        <MenuItem onClick={() => onLogout()} title={"Logout"} />
                    </Menu>
                </div>





            </nav>
            {/* <LoginSignup/> */}
            {/* <UserMsg /> */}
        </header>

    )
}