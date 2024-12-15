import React, { Component } from 'react';
import "./NewUser.css";
import md5 from 'md5';

import BASE_URL from './config.js';

class NewUser extends Component {


    constructor(props) {
        super(props);
        this.state = {
          username: 'enter username',
          password: 'enter password',
        }
      }

    //form handling before submission
    handleInputChange = (event) => {
        const target = event.target;
        let value = event.target.value;
        const name = target.name;

        
        if (target.name === "password") {
            document.getElementById(name).type = "password";
            value = md5(event.target.value);
        }

        this.setState({
            [name]: value
        });

        document.getElementById(name).style.fontFamily = "Montserrat black";
    }

    setEmptyValue = (event) => {
        const name = event.target.name
        document.getElementById(name).value = "";

    }

    handleSubmit = () => {
        var jsonData = {
            "username" : document.getElementById("username").value,
            "password" : document.getElementById("password").value

        }
        //console.log(JSON.stringify(jsonData))

        //console.log(`${BASE_URL}`)
        
        fetch(`${BASE_URL}/newuser`, {  // Enter your IP address here

            method: 'POST', 
            headers: { 'Content-Type': 'application/json',  },
            body: JSON.stringify(jsonData) // body data type must match "Content-Type" header
          })
        .then((response) => {
            return response.json();
           //response.text()
           /* console.log(response);
           console.log(response.body.message) */
           /*  if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            };
            return response.json();    */
        })
       .then((text) => console.log('Success:', text))
       .catch((error) => console.error('Error:', error));
        
    } 

    render() {
    return (
        <div className="login">
        <h4>Create Account</h4>
        <form onSubmit={this.handleSubmit}>
            <div className="text_area">
            <input
                type="text"
                id="username"
                name="username"
                defaultValue={this.state.username}
                onChange={this.handleInputChange}
                onFocus={this.setEmptyValue}
                className="text_input"

            />
            </div>
            <div className="text_area">
            <input
                type="text"
                id="password"
                name="password"
                defaultValue={this.state.password}
                onChange={this.handleInputChange}
                onFocus={this.setEmptyValue}
                className="text_input"

            />
            </div>
            <input
            type="submit"
            value="Submit"
            className="btn"

            />
        </form>
        </div>
    )
}   
}
export default NewUser;

    
     



