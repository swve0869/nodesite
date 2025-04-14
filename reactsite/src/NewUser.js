import React, { useState } from 'react';
//import "./NewUser.css";
import md5 from 'md5';
import {useNavigate} from "react-router-dom";
import Box from './components/Box.js';
import './Form.css'
import NODE_URL from './config.js';
import Alert from '@mui/material/Alert';




const NewUser = ({handleLogin,setLoggedIn}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    
    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();
        
        const url = `${NODE_URL}/newuser`
    
        const fetchData = { 
            method: 'POST', 
            headers: { 'Content-Type': 'application/json',  },
            body: JSON.stringify({
                "username" : username,
                "password" : password,
                "email" : email
                }) // body data type must match "Content-Type" header
        }

        // api call for /newuser endpoint      
        const data = await fetch(url, fetchData)
        .then((response) => response.json())
        .then((data) => {console.log('Success:', data)
            return data
        })
        .catch((error) => console.error('Got this ERror:', error)); 
        
        
        if (data.errorcode === '1'){
            console.log("time to change site");
        }
        else{
            setLoggedIn(false);
            console.log(data.user_data);
            console.log("created new user")
            handleLogin(data.user_data);
            navigate('/Homepage');      
        } 
    };


    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'vh' }}>
            <Box className="genericbox">
                <h2>New User</h2>
                <form>
                    <div className="form-group">
                    <label>Username:</label>
                    <input
                        type="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    </div>
                    <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    </div>
                    <div className="form-group">
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    </div>
                    <div type="alert">
                        {errorMessage? <Alert severity="error">{errorMessage}</Alert> : <a></a>}
                    </div>

                    <button type="submit" onClick={handleSubmit}>Create {username}{username === "" ? '' : '\'s '}Account</button>
                </form>
            </Box>
        </div>
    );
};

export default NewUser;