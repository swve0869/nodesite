import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.css'; // Assuming you have some CSS for styling
import Box from './Box';

const Nav = ({navItems}) => {
    return (
        <nav className="navbar">
                {navItems.map(item =>
                <li>
                    
                    <Link to={item.path}>{item.name}</Link>
                    
                </li>)}
        </nav>
    );
};

export default Nav;