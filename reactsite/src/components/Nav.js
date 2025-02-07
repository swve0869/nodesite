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

const Nav = (loggedIn,userInfo) => {

    const navItems = [
        { name: 'Login', path: '/Login' },
        { name: 'New User', path: '/NewUser' },
        { name: 'Homepage', path: '/Homepage' },
        { name: 'Logout', path: '/Logout' }
      ]
    

    return (
        <nav className="navbar" >
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
                    <li>
                    <Link to={'/Logout'}>Logout</Link>
                    </li>
                    {}
                
            </ul>


        </nav>
    );
};

export default Nav;