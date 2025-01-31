import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.css'; // Assuming you have some CSS for styling

const Nav = () => {
    return (
        <nav className="navbar">
            <h1>My Website</h1>
            <ul className="nav-links">
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/about">About</Link>
                </li>
                <li>
                    <Link to="/contact">Contact</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Nav;