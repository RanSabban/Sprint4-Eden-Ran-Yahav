import React from 'react'
// import logo from '../assets/img/oneday-logo.png'
import logo from '/img/oneday-logov2.png'

// import { Link } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { ArrowRightHome } from '../services/svg.service'



export function HomePage() {


    return (
        <section className='home-page'>
            <header className='home-header'>
                <div className='logo'>
                    <img alt="oneday.com logo" src={logo}></img>
                </div>
                <div className="home-actions">
                    <Link to={'/user'}>  <button className='login-btn'>Login</button> </Link>
                    <Link to={'/board'}>  <button className='cta-button'>Get Started  <ArrowRightHome className='arrow-icon' /></button> </Link>
                </div>
            </header>
            <section className='hero-header'>
                <h1>Your go-to work platform</h1>
                <sub>
                    <h2>Run all your work on one platform with customizable</h2>
                    <h2>products that scale with your needs.</h2>
                </sub>
            </section>
            <section className='welcome-section'>

                <article className="card card1"><img className='img-welcome' src="https://myday-p034.onrender.com/img/home_page/CreativeDesignImg.png" alt="" /><span>Creative &amp; design</span></article>
                <article className="card card2"><img className='img-welcome' src="https://myday-p034.onrender.com/img/home_page/OperationsImg.png" alt="" /><span>Operations</span></article>
                <article className="card card3"><img className='img-welcome' src="https://myday-p034.onrender.com/img/home_page/MarketingImg.png" alt="" /><span>Marketing</span></article>
                <article className="card card1"><img className='img-welcome' src="https://myday-p034.onrender.com/img/home_page/ProjectManagementImg.png" alt="" /><span>Project management</span></article>
                <article className="card card2"><img className='img-welcome' src="https://myday-p034.onrender.com/img/home_page/TaskManagementImg.png" alt="" /><span>Task management</span></article>
                <article className="card card3"><img className='img-welcome' src="https://myday-p034.onrender.com/img/home_page/HRImg.png" alt="" /><span>HR</span></article>
                <article className="card card1"><img className='img-welcome' src="https://myday-p034.onrender.com/img/home_page/ITImg.png" alt="" /><span>IT</span></article>
                <article className="card card2"><img className='img-welcome' src="https://myday-p034.onrender.com/img/home_page/MoreWorkflowsImg.png" alt="" /><span>More workflows</span></article>

            </section>
            <section className='btn-container'>

                <Link to={'/board'}> <button style={{marginBottom: '1em', width: '150px', height: '50px'}} className='cta-button'>Get Started  <ArrowRightHome className='arrow-icon' /></button> </Link>

                <p className="no-credit-card-txt">No credit card needed<span>✦</span>Unlimited time on Free plan</p>

            </section>
            <img src="	https://myday-p034.onrender.com/img/home_page/HomeAppPreviewImg.avif
" alt="" />
            <section className="sponsers-section"><div className="sponsers-imgs-container"><img style={{ width: '6.875em' }} src="https://myday-p034.onrender.com/img/home_page/HoltCatImg.avif" alt="" /><img style={{ width: '6.875em' }} src="https://myday-p034.onrender.com/img/home_page/CanvaImg.png" alt="" /><img style={{ width: '6.875em' }} src="https://myday-p034.onrender.com/img/home_page/CocaColaImg.png" alt="" /><img style={{ width: '4.375em' }} className="oxy-img" src="https://myday-p034.onrender.com/img/home_page/OxyImg.png
" alt="" /><img style={{ width: '6.875em' }} src="https://myday-p034.onrender.com/img/home_page/LionsgateImg.png" alt="" /><img style={{ width: '4.375em' }} className="carrefour-img" src="https://myday-p034.onrender.com/img/home_page/CarrefourImg.png" alt="" /><img style={{ width: '6.875em' }} src="https://myday-p034.onrender.com/img/home_page/BdImg.png" alt="" /><img style={{ width: '6.875em' }} src="	https://myday-p034.onrender.com/img/home_page/GlossierImg.png" alt="" /><img style={{ width: '6.875em' }} src="https://myday-p034.onrender.com/img/home_page/UniversalImg.png" alt="" /></div></section>

            <section className="boost-your-team flex"><div className="flex justify-center"><h2 className='h2-welcome'>The Work OS that lets you shape workflows, your way</h2><div className="boost-your-team-cta flex column"><span className='span'>Boost your team’s alignment, efficiency, and productivity by customizing any workflow to fit your needs.</span><div className="flex"> <Link to={'/board'}><button className="cta-button">Get Started  <ArrowRightHome className='arrow-icon' /></button> </Link></div></div></div></section>

            <div className="full-paragraph align-items-center css-1dkjmkt eo3on790" style={{ textAlign: "center" }}><div className="title-wrapper" style={{ marginTop: "0px" }}><div className="core-title-container css-18anjwe e168hrcx0"><h2 className="monday-markup-language-component core-title lg"><b>Everything you need for any workflow</b></h2></div></div><div className="paragraph-body-wrapper"><div className="paragraph-wrapper css-1id7hrb ehzaxgp0"><div style={{ fontSize: '1.125rem', lineHeight: '32px' }}>Easily build your ideal workflow with monday.com building blocks.</div></div></div></div>

            <section className='video-sec'>

                <video
                    src="https://dapulse-res.cloudinary.com/video/upload/q_auto,f_auto,cs_copy/Generator_featured%20images/Home%20Page%20-%202022%20Rebrand/tabs/final-videos-tabs/7_status.mp4"
                    autoPlay
                    muted
                    loop
                    className='home-video'
                >
                    Your browser does not support the video tag.
                </video>

                <div className="full-paragraph align-items-left css-1dkjmkt eo3on790" style={{ textAlign: 'left' }}><div className="title-wrapper" style={{ marginTop: "0px" }}><div className="core-title-container css-18anjwe e168hrcx0"><span className="title-and-icon-wrapper"><div className="icon-wrapper sm"><picture className="picture-component picture-icon-wrapper css-1x9jymf e1ujfqv60"><img style={{ width: '1.5em' }} alt="board icon" className="title-icon" src="https://dapulse-res.cloudinary.com/image/upload/e_colorize,co_rgb:6161FF/Generator_featured%20images/Home%20Page%20-%202022%20Rebrand/tabs/board_icon.svg" /></picture></div><h2 className="title-video-section">Boards</h2></span></div></div><div className="paragraph-body-wrapper"><div className="paragraph-wrapper css-1id7hrb ehzaxgp0"><div className="monday-markup-language">Everything starts with a visual board — the core of monday.com Work OS. Tailor it your way and manage anything from projects to departments.</div></div></div></div>

            </section>
            <section className="footer-section-full"><h2>Deliver your best work <span>with oneday.com</span></h2><p className='p-home'>No credit card needed   <span>✦</span>   Unlimited time on Free plan</p>  <Link to={'/board'}> <button className='cta-button'>Get Started <svg className="arrow-icon" width="14" height="10" viewBox="0 0 9 7" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M4.628.616a.5.5 0 1 0-.64.768L6.203 3.23H.5a.5.5 0 0 0 0 1h5.612L3.988 6a.5.5 0 1 0 .64.769l3.23-2.693a.5.5 0 0 0 0-.768L4.628.616z" fill="#FFFFFF"></path></svg></button> </Link></section>

        </section >
    )
}