import React, { useState } from 'react';
import './Button.css';

function Button({onClick,buttonmsg}){
    
    const [style, setStyle] = useState("button");

    const handleClick = () => {
        setStyle("buttonclicked");
        console.log("button clicked");
        //onClick(e);
    }

    return(
        <button className={style}  onClick={handleClick}>{buttonmsg}</button>
    )
} export default Button;