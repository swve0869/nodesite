import React from 'react';
import PropTypes from 'prop-types';
//import './Box.css'; // Assuming you have some CSS for the Box component

const Box = ({ children, className}) => {
    const boxStyle = {
        
        maxWidth: '400px',
        border: '2px solid #ccc',
        padding: '20px',
        margin: '20px',
        borderRadius: '20px',
        backgroundColor: '#f9f9f9'
    };

    return (
        <div className={`box ${className}`} style={boxStyle}>
            {children}
        </div>
    );
};



export default Box;