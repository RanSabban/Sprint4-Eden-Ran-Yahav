import { storageService } from './async-storage.service'
import { httpService } from './http.service'

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'

export const userService = {
    login,
    logout,
    signup,
    getLoggedinUser,
    saveLocalUser,
    getUsers,
    getById,
    remove,
    update,
    sendMessageToSlack
}

window.userService = userService


async function getUsers() {
    // return storageService.query('user')
    const users = httpService.get(`user`)
    // console.log(users);
    return users
}



async function getById(userId) {
    // const user = await storageService.get('user', userId)
    const user = await httpService.get(`user/${userId}`)
    return user
}

function remove(userId) {
    // return storageService.remove('user', userId)
    return httpService.delete(`user/${userId}`)
}

async function update({ _id, score }) {
    // const user = await storageService.get('user', _id)
    // user.score = score
    // await storageService.put('user', user)

    const user = await httpService.put(`user/${_id}`, { _id, score })

    // When admin updates other user's details, do not update loggedinUser
    if (getLoggedinUser()._id === user._id) saveLocalUser(user)
    return user
}

async function login(userCred) {
    // const users = await storageService.query('user')
    // const user = users.find(user => user.username === userCred.username)
    try {

        const user = await httpService.post('auth/login', userCred)
        if (user) return saveLocalUser(user)
    } catch (err) {
        throw new Error(err.message || 'An err occurred during login')
    }
}

async function signup(userCred) {
    if (!userCred.imgUrl) userCred.imgUrl = 'https://res.cloudinary.com/dkvliixzt/image/upload/v1704358773/person-empty_zckbtr_wrffbw.svg'
    // const user = await storageService.post('user', userCred)
    const user = await httpService.post('auth/signup', userCred)
    return saveLocalUser(user)
}

async function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
    return await httpService.post('auth/logout')
}

function saveLocalUser(user) {
    user = { _id: user._id, fullname: user.fullname, imgUrl: user.imgUrl, score: user.score, isAdmin: user.isAdmin }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

async function sendMessageToSlack(message) {
    try {
        // Use the httpService to send the POST request
        const result = await httpService.post('slack/message', { message });
        console.log('Message sent:', result);
        return result;
    } catch (error) {
        console.error('Error sending message to Slack:', error);
        throw error;  // It's good practice to rethrow errors in case the calling function needs to handle it further.
    }
}

// Example usage
// sendMessageToSlack('Hello, Slack from my Frontend!');

// ; (async () => {
//     // await userService.signup({fullname: 'Puki Norma', username: 'puki', password:'123',score: 10000, isAdmin: false})
//     // await userService.signup({fullname: 'Master Adminov', username: 'admin', password:'123', score: 10000, isAdmin: true})
//     // await userService.signup({fullname: 'Muki G', username: 'muki', password:'123', isAdmin: true})
//     // userService.signup({ username: 'mukida', fullname: 'muki', password: 'muki1', isAdmin: true })
// })()



