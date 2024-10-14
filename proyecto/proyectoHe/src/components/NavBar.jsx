import React from 'react'
import styles from "../styles/navbar.module.css"
import CartWidget from '../components/CartWidget'
import { Link, NavLink } from "react-router-dom"

const NavBar = () => {
    return (
        <nav>
            <ul className={styles.list}>
                <li>
                    <Link to="/" className={styles.brand}>
                    Red Barrel
                    </Link>
                </li>
                <li>
                    <NavLink
                        className={({ isActive }) => isActive ? styles.isActive : styles.notActive}
                        to="/category/beer"
                    >
                        Beer
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        className={({ isActive }) => isActive ? styles.isActive : styles.notActive}
                        to="/category/wine"
                    >
                        Wine
                    </NavLink>
                </li>
                <li className={styles.cartItem}>
                    <NavLink
                        className={({ isActive }) => isActive ? styles.isActive : styles.notActive}
                        to="/cart"
                    >
                        <CartWidget />
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
}

export default NavBar
