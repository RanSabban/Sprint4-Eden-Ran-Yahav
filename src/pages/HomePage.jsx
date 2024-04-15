import React from 'react'
import logo from '../assets/img/oneday-logo.png'
// import { Link } from 'react-router-dom'
import { Link } from 'react-router-dom'



export function HomePage() {


    return (
        <section className='home-page'>
            <header className='home-header'>
                <div className='logo'>
                    <img alt="oneday.com logo" src={logo}></img>
                </div>
                <div className="home-actions">
                <Link to={'/users'}>  <button className='login-btn'>Login</button> </Link>
                    <Link to={'/board'}> <button className='cta-btn'>Get Started</button> </Link>
                </div>
            </header>
            <section className='hero-header'>
                <h1>Your go-to work platform</h1>
                <sub>
                    <h2>Run all your work on one platform with customizable</h2>
                    <h2>products that scale with your needs.</h2>
                </sub>
                <img src="../assets/img/home/wm-dark.png" alt="" srcset="" />
            </section>
            <section className='welcome-section'>

                <article className="card"><img className='img-welcome' src="https://myday-p034.onrender.com/img/home_page/CreativeDesignImg.png" alt="" /><span>Creative &amp; design</span></article>
                <article className="card"><img className='img-welcome' src="https://myday-p034.onrender.com/img/home_page/OperationsImg.png" alt="" /><span>Operations</span></article>
                <article className="card"><img className='img-welcome' src="https://myday-p034.onrender.com/img/home_page/MarketingImg.png" alt="" /><span>Marketing</span></article>
                <article className="card"><img className='img-welcome' src="https://myday-p034.onrender.com/img/home_page/ProjectManagementImg.png" alt="" /><span>Project management</span></article>
                <article className="card"><img className='img-welcome' src="https://myday-p034.onrender.com/img/home_page/TaskManagementImg.png" alt="" /><span>Task management</span></article>
                <article className="card"><img className='img-welcome' src="https://myday-p034.onrender.com/img/home_page/HRImg.png" alt="" /><span>HR</span></article>
                <article className="card"><img className='img-welcome' src="https://myday-p034.onrender.com/img/home_page/ITImg.png" alt="" /><span>IT</span></article>
                <article className="card"><img className='img-welcome' src="https://myday-p034.onrender.com/img/home_page/MoreWorkflowsImg.png" alt="" /><span>More workflows</span></article>

            </section>
            <section className='btn-container'>

                <Link to={'/board'}> <button className='cta-button'>Get Started</button> </Link>

                <p class="no-credit-card-txt">No credit card needed<span>✦</span>Unlimited time on Free plan</p>

            </section>
            <img src="	https://myday-p034.onrender.com/img/home_page/HomeAppPreviewImg.avif
" alt="" />
<section className="sponsers-section"><div className="sponsers-imgs-container"><img style={{width: '6.875em'}} src="https://myday-p034.onrender.com/img/home_page/HoltCatImg.avif" alt=""/><img style={{width: '6.875em'}} src="https://myday-p034.onrender.com/img/home_page/CanvaImg.png" alt=""/><img style={{width: '6.875em'}} src="https://myday-p034.onrender.com/img/home_page/CocaColaImg.png" alt=""/><img style={{width:  '4.375em'}} className="oxy-img" src="https://myday-p034.onrender.com/img/home_page/OxyImg.png
" alt=""/><img style={{width: '6.875em'}} src="https://myday-p034.onrender.com/img/home_page/LionsgateImg.png" alt=""/><img style={{width: '4.375em'}} className="carrefour-img" src="https://myday-p034.onrender.com/img/home_page/CarrefourImg.png" alt=""/><img style={{width: '6.875em'}} src="https://myday-p034.onrender.com/img/home_page/BdImg.png" alt=""/><img style={{width: '6.875em'}} src="	https://myday-p034.onrender.com/img/home_page/GlossierImg.png" alt=""/><img style={{width: '6.875em'}} src="https://myday-p034.onrender.com/img/home_page/UniversalImg.png" alt=""/></div></section>

<section className="boost-your-team flex"><div className="flex justify-center"><h2>The Work OS that lets you shape workflows, your way</h2><div className="boost-your-team-cta flex column"><span className='span'>Boost your team’s alignment, efficiency, and productivity by customizing any workflow to fit your needs.</span><div className="flex"> <Link to={'/board'}><button className="cta-button">Get Started  <svg className="arrow-icon" width="14" height="10" viewBox="0 0 9 7" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M4.628.616a.5.5 0 1 0-.64.768L6.203 3.23H.5a.5.5 0 0 0 0 1h5.612L3.988 6a.5.5 0 1 0 .64.769l3.23-2.693a.5.5 0 0 0 0-.768L4.628.616z" fill="#FFFFFF"></path></svg></button> </Link></div></div></div></section>

<img alt="2Retrospectives" className="main-image" src="https://dapulse-res.cloudinary.com/image/upload/f_auto,q_auto/Generator_featured images/Homepage - 2024/usescases3/2Retrospectives.png"></img>
        
<section className="footer-section-full"><h2>Deliver your best work <span>with oneday.com</span></h2><p className='p-home'>No credit card needed   <span>✦</span>   Unlimited time on Free plan</p>  <Link to={'/board'}> <button className='cta-button'>Get Started <svg className="arrow-icon" width="14" height="10" viewBox="0 0 9 7" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M4.628.616a.5.5 0 1 0-.64.768L6.203 3.23H.5a.5.5 0 0 0 0 1h5.612L3.988 6a.5.5 0 1 0 .64.769l3.23-2.693a.5.5 0 0 0 0-.768L4.628.616z" fill="#FFFFFF"></path></svg></button> </Link></section>

        </section >
    )
}