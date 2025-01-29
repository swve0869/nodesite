import React from 'react';
import PropTypes from 'prop-types';
//import './Box.css'; // Assuming you have some CSS for the Box component

const Box = ({ children, className,width,height  }) => {
    const boxStyle = {
        width: width,
        height: height,
        border: '1px solid #ccc',
        padding: '20px',
        borderRadius: '30px',
        backgroundColor: '#f9f9f9'
    };

    return (
        <div className={`box ${className}`} style={boxStyle}>
            {children}
        </div>
    );
};



export default Box;