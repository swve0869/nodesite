import React, { useState } from 'react';
import './Button.css';

function Button({onClick,buttonmsg,style}){
    let [truestyle, settrueStyle] = useState(style);

    return(
        <button className={truestyle}  onClick={onClick}>{buttonmsg}</button>
    )
} export default Button;