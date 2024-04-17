import { useState, useEffect } from 'react'
import { userService } from '../services/user.service'
import { login } from '../store/actions/user.actions'
import { useDispatch } from 'react-redux'

export function LoginSignup(props) {
    const [credentials, setCredentials] = useState({ username: '', password: '' })
    const [isSignup, setIsSignup] = useState(false)
    const [users, setUsers] = useState([])
    const dispatch = useDispatch()

    useEffect(() => {
        loadUsers()
        console.log(users)
        console.log(credentials);

    }, [credentials])

    async function loadUsers() {
        const users = await userService.getUsers()
        setUsers(users)
    }

    function handleChange(ev) {
        ev.preventDefault()
        const { name, value } = ev.target
        setCredentials(prev => ({ ...prev, [name]: value }))
        console.log(credentials)
    }

    async function onLogin(ev, username) {
        if (ev) ev.preventDefault()
        console.log("Login attempt with:", { username, password: credentials.password })
        try {

            const userCredentials = {
                username: username || credentials.username,
                password: credentials.username === 'guest' ? 'guest' : credentials.password
            }

            if (!userCredentials.username) {
                return console.log("Username is empty")
            }
            await dispatch(login(userCredentials))
            clearState()
        } catch (err) {
            console.log(err);
        }
    }

    function clearState() {
        setCredentials({ username: '', password: '' })
        setIsSignup(false)
    }

    function toggleSignup() {
        setIsSignup(!isSignup)
    }

    return (
        <div className="login-signup">
            <p>
                <button className="btn-link" onClick={toggleSignup}>{!isSignup ? 'Signup' : 'Login'}</button>
            </p>
            {!isSignup && <form className="login-form" onSubmit={onLogin}>
                {/* <select
                    name="username"
                    value={credentials.username}
                    onChange={handleChange}
                >
                    <option value="">Log in as:</option>
                    {users.map(user => <option key={user._id} value={user.username} onChange={onLogin}>{user.fullname}</option>)}
                </select> */}

                <input
                    type="text"
                    name="username"
                    value={credentials.username}
                    placeholder="UserName"
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    value={credentials.password}
                    placeholder="Password"
                    onChange={handleChange}
                    required
                />
                <button type='submit'>boom</button>
            </form>}
        </div>
    )
}
