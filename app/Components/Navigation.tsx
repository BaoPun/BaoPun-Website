import styles from '../Styles/style.module.css';
import { Link } from 'react-router';

// React imports
import { useState, useEffect, type FormEvent } from 'react';

export default function NavigationBar(){
    // Hide or show the navigation bar on clicking anywhere within the navigation
    const [showNavigation, setShowNavigation] = useState(true);

    // Handler that will switch the showNavigation flag on or off
    function clickNavigationBarHandler(){
        setShowNavigation(!showNavigation);
    }

    // Handler that will ignore on click when clicking on one of the linked elements
    function ignoreHideNavBarHandler(event/*: React.FormEvent<HTMLFormElement>*/){
        event.stopPropagation();
    }

    // If the navigation flag is off, show the hamburger
    // Otherwise, show the entire navigation bar
    // Each of the Link elements have an onClick handler so that clicking on them will not hide the navigation bar
    return (
        <>
            {!showNavigation && (
                <span style={{ position: 'absolute', top: '0%', fontSize: '45px' }} onClick={clickNavigationBarHandler}>&#9776;</span>
            )}
            {showNavigation && (
                <div id={styles['left-side-nav']} onClick={clickNavigationBarHandler} >
                    <ol>
                        <li><Link to="/Projects" style={{ fontSize: "18px" }} onClick={ignoreHideNavBarHandler}>Projects</Link></li>
                        <li><Link to="/About" style={{ fontSize: "18px" }} onClick={ignoreHideNavBarHandler}>About Me</Link></li>
                        <li><Link to="/MarioKart" style={{ fontSize: "18px" }} onClick={ignoreHideNavBarHandler}>Mario Kart</Link></li>
                    </ol>
                </div>
            )}
        </>
    );
}