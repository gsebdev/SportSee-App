import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import logo from '../images/logo.png'
import cycle from '../images/cycle.png'
import swim from '../images/swim.png'
import yoga from '../images/yoga.png'
import strength from '../images/strength.png'
import SquareIcon from './SquareIcon'

/**
 * React Component used to display the header and the vertical navbar of the dashboard
 * 
 * @returns {React.ReactElement}
 */
export default function Main(){
    const navIcons = [yoga, swim, cycle, strength]
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
                <ul>
                    {navIcons.map((icon, index) => <li key={icon + index}><SquareIcon iconSrc={icon} className='nav'/></li>)}
                </ul>
                <span className='vertical-nav__copyright'>Copyright, SportSee 2023</span>
            </nav>
        </React.Fragment>
    )
}