import React from 'react';
import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import burgerIcon from '../../../assets/images/anima.svg';
import NavigationItems from '../NavigationItems/NavigationItems';

const Toolbar = (props) => (
    <header className={classes.Toolbar}>
        <img className={classes.burger} src={burgerIcon} alt="burger" onClick={props.clicked}/>
        <Logo height="80%"/>
        <nav className={classes.DesktopOnly}>
            <NavigationItems isAuthenticated={props.isAuth}/>
        </nav>
    </header>

)

export default Toolbar
