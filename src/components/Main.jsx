import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import logo from '../images/logo.png'

export default function Main(){
    return (
        <React.Fragment>
            <header>
                <img className='logo' src={logo} alt="Sportsee logo" />
                <nav className="main-nav">
                    <ul>
                        <li><Link to='/'>Accueil</Link></li>
                        <li>Profil</li>
                        <li>Réglage</li>
                        <li>Communauté</li>
                    </ul>
                </nav>
            </header>
            <main><Outlet /></main>
            <nav className='vertical-nav'>
                <span className='vertical-nav__copyright'>Copyright, SportSee 2023</span>
            </nav>
        </React.Fragment>
    )
}