import loginImage from '../../src/assets/img/login.png';

export function LoginPage() {
    return (
        <section className="login-page">
            <section className='login-signup'>
                <article>
                <h1>Welcome to oneday.com</h1>
                <p>Get started = it's free. No credit card needed</p>
                </article>
            </section>


            <aside className='img-container' >
                <img src={loginImage} alt="loginImage" />
            </aside>
        </section>
    )
}