import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.css'; // Assuming you have some CSS for styling
//import Box from './Box';

/* style = {
    list-style-type: none;
    margin: 0;
    padding: 0;
    display: flex;
  }
 */

const Nav = ({loggedIn,handleLogin,userInfo}) => {

    const navItems = [
        { name: 'Login', path: '/Login' },
        { name: 'New User', path: '/NewUser' },
        { name: 'Homepage', path: '/Homepage' },
        { name: 'Logout', path: '/Logout' }
      ]
    
    const handleClick = () => {
        handleLogin({})
      }

    return (
        <nav className="navbar" >
            <div>
            <ul>
                <li>           
                <Link margin="20"to={'/Login'}>Login</Link>
                </li> 
                <li>           
                <Link margin="20"to={'/NewUser'}>New Users</Link>
                </li> 
                <li>           
                <Link margin="20"to={'/Homepage'}>Home</Link>
                </li>
                {loggedIn ? 
                <li>
                <a onClick={handleClick}>Logout</a>
                </li> : null}  
            </ul>
            </div>


        </nav>
    );
};

export default Nav;

// <Link to={'/Logout'}>Logout</Link>