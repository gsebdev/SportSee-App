import React from 'react'
import { Link, useOutlet } from 'react-router-dom'
import logo from '../images/logo.png'
import cycle from '../images/cycle.png'
import swim from '../images/swim.png'
import yoga from '../images/yoga.png'
import strength from '../images/strength.png'
import SquareIcon from './SquareIcon'
/**
 * @module Main
 * @version 1.0.0
 * @author Sébastien GAULT
 */

/**
 * Wrapper component that displays :
 * The header of the app
 * The vertical navbar of the app
 * The main content feeded by it's children provided by the router
 * If no children is provided to this component, it will throw an error as the router can catch it and display the proper error element
 * 
 * @memberof module:Main
 * @returns {JSX.Element} React element
 */
function Main(){
    const navIcons = [yoga, swim, cycle, strength]

    const outlet = useOutlet()
    /*if(!outlet){
        throw new Response('', {status: 404, statusText: 'La page n\'existe pas' })
    }*/

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
            <main>{outlet}</main>
            <nav className='vertical-nav'>
                <ul>
                    {navIcons.map((icon, index) => <li key={icon + index}><SquareIcon iconSrc={icon} className='nav'/></li>)}
                </ul>
                <span className='vertical-nav__copyright'>Copyright, SportSee 2023</span>
            </nav>
        </React.Fragment>
    )
}

export default Main